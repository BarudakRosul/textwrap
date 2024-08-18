---
title: Advanced Options
weight: 6
prev: /docs/guide/text-indenting
---

In TextWrap, the `wrap()`, `fill()`, and `shorten()` methods are designed to offer flexible text formatting. Beyond basic usage, these functions provide advanced options that give you fine control over how text is processed and formatted.

<!--more-->

## Supported Options

- **`width`**</br>
  (default: `70`) – The maximum length of wrapped lines. As long as there are no individual words in the input text longer than `width`, TextWrap guarantees that no output line will be longer than `width` characters.
- **`expand_tabs`**</br>
  (default: `true`) – If `true`, then all tab characters in text will be expanded to spaces using the [`expandTabs()`](https://npm.im/@barudakrosul/expand-tabs) method of text.
- **`tabsize`**</br>
  (default: `8`) – If `expand_tabs` is `true`, then all tab characters in text will be expanded to zero or more spaces, depending on the current column and the given tab size.
- **`replace_whitespace`**</br>
  (default: `true`) – If `true`, after tab expansion but before wrapping, the `wrap()`, `fill()`, or `shorten()` methods will replace each whitespace character with a single space. The whitespace characters replaced are as follows: tab, newline, vertical tab, formfeed, and carriage return (`'\t\n\v\f\r'`).</br>
  {{< callout type="info" >}}
    If `expand_tabs` is `false` and `replace_whitespace` is `true`, each tab character will be replaced by a single space, which is not the same as tab expansion.
  {{< /callout >}}

  {{< callout type="info" >}}
    If `replace_whitespace` is `false`, newlines may appear in the middle of a line and cause strange output. For this reason, text should be split into paragraphs (using [`String.splitLines()`](https://npm.im/@barudakrosul/split-lines) or similar) which are wrapped separately.
  {{< /callout >}}
- **`drop_whitespace`**</br>
  (default: `true`) – If `true`, whitespace at the beginning and ending of every line (after wrapping but before indenting) is dropped. Whitespace at the beginning of the paragraph, however, is not dropped if non-whitespace follows it. If whitespace being dropped takes up an entire line, the whole line is dropped.
- **`initial_indent`**</br>
  (default: `''`) – String that will be prepended to the first line of wrapped output. Counts towards the length of the first line. The empty string is not indented.
- **`subsequent_indent`**</br>
  (default: `''`) – String that will be prepended to all lines of wrapped output except the first. Counts towards the length of each line except the first.
- **`fix_sentence_endings`**</br>
  (default: `false`) – If `true`, TextWrap attempts to detect sentence endings and ensure that sentences are always separated by exactly two spaces. This is generally desired for text in a monospaced font. However, the sentence detection algorithm is imperfect: it assumes that a sentence ending consists of a lowercase letter followed by one of `'.'`, `'!'`, or `'?'`, possibly followed by one of `'"'` or `"'"`, followed by a space. One problem with this algorithm is that it is unable to detect the difference between “Dr.” in</br>
  ```mathematica
  [...] Dr. Frankenstein's monster [...]
  ```

  ```mathematica
  [...] See Spot. See Spot run [...]
  ```

  `fix_sentence_endings` is `false` by default.</br>
  Since the sentence detection algorithm relies on `String.toLowerCase` for the definition of “lowercase letter”, and a convention of using two spaces after a period to separate sentences on the same line, it is specific to English-language texts.
- **`break_long_words`**</br>
  (default: `true`) – If `true`, then words longer than `width` will be broken in order to ensure that no lines are longer than `width`. If it is `false`, long words will not be broken, and some lines may be longer than `width`. (Long words will be put on a line by themselves, in order to minimize the amount by which `width` is exceeded).
- **`break_on_hyphens`**</br>
  (default: `true`) – If `true`, wrapping will occur preferably on whitespaces and right after hyphens in compound words, as it is customary in English. If `false`, only whitespaces will be considered as potentially good places for line breaks, but you need to set `break_long_words` to `false` if you want truly insecable words. Default behaviour in previous versions was to always allow breaking hyphenated words.
- **`max_lines`**</br>
  (default: `null`) – If not `null`, then the output will contain at most `max_lines` lines, with placeholder appearing at the end of the output.
- **`placeholder`**</br>
  (default: `' [...]'`) String that will appear at the end of the output text if it has been truncated.

## Basic Usage

```javascript {filename="example.js"}
const text = "This is a long line of text that needs\tto be wrapped properly\twithout cutting\twords in half.";
const options = {
  replace_whitespace: false,
  tabsize: 12,
  initial_indent: "[!] "
}
const wrapped = textwrap.wrap(text, 20, options)

console.log(wrapped);
```

Result:

```javascript
[
  '[!] This is a long',
  'line of text that',
  'needs          to be',
  'wrapped properly',
  'without cutting',
  'words in half.'
]
```

Another example:

```javascript {filename="example.js"}
const text = "This is a long piece of text that needs to be shortened for display purposes.";
const options = {
  placeholder: " (...)"
};
const shortened = textwrap.shorten(text, 30, options);

console.log(shortened);
```

Result:

```text
This is a long piece of (...)
```
