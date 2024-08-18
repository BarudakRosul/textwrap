---
title: Text Indenting
weight: 5
prev: /docs/guide/text-dedenting
next: /docs/guide/advanced-options
---

Text indenting is the process of adding a specific prefix to the beginning of each line in a block of text. This can be useful for creating bullet points, quotes, or simply adding structure to your text. TextWrap provides a straightforward `indent` method that lets you prepend a specified string to every line in a text block.

<!--more-->

## Basic Usage

The `indent` method allows you to add a prefix to every line of your text. This is particularly useful when you need to format lists, quotes, or other structured text.

```javascript {filename="example.js"}
const indented = textwrap.indent("Apple\nBanana\nOrange\nBlueberry\nAvocado\nMango", "- ");
console.log(indented);
```

Result:

```text
- Apple
- Banana
- Orange
- Blueberry
- Avocado
- Mango
```

## Custom Predicate

A predicate in programming is a function that returns a boolean value (`true` or `false`) based on some condition. When using a custom predicate with the indent method, the predicate is applied to each line of text, and only those lines for which the predicate returns true will be indented.

Let’s start with a basic example where we indent only lines that contain a specific keyword.

### 1. Indenting Lines Containing a Specific Word

```javascript {filename="example.js"}
const text = `Apple is a fruit.
Bananas are yellow.
An orange is also a fruit.
`;

const indented = textwrap.indent(text, "> ", lines => lines.includes("fruit"));
console.log(indented);
```

Result:

```text
> Apple is a fruit.
Bananas are yellow.
> An orange is also a fruit.
```

Another example:

```javascript {filename="example.js"}
const text = "Apple\nBanana\nOrange\nBlueberry\nAvocado\nMango";
const indented = textwrap.indent(text, "- ", lines => lines.startsWith("A"));
console.log(indented);
```

Result:

```text
- Apple
Banana
Orange
Blueberry
- Avocado
Mango
```

### 2. Indenting Based on Length or Keywords (Multiple Conditions)

You can create more complex predicates by combining multiple conditions. For example, you might want to indent lines that are either very long or contain specific keywords.

```javascript {filename="example.js"}
const text = `Short line.
This line is particularly long and contains many words.
Another short line.
Here is a line about fruits and vegetables.
`;

const indented = textwrap.indent(text, "- ", line => line.length > 30 || line.includes("fruits"));
console.log(indented);
```

Result:

```text
Short line.
- This line is particularly long and contains many words.
Another short line.
- Here is a line about fruits and vegetables.
```

### 3. Indenting All Lines Including Empty Lines

To indent all lines, including empty ones, you can use a custom predicate with value `true`.

```javascript {filename="example.js"}
const indented = textwrap.indent("Apple\n\nBanana\n\nOrange\n\nBlueberry\n\nAvocado\n\nMango", "- ", lines => true);
console.log(indented);
```

Result:

```text
- Apple
- 
- Banana
- 
- Orange
- 
- Blueberry
- 
- Avocado
- 
- Mango
```
