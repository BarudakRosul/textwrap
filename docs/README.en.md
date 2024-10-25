<div align="center">
  <img src="../image/logo.svg" alt="TextWrap Logo" width="210"/>
  <h1>TextWrap</h1>
  <p><a href="/docs/README.en.md">English</a></p>
  <p><a href="https://github.com/BarudakRosul/textwrap/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml">Report Bug</a> · <a href="https://github.com/BarudakRosul/textwrap/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml">Request Feature</a></p>
  <p>
    <a href="https://github.com/BarudakRosul/textwrap/actions/workflows/test.yml"><img src="https://github.com/BarudakRosul/textwrap/actions/workflows/test.yml/badge.svg" alt="Testing"/></a>
    <a href="https://npmjs.com/package/@barudakrosul/textwrap"><img src="https://img.shields.io/node/v/%40barudakrosul%2Ftextwrap" alt="Node Engines"/></a>
    <a href="https://npmjs.com/package/@barudakrosul/textwrap"><img src="https://img.shields.io/npm/v/@barudakrosul/textwrap" alt="NPM Version"/></a>
    <a href="/LICENSE"><img src="https://img.shields.io/github/license/BarudakRosul/textwrap" alt="License"/></a>
    <a href="https://npmjs.com/package/@barudakrosul/textwrap"><img src="https://img.shields.io/npm/d18m/%40barudakrosul%2Ftextwrap" alt="Downloads"/></a>
    <a href="https://github.com/BarudakRosul/textwrap/stargazers"><img src="https://img.shields.io/github/stars/BarudakRosul/textwrap?style=flat" alt="Stars"/></a>
    <a href="https://github.com/BarudakRosul/textwrap/network/members"><img src="https://img.shields.io/github/forks/BarudakRosul/textwrap?style=flat" alt="Forks"/></a>
    <a href="https://github.com/BarudakRosul/textwrap/issues"><img src="https://img.shields.io/github/issues/BarudakRosul/textwrap" alt="Issues"/></a>
  </p>
  <a href="https://techforpalestine.org/learn-more"><img src="https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/banner-support.svg" width="100%" alt="Support Palestine"/></a>
</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contribution](#contribution)
6. [License](#license)
7. [Acknowledge](#acknowledge)
8. [Donate](#donate)
9. [Changelog](#changelog)

## Introduction

TextWrap is a JavaScript implementation of the `textwrap` module available in Python, which provides several functions to wrap and format paragraphs of text with a delimited line length. This module is useful for formatting text to make it easier to read or for display needs.

## Features

TextWrap offers the following features:

- **Wrap Text**: Wraps text into multiple lines (with array type) according to the given width.
- **Fill Text**: Wraps text like `wrap`, but returns the wrapped text as a single string, with lines separated by the newline character (`\n`).
- **Shorten Text**: Wraps the text into a single line with the given maximum width, replacing the end of the text with a placeholder if the text is too long.
- **Dedent Text**: Removes the common indent from each line in the given text.
- **Indent Text**: Adds a prefix string (indent) at the beginning of each line of the given text. The `predicate` option can be used to control which lines will be given the prefix.

## Installation

To install TextWrap locally, follow these installation steps:

```shell
npm install @barudakrosul/textwrap
```

## Usage

To start using TextWrap, import the module first:

**1\. CommonJS**
```javascript
const textwrap = require("@barudakrosul/textwrap");
```

**2\. ESM (ECMAScript Modules)**
```javascript
import textwrap from "@barudakrosul/textwrap";
```

**3\. TypeScript**
```typescript
import textwrap from "@barudakrosul/textwrap";
```

Example of usage:

### Wrap Text

```javascript
console.log(textwrap.wrap("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 11))

// Result:
//   [
//     'Lorem ipsum', 'dolor sit',
//     'amet,',       'consectetur',
//     'adipisicing', 'elit, sed',
//     'do eiusmod',  'tempor',
//     'incididunt',  'ut labore',
//     'et dolore',   'magna',
//     'aliqua.'
//   ]
```

### Fill Text

```javascript
console.log(textwrap.fill("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 11))

// Result:
//   Lorem ipsum
//   dolor sit
//   amet,
//   consectetur
//   adipisicing
//   elit, sed
//   do eiusmod
//   tempor
//   incididunt
//   ut labore
//   et dolore
//   magna
//   aliqua.
```

### Shorten Text

```javascript
console.log(textwrap.shorten("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 59))

// Result:
//   Lorem ipsum dolor sit amet, consectetur adipisicing [...]
```

### Dedent Text

```javascript
console.log(textwrap.dedent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua."))

// Result:
//   Lorem ipsum dolor sit amet,
//   consectetur adipisicing elit,
//   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

### Indent Text

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> "))

// Result:
//   > Lorem ipsum dolor sit amet,
//   > consectetur adipisicing elit,
//   > sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

The example adds a prefix to every newline, including empty ones:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\n\n\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => true))

// Result:
//   > Lorem ipsum dolor sit amet,
//   >
//   >
//   > consectetur adipisicing elit,
//   > sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

The example adds a prefix to each line that starts with a specific string:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => lines.startsWith("Lorem")))

// Result:
//   > Lorem ipsum dolor sit amet,
//   consectetur adipisicing elit,
//   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

The example adds a prefix to each line that contains a specific string:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => lines.includes(",")))

// Result:
//   > Lorem ipsum dolor sit amet,
//   consectetur adipisicing elit,
//   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

The example adds a prefix to each line that has a certain length limit:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => lines.length > 28))

// Result:
//   Lorem ipsum dolor sit amet,
//   > consectetur adipisicing elit,
//   > sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

For the functions `wrap()`, `fill()`, and `shorten()` have additional options. The supported options include:

<table>
  <tr>
    <td><p align="center"><b>Name</b></p></td>
    <td><p align="center"><b>Description</b></p></td>
    <td><p align="center"><b>Type</b></p></td>
    <td><p align="center"><b>Default value</b></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>width</code></p></td>
    <td><p align="left">Maximum width of wrapped lines (unless <code>break_long_words</code> is <code>false</code>)</code>).</p></td>
    <td><p align="center"><code>number</code></p></td>
    <td><p align="center">70</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>initial_indent</code></p></td>
    <td><p align="left">The indent string for the first line.</p></td>
    <td><p align="center"><code>string</code></p></td>
    <td><p align="center">""</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>subsequent_indent</code></p></td>
    <td><p align="left">The indentation string for the next lines.</p></td>
    <td><p align="center"><code>string</code></p></td>
    <td><p align="center">""</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>expand_tabs</code></p></td>
    <td><p align="left">If <code>true</code>, tabs will be replaced with spaces.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>replace_whitespace</code></p></td>
    <td><p align="left">If <code>true</code>, the whitespace character will be replaced with a space.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>fix_sentence_endings</code></p></td>
    <td><p align="left">If <code>true</code>, two spaces will be added after the period at the end of the sentence.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>false</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>break_long_words</code></p></td>
    <td><p align="left">If <code>true</code>, words longer than the line width will be split.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>drop_whitespace</code></p></td>
    <td><p align="left">If <code>true</code>, whitespace at the beginning and end of the line will be removed.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>break_on_hyphens</code></p></td>
    <td><p align="left">If <code>true</code>, the text will be broken at the hyphen.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>tabsize</code></p></td>
    <td><p align="left">Tab size in characters.</p></td>
    <td><p align="center"><code>number</code></p></td>
    <td><p align="center">8</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>max_lines</code></p></td>
    <td><p align="left">Maximum number of rows.</p></td>
    <td><p align="center"><code>number | null</code></p></td>
    <td><p align="center"><code>null</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>placeholder</code></p></td>
    <td><p align="left">A string used to replace the end of the text if it is too long.</p></td>
    <td><p align="center"><code>string</code></p></td>
    <td><p align="center"><code> [...]</code></p></td>
  </tr>
</table>

A basic example of using the option:

```javascript
const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const width = 20;
const options = {
  fix_sentence_endings: true,
  break_long_words: false
};

console.log(textwrap.wrap(text, width, options));
```

## Contribution

Contributions to TextWrap are greatly appreciated! Whether reporting bugs, suggesting new features, or contributing to code improvements.

## License

TextWrap is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Acknowledge

TextWrap appreciates the support and contributions of the following individuals and open source projects:

- [@FajarKim](https://github.com/FajarKim) - Lead developer and creator of the application.
- [TextWrap Python](https://docs.python.org/3/library/textwrap.html) module - The original source for developing TextWrap JavaScript.
- Open source community - For valuable contributions to the tools and libraries used in this project.

## Donate

We really appreciate your support to continue developing this project. If you find this project useful, you can support us with a donation:

[![Ko-fi](https://img.shields.io/badge/Ko%e2%80%91fi-donate-7480ff?logo=ko-fi&logoColor=cyan)](https://ko-fi.com/barudakrosul)
[![Trakteer](https://custom-icon-badges.demolab.com/badge/Trakteer-donate-red?logo=trakteerid&logoColor=pink)](https://trakteer.id/barudakrosul)

Every donation, no matter the amount, means a lot to us. Thank you for your support! ❤️

## Changelog

Keep up with the latest changes and updates of TextWrap by referring to [Changelog](https://github.com/BarudakRosul/textwrap/releases).

Thank you for choosing TextWrap! We aim to provide an easy solution for formatting text or paragraphs in multiple environments.

[![Stand with Palestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/StandWithPalestine.svg)](https://techforpalestine.org/learn-more)
