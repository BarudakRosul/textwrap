/**
 * Text wrapping and filling.
 *
 * Copyright (C) 2024 Barudak Rosul.
 * MIT License.
 *
 * Written by Rangga Fajar Oktariansyah (fajarrkim@gmail.com)
 * This module inspired from 'textwrap' module in Python.
 */
require("@barudakrosul/expand-tabs");
require("@barudakrosul/translate");
require("@barudakrosul/split-lines");

// Hardcode the recognized whitespace characters to the US-ASCII
// whitespace characters. The main reason for doing this is that
// some Unicode spaces (like \u00a0) are non-breaking whitespaces.
const _whitespace = "\t\n\x0B\f\r ";

/**
 * Object for wrapping/filling text. The public interface consists of
 * the wrap() and fill() methods; the other methods are just there for
 * subclasses to override in order to tweak the default behaviour.
 * If you want to completely replace the main wrapping algorithm,
 * you'll probably have to override _wrap_chunks().
 */
class TextWrapper {
  /**
   * Several instance attributes control various aspects of wrapping.
   *
   * @param {number} width - The maximum width of wrapped lines (unless break_long_words is false)
   *                         (default: 70).
   * @param {string} initial_indent - String that will be prepended to the first line of wrapped
   *                                  output. Counts towards the line's width
   *                                  (default: "").
   * @param {string} subsequent_indent - String that will be prepended to all lines save the first
   *                                     of wrapped output; also counts towards each line's width
   *                                     (default: "").
   * @param {boolean} expand_tabs - Expand tabs in input text to spaces before further processing.
   *                                Each tab will become 0 .. 'tabsize' spaces, depending on its position
   *                                in its line. If false, each tab is treated as a single character
   *                                (default: true).
   * @param {boolean} replace_whitespace - Replace all whitespace characters in the input text by spaces
   *                                       after tab expansion. Note that if expand_tabs is false and
   *                                       replace_whitespace is true, every tab will be converted to a
   *                                       single space! (default: true).
   * @param {boolean} fix_sentence_endings - Ensure that sentence-ending punctuation is always followed
   *                                         by two spaces. Off by default because the algorithm is
   *                                         (unavoidably) imperfect (default: false).
   * @param {boolean} break_long_words - Break words longer than 'width'. If false, those words will not
   *                                     be broken, and some lines might be longer than 'width'
   *                                     (default: true).
   * @param {boolean} drop_whitespace - Drop leading and trailing whitespace from lines (default: true).
   * @param {boolean} break_on_hyphens - Allow breaking hyphenated words. If true, wrapping will occur
   *                                     preferably on whitespaces and right after hyphens part of
   *                                     compound words (default: true).
   * @param {number} tabsize - Expand tabs in input text to 0 .. 'tabsize' spaces, unless
   *                           'expand_tabs' is false (default: 8).
   * @param {number | null} max_lines - Truncate wrapped lines (default: null).
   * @param {string} placeholder - Append to the last line of truncated text (default: ' [...]').
   */
  constructor({
    width = 70,
    initial_indent = "",
    subsequent_indent = "",
    expand_tabs = true,
    replace_whitespace = true,
    fix_sentence_endings = false,
    break_long_words = true,
    drop_whitespace = true,
    break_on_hyphens = true,
    tabsize = 8,
    max_lines = null,
    placeholder = " [...]"
  } = {}) {
    this.unicode_whitespace_trans = {};
    _whitespace.split("").forEach(char => {
      this.unicode_whitespace_trans[char.codePointAt(0)] = " ".codePointAt(0);
    });

    // This funky little regex is just the trick for splitting
    // text up into word-wrappable chunks. E.g.
    //   "Hello there -- you goof-ball, use the -b option!"
    // splits into
    //   Hello/ /there/ /--/ /you/ /goof-/ball,/ /use/ /the/ /-b/ /option!
    // (after stripping out empty strings).
    this.word_punct = "[\\w!\"'&.,?]";
    this.letter = "[^\\d\\W]";
    this.whitespace = `[${_whitespace.replace(new RegExp("[\\-\\[\\]{}()*+?.,\\\\\\^$|#\\s]", "g"), "\\$&")}]`;
    this.nowhitespace = "[^" + this.whitespace.slice(1);
    this.wordsep_re = new RegExp(
      `(${this.whitespace}+|(?<=${this.word_punct})-{2,}(?=\\w)|${this.nowhitespace}+?(?:-(?:(?<=${this.letter}{2}-)|(?<=${this.letter}-${this.letter}-))(?=${this.letter}-?${this.letter})|(?=${this.whitespace}|\\Z)|(?<=${this.word_punct})(?=-{2,}\\w)))`,
      "g"
    );

    // This less funky little regex just split on recognized spaces. E.g.
    //   "Hello there -- you goof-ball, use the -b option!"
    // splits into
    //   Hello/ /there/ /--/ /you/ /goof-ball,/ /use/ /the/ /-b/ /option!/
    this.wordsep_simple_re = new RegExp(
      `(${this.whitespace}+)`,
      "g"
    );

    // This is not locale- or charset-aware -- string.toLowerCase()
    // is US-ASCII only (and therefore English-only)
    this.sentence_end_re = new RegExp(
      "[a-z][\\.\\!\\?][\\\"\\']?\\Z",
      "g"
    );

    this.width = width;
    this.initial_indent = initial_indent;
    this.subsequent_indent = subsequent_indent;
    this.expand_tabs = expand_tabs;
    this.replace_whitespace = replace_whitespace;
    this.fix_sentence_endings = fix_sentence_endings;
    this.break_long_words = break_long_words;
    this.drop_whitespace = drop_whitespace;
    this.break_on_hyphens = break_on_hyphens;
    this.tabsize = tabsize;
    this.max_lines = max_lines;
    this.placeholder = placeholder;
  }

  /*** Private methods ***********************************************/
  // (possibly useful for subclasses to override)

  /**
   * Munge whitespace in text: expand tabs and convert all other
   * whitespace characters to spaces. Eg. " foo\\tbar\\n\\nbaz"
   * becomes " foo    bar  baz".
   *
   * @param {string} text - The text to munge.
   * @return {string} - An string of text munge.
   * @private
   */
  _munge_whitespace(text) {
    if (this.expand_tabs) {
      text = text.expandTabs(this.tabsize);
    }
    if (this.replace_whitespace) {
      text = text.translate(this.unicode_whitespace_trans);
    }
    return text;
  }

  /**
   * Split the text to wrap into indivisible chunks. Chunks are
   * not quite the same as words; see _wrap_chunks() for full
   * details. As an example, the text:
   *   Look, goof-ball -- use the -b option!
   * breaks into the following chunks:
   *   'Look,', ' ', 'goof-', 'ball', ' ', '--', ' ',
   *   'use', ' ', 'the', ' ', '-b', ' ', 'option!'
   * if break_on_hyphens is true, or in:
   *   'Look,', ' ', 'goof-ball', ' ', '--', ' ',
   *   'use', ' ', 'the', ' ', '-b', ' ', 'option!'
   * otherwise.
   *
   * @param {string} text - The text to split into words or chunks.
   * @return {Array<string>} - An array of words or chunks.
   * @private
   */
  _split(text) {
    let chunks;
    if (this.break_on_hyphens === true) {
      chunks = text.split(this.wordsep_re);
    }
    else {
      chunks = text.split(this.wordsep_simple_re);
    }
    return chunks.filter(Boolean);
  }

  /**
   * Correct for sentence endings buried in 'chunks'. Eg. when the
   * original text contains "... foo.\\nBar ...", munge_whitespace()
   * and split() will convert that to [..., "foo.", " ", "Bar", ...]
   * which has one too few spaces; this method simply changes the one
   * space to two.
   *
   * @param {Array<string>} chunks - The chunks of text.
   * @private
   */
  _fix_sentence_endings(chunks) {
    let i = 0;
    const patsearch = chunk => this.sentence_end_re.test(chunk);
    while (i < chunks.length - 1) {
      if (chunks[i + 1] === " " && patsearch(chunks[i])) {
        chunks[i + 1] = "  ";
        i += 2;
      }
      else {
        i += 1;
      }
    }
  }

  /**
   * Handle a chunk of text (most likely a word, not whitespace) that
   * is too long to fit in any line.
   *
   * @param {Array<string>} reversed_chunks - The chunks of text in reverse order.
   * @param {Array<string>} cur_line - The current line being constructed.
   * @param {number} cur_len - The current length of the line.
   * @param {number} width - The maximum width of the line.
   * @private
   */
  _handle_long_word(reversed_chunks, cur_line, cur_len, width) {
    // Figure out when indent is larger than the specified width, and make
    // sure at least one character is stripped off on every pass
    let space_left;
    if (width < 1) {
      space_left = 1;
    }
    else {
      space_left = width - cur_len;
    }

    // If we're allowed to break long words, then do so: put as much
    // of the next chunk onto the current line as will fit.
    if (this.break_long_words) {
      let end = space_left;
      const chunk = reversed_chunks[reversed_chunks.length - 1];
      if (this.break_on_hyphens && chunk.length > space_left) {
        // break after last hyphen, but only if there are
        // non-hyphens before it
        const hyphen = chunk.lastIndexOf("-", 0, space_left);
        if (hyphen > 0 && Array.from(chunk.slice(0, hyphen)).some(c => c !== "-")) {
          end = hyphen + 1;
        }
      }
      cur_line.push(chunk.slice(0, end));
      reversed_chunks[reversed_chunks.length - 1] = chunk.slice(end);
    }

    // Otherwise, we have to preserve the long word intact. Only add
    // it to the current line if there's nothing already there --
    // that minimizes how much we violate the width constraint.
    else if (!cur_line.length) {
      cur_line.push(reversed_chunks.pop());
    }

    // If we're not allowed to break long words, and there's already
    // text on the current line, do nothing. Next time through the
    // main loop of _wrap_chunks(), we'll wind up here again, but
    // cur_len will be zero, so the next line will be entirely
    // devoted to the long word that we can't handle right now.
  }

  /**
   * Wrap a sequence of text chunks and return a list of lines of
   * length 'this.width' or less. (If 'break_long_words' is false,
   * some lines may be longer than this.) Chunks correspond roughly
   * to words and the whitespace between them: each chunk is
   * indivisible (modulo 'break_long_words'), but a line break can
   * come between any two chunks. Chunks should not have internal
   * whitespace; ie. a chunk is either all whitespace or a "word".
   * Whitespace chunks will be removed from the beginning and end of
   * lines, but apart from that whitespace is preserved.
   *
   * @param {Array<string>} chunks - The chunks of text.
   * @return {Array<string>} - An array of wrapped lines.
   * @private
   */
  _wrap_chunks(chunks) {
    const lines = [];
    if (this.width <= 0) {
      throw new Error(`invalid width ${this.width} (must be > 0)`);
    }
    let indent;
    if (this.max_lines !== null) {
      if (this.max_lines > 1) {
        indent = this.subsequent_indent;
      }
      else {
        indent = this.initial_indent;
      }
      if (indent.length + this.placeholder.trimLeft().length > this.width) {
        throw new Error("placeholder too large for max width");
      }
    }

    // Arrange in reverse order so items can be efficiently popped
    // from a stack of chucks.
    chunks.reverse();

    while (chunks.length) {
      // Start the list of chunks that will make up the current line.
      // cur_len is just the length of all the chunks in cur_line.
      let cur_line = [];
      let cur_len = 0;

      // Figure out which static string will prefix this line.
      if (lines.length) {
        indent = this.subsequent_indent;
      }
      else {
        indent = this.initial_indent;
      }

      // Maximum width for this line.
      const width = this.width - indent.length;

      // First chunk on line is whitespace -- drop it, unless this
      // is the very beginning of the text (ie. no lines started yet).
      if (this.drop_whitespace && chunks[chunks.length - 1].trim() === "" && lines) {
        chunks.pop();
      }

      while (chunks.length) {
        const l = chunks[chunks.length - 1].length;

        // Can at least squeeze this chunk onto the current line.
        if (cur_len + l <= width) {
          cur_line.push(chunks.pop());
          cur_len += l;
        }

        // Nope, this line is full.
        else {
          break;
        }
      }

      // The current line is full, and the next chunk is too big to
      // fit on *any* line (not just this one).
      if (chunks.length && chunks[chunks.length - 1].length > width) {
        this._handle_long_word(chunks, cur_line, cur_len, width);
        cur_len = cur_line.reduce((sum, chunk) => sum + chunk.length, 0);
      }

      // If the last chunk on this line is all whitespace, drop it.
      if (this.drop_whitespace && cur_line.length && cur_line[cur_line.length - 1].trim() === "") {
        cur_len -= cur_line[cur_line.length - 1].length;
        cur_line.pop();
      }

      if (cur_line.length) {
        if (this.max_lines === null ||
            lines.length + 1 < this.max_lines ||
            (!chunks.length ||
             this.drop_whitespace &&
             chunks.length === 1 &&
             !chunks[0].trim()) && cur_len <= width) {
          // Convert current line back to a string and store it in
          // list of all lines (return value).
          lines.push(indent + cur_line.join(""));
        }
        else {
          while (cur_line.length) {
            if (cur_line[cur_line.length - 1].trim() &&
                cur_len + this.placeholder.length <= width) {
              cur_line.push(this.placeholder);
              lines.push(indent + cur_line.join(""));
              break;
            }
            cur_len -= cur_line[cur_line.length - 1].length;
            cur_line.pop();
          }
          if (!cur_line.length) {
            if (lines.length) {
              let prev_line = lines[lines.length - 1].trimRight();
              if (prev_line.length + this.placeholder.length <= this.width) {
                lines[lines.length - 1] = prev_line + this.placeholder;
                break;
              }
            }
            lines.push(indent + this.placeholder.trimLeft());
          }
          break;
        }
      }
    }
    return lines;
  }

  /**
   * Split text into chunks. Splits the provided text into chunks
   * based on whitespace and other criteria, preparing it for wrapping
   * or filling.
   *
   * @param {string} text - The text to split into chunks.
   * @returns {Array<string>} - An array of text chunks.
   * @private
   */
  _split_chunks(text) {
    text = this._munge_whitespace(text);
    return this._split(text);
  }

  /*** Public interface **********************************************/

  /**
   * Reformat the single paragraph in 'text' so it fits in lines of
   * no more than 'this.width' columns, and return a list of wrapped
   * lines. Tabs in 'text' are expanded with string.expandTabs(),
   * and all other whitespace characters (including newline) are
   * converted to space.
   *
   * @param {string} text - The text to wrap.
   * @returns {Array<string>} - An array of wrapped lines.
   */
  wrap(text) {
    const chunks = this._split_chunks(text);
    if (this.fix_sentence_endings) {
      this._fix_sentence_endings(chunks);
    }
    return this._wrap_chunks(chunks);
  }

  /**
   * Reformat the single paragraph in 'text' to fit in lines of no
   * more than 'this.width' columns, and return a new string
   * containing the entire wrapped paragraph.
   *
   * @param {string} text - The text to fill.
   * @returns {string} - The filled text.
   */
  fill(text) {
    return this.wrap(text).join("\n");
  }
}

/*** Convenience interface *********************************************/

/**
 * Wrap a single paragraph of text, returning a list of wrapped lines.
 *
 * Reformat the single paragraph in 'text' so it fits in lines of no
 * more than 'width' columns, and return a list of wrapped lines. By
 * default, tabs in 'text' are expanded with string.expandTabs(), and
 * all other whitespace characters (including newline) are converted to
 * space. See TextWrapper class for available keyword args to customize
 * wrapping behaviour.
 *
 * @param {string} text - The input text to be wrapped.
 * @param {number} width - The maximum width of the wrapped text (default: 70).
 * @param {TextWrapperOptions} options - Additional options.
 * @return {Array<string>} - The wrapped text.
 */
function wrap(text, width = 70, options = {}) {
  const w = new TextWrapper({ ...options, width });
  return w.wrap(text);
}

/**
 * Fill a single paragraph of text, returning a new string.
 *
 * Reformat the single paragraph in 'text' to fit in lines of no more
 * than 'width' columns, and return a new string containing the entire
 * wrapped paragraph. As with wrap(), tabs are expanded and other
 * whitespace characters converted to space. See TextWrapper class for
 * available keyword args to customize wrapping behaviour.
 *
 * @param {string} text - The input text to be filled.
 * @param {number} width - The maximum width of the filled text (default: 70).
 * @param {TextWrapperOptions} options - Additional options.
 * @return {string} - The filled text.
 */
function fill(text, width = 70, options = {}) {
  const w = new TextWrapper({ ...options, width });
  return w.fill(text);
}

/**
 * Collapse and truncate the given text to fit in the given width.
 *
 * The text first has its whitespace collapsed. If it then fits in
 * the *width*, it is returned as is. Otherwise, as many words
 * as possible are joined and then the placeholder is appended::
 *
 *  > textwrap.shorten("Hello  world!", 12)
 *  'Hello world!'
 *  > textwrap.shorten("Hello  world!", 11)
 *  'Hello [...]'
 *
 * @param {string} text - The input text to be shortened.
 * @param {number} width - The maximum width of the shortened.
 * @param {TextWrapperOptions} options - Additional options.
 * @return {string} - The shortened text.
 */
function shorten(text, width, options = {}) {
  const w = new TextWrapper({ ...options, width, max_lines: 1 });
  return w.fill(text.split().map(chunk => chunk.trim()).join(" "));
}

/*** Loosely related functionality *************************************/

const _whitespace_only_re = new RegExp("^[ \t]+$", "gm");
const _leading_whitespace_re = new RegExp("(^[ \t]*)(?=[^ \t\n])", "gm");

/**
 * Remove any common leading whitespace from every line in `text`.
 *
 * This can be used to make multi-line strings line up with the left
 * edge of the display, while still presenting them in the source code
 * in indented form.
 *
 * Note that tabs and spaces are both treated as whitespace, but they
 * are not equal: the lines "  hello" and "\thello" are considered to have
 * no common leading whitespace. Entirely blank lines are normalized to a
 * newline character.
 *
 * @param {string} text - The input text to be dedented.
 * @return {string} - The dedented text.
 */
function dedent(text) {
  // Look for the longest leading string of spaces and tabs common to
  // all lines.
  let margin = null;
  text = text.replace(_whitespace_only_re, "");
  const indents = [...text.matchAll(_leading_whitespace_re)]
    .map(match => match[0]);

  for (const indent of indents) {
    if (margin === null) {
      margin = indent;
    }

    // Current line more deeply indented than previous winner:
    // no change (previous winner is still on top).
    else if (indent.startsWith(margin)) {}

    // Current line consistent with and no deeper than previous winner:
    // it's the new winner.
    else if (margin.startsWith(indent)) {
      margin = indent;
    }

    // Find the largest common whitespace between current line and previous
    // winner.
    else {
      for (let i = 0; i < margin.length; i++) {
        if (margin[i] !== indent[i]) {
          margin = margin.slice(0, i);
          break;
        }
      }
    }
  }

  // sanity check (testing/debugging only)
  if (false && margin) {
    for (const line of text.split("\n")) {
      if (line && !line.startsWith(margin)) {
        throw new Error(`line = ${JSON.stringify(line)}, margin = ${JSON.stringify(margin)}`);
      }
    }
  }

  if (margin) {
    const margin_re = new RegExp(`^${margin}`, "gm");
    text = text.replace(margin_re, "");
  }

  return text;
}

/**
 * Adds 'prefix' to the beginning of selected lines in 'text'.
 *
 * If 'predicate' is provided, 'prefix' will only be added to the lines
 * where 'predicate(line)' is true. If 'predicate' is not provided,
 * it will default to adding 'prefix' to all non-empty lines that do not
 * consist solely of whitespace characters.
 *
 * @param {string} text - The input text to be indented.
 * @param {string} prefix - The prefix string to prepend to each line.
 * @param {Predicate | null} predicate - Optional predicate function to determine which lines to indent
 *                                (default: null).
 * @returns {string} - The indented text.
 */
function indent(text, prefix, predicate = null) {
  if (predicate === null) {
    predicate = function(line) {
      return line.trim() !== "";
    };
  }

  function prefixed_lines() {
    return text.splitLines(true).map(line => {
      return predicate(line) ? prefix + line : line;
    });
  }

  return prefixed_lines().join("");
}

const textwrap = { TextWrapper, wrap, fill, shorten, dedent, indent };

// Exports module
module.exports = { TextWrapper, wrap, fill, shorten, dedent, indent };
module.exports = textwrap;
