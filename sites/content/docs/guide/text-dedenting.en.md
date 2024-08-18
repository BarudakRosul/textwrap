---
title: Text Dedenting
weight: 4
prev: /docs/guide/text-shortening
next: /docs/guide/text-indenting
---

Text dedenting is a process used to remove common leading whitespace from each line in a block of text. This is particularly useful when working with multi-line strings that are indented in source code but need to be aligned properly when rendered or displayed. TextWrap provides a convenient `dedent` method to simplify this task.

<!--more-->

## Basic Usage

The most basic use of text dedenting is to remove common leading spaces from each line of a multi-line string.

```javascript {filename="example.js"}
const text = `
    This is an example of indented text.
    The leading spaces on each line will be removed.
    This helps in keeping the code clean and readable.
`;
const dedented = textwrap.dedent(text);
console.log(dedented);
```

Result:

```text
This is an example of indented text.
The leading spaces on each line will be removed.
This helps in keeping the code clean and readable.
```

In this example, the method removes the common leading whitespace from each line in the provided text. This is particularly useful when the text is indented in the source code but needs to be aligned properly when rendered.

Another example:

```javascript {filename="example.js"}
const dedented = textwrap.dedent("  \thello there\n  \t  how are you?");
console.log(dedented);
```

Result:

```text
hello there
  how are you?
```
