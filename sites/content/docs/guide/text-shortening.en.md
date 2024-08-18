---
title: Text Shortening
weight: 3
prev: /docs/guide/text-filling
next: /docs/guide/text-dedenting
---

Text shortening is an essential feature when working with content that needs to fit within a restricted space, such as in user interfaces, data summaries, or previews. The shorten method in TextWrap is designed to truncate a text string to a specified maximum length, adding a customizable placeholder (such as ellipses) to indicate that the text has been shortened.

<!--more-->

## Basic Usage

The most straightforward use of text shortening is to truncate text to a specific length. Here’s how you can achieve this with TextWrap.

```javascript {filename="example.js"}
const text = "This is a long piece of text that needs to be shortened for display purposes.";
const shortened = textwrap.shorten(text, 30);
console.log(shortened);
```

Result:

```text
This is a long piece of [...]
```

In this example, the text is shortened to 30 characters, to ensure that no words are truncated, and if it exceeds the maximum width will add a placeholder.
