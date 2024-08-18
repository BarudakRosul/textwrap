---
title: Text Filling
weight: 2
prev: /docs/guide/text-wrapping
next: /docs/guide/text-shortening
---

Text filling is a feature that similar text wrapping by not only wrapping text to fit within a specified width but also by returning the wrapped text as a single string, with lines joined by newline characters (`\n`). This is particularly useful when you need to display or output text as a formatted block, such as in console applications, log files, or text-based UI components.

<!--more-->

## Basic Usage

The most straightforward use of text filling is to take a block of text and format it to a specific width. This can be done easily with TextWrap.

```javascript {filename="example.js"}
const filled = textwrap.fill("This is a long line of text that needs to be wrapped properly without cutting words in half.");
console.log(filled);
```

Result:

```text
This is a long line of text that needs to be wrapped properly without
cutting words in half.
```

In this example, the text is filled at 70 characters (devault value), ensuring that no words are cut off unless they exceed the maximum width.

## Custom Width

If you want to fill the text based on the desired width, consider the following example:

```javascript {filename="example.js"}
const filled = textwrap.fill("This is a long line of text that needs to be wrapped properly without cutting words in half.", 25);
console.log(filled);
```

Result:

```text
This is a long line of
text that needs to be
wrapped properly without
cutting words in half.
```
