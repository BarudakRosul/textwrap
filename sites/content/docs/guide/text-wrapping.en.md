---
title: Text Wrapping
weight: 1
prev: /docs/guide
next: /docs/guide/text-filling
---

Text wrapping is a fundamental feature of TextWrap, allowing you to neatly format text by breaking it into multiple lines without splitting words haphazardly.

<!--more-->

## Basic Usage

At its core, text wrapping in TextWrap involves breaking a long string of text into multiple lines, each with a maximum width specified by the user. The basic usage is straightforward:

```javascript {filename="example.js"}
const wrapped = textwrap.wrap("This is a long line of text that needs to be wrapped properly without cutting words in half.");
console.log(wrapped);
```

Result:

```javascript
[
  'This is a long line of text that needs to be wrapped properly without',
  'cutting words in half.'
]
```

In this example, the text is wrapped at 70 characters (devault value), ensuring that no words are cut off unless they exceed the maximum width.

## Custom Width

If you want to wrap the text based on the desired width, consider the following example:

```javascript {filename="example.js"}
const wrapped = textwrap.wrap("This is a long line of text that needs to be wrapped properly without cutting words in half.", 25);
console.log(wrapped);
```

Result:

```javascript
[
  'This is a long line of',
  'text that needs to be',
  'wrapped properly without',
  'cutting words in half.'
]
```
