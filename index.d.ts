/**
 * A TextWrapper options type.
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
declare interface TextWrapperOptions {
  width?: number;
  initial_indent?: string;
  subsequent_indent?: string;
  expand_tabs?: boolean;
  replace_whitespace?: boolean;
  fix_sentence_endings?: boolean;
  break_long_words?: boolean;
  drop_whitespace?: boolean;
  break_on_hyphens?: boolean;
  tabsize?: number;
  max_lines?: number | null;
  placeholder?: string;
}

/**
 * A predicate function type that takes a string as input and returns a boolean.
 *
 * @param {string} lines - The input string to be evaluated by the predicate.
 * @returns {boolean} - The result of the predicate evaluation.
 */
declare interface Predicate {
  (lines: string) => boolean;
}

/**
 * Object for wrapping/filling text. The public interface consists of
 * the wrap() and fill() methods; the other methods are just there for
 * subclasses to override in order to tweak the default behaviour.
 * If you want to completely replace the main wrapping algorithm,
 * you'll probably have to override _wrap_chunks().
 */
declare class TextWrapper {
  constructor(options?: TextWrapperOptions);

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
  wrap(text: string): Array<string>;

  /**
   * Reformat the single paragraph in 'text' to fit in lines of no
   * more than 'this.width' columns, and return a new string
   * containing the entire wrapped paragraph.
   *
   * @param {string} text - The text to fill.
   * @returns {string} - The filled text.
   */
  fill(text: string): string;
}

  /**
 * Wrap a single paragraph of text, returning a list of wrapped lines.
 *
 * @param {string} text - The input text to be wrapped.
 * @param {number} width - The maximum width of the wrapped text (default: 70).
 * @param {TextWrapperOptions} options - Additional options.
 * @return {Array<string>} - The wrapped text.
 */
declare function wrap(text: string, width?: number, options?: TextWrapperOptions): Array<string>;

/**
 * Fill a single paragraph of text, returning a new string.
 *
 * @param {string} text - The input text to be filled.
 * @param {number} width - The maximum width of the filled text (default: 70).
 * @param {TextWrapperOptions} options - Additional options.
 * @return {string} - The filled text.
 */
declare function fill(text: string, width?: number, options?: TextWrapperOptions): string;

/**
 * Collapse and truncate the given text to fit in the given width.
 *
 * @param {string} text - The input text to be shortened.
 * @param {number} width - The maximum width of the shortened.
 * @param {TextWrapperOptions} options - Additional options.
 * @return {string} - The shortened text.
 */
declare function shorten(text: string, width: number, options?: TextWrapperOptions): string;

/**
 * Remove any common leading whitespace from every line in `text`.
 *
 *
 * @param {string} text - The input text to be dedented.
 * @return {string} - The dedented text.
 */
declare function dedent(text: string): string;

/**
 * Adds 'prefix' to the beginning of selected lines in 'text'.
 *
 * @param {string} text - The input text to be indented.
 * @param {string} prefix - The prefix string to prepend to each line.
 * @param {Predicate | null} predicate - Optional predicate function to determine which lines to indent
 *                                (default: null).
 * @returns {string} - The indented text.
 */
declare function indent(text: string, prefix: string, predicate?: Predicate | null): string;

export const textwrap = { TextWrapper, wrap, fill, shorten, dedent, indent };

// Exports module
export { TextWrapper, wrap, fill, shorten, dedent, indent };
export default textwrap;
