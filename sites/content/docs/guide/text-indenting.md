---
title: Pengindentasi Teks
weight: 5
prev: /docs/guide/text-dedenting
next: /docs/guide/advanced-options
---

Indentasi teks adalah proses menambahkan awalan tertentu ke awal setiap baris dalam blok teks. Hal ini berguna untuk membuat poin-poin penting, kutipan, atau sekadar menambahkan struktur pada teks Anda. TextWrap menyediakan metode `indent` langsung yang memungkinkan Anda menambahkan string tertentu ke setiap baris dalam blok teks.

<!--more-->

## Penggunaan Dasar

Metode `indent` memungkinkan Anda untuk menambahkan awalan pada setiap baris teks Anda. Hal ini sangat berguna ketika Anda perlu memformat daftar, kutipan, atau teks terstruktur lainnya.

```javascript {filename="example.js"}
const indented = textwrap.indent("Apple\nBanana\nOrange\nBlueberry\nAvocado\nMango", "- ");
console.log(indented);
```

Hasil:

```text
- Apple
- Banana
- Orange
- Blueberry
- Avocado
- Mango
```

## Predikat Khusus

Predikat dalam pemrograman adalah fungsi yang mengembalikan nilai boolean (`true` atau `false`) berdasarkan suatu kondisi. Saat menggunakan predikat khusus dengan metode indentasi, predikat diterapkan pada setiap baris teks, dan hanya baris yang predikatnya bernilai benar yang akan diindentasi.

Mari kita mulai dengan contoh dasar di mana kita hanya membuat indentasi pada baris yang berisi kata kunci tertentu.

### 1. Mengindentasi Baris yang Mengandung Kata Tertentu

```javascript {filename="example.js"}
const text = `Apple is a fruit.
Bananas are yellow.
An orange is also a fruit.
`;

const indented = textwrap.indent(text, "> ", lines => lines.includes("fruit"));
console.log(indented);
```

Hasil:

```text
> Apple is a fruit.
Bananas are yellow.
> An orange is also a fruit.
```

Contoh lainnya:

```javascript {filename="example.js"}
const text = "Apple\nBanana\nOrange\nBlueberry\nAvocado\nMango";
const indented = textwrap.indent(text, "- ", lines => lines.startsWith("A"));
console.log(indented);
```

Hasil:

```text
- Apple
Banana
Orange
Blueberry
- Avocado
Mango
```

### 2. Mengindentasi Berdasarkan Panjang atau Kata Kunci (Beberapa Kondisi)

Anda dapat membuat predikat yang lebih kompleks dengan menggabungkan beberapa kondisi. Misalnya, Anda mungkin ingin membuat indentasi baris yang sangat panjang atau mengandung kata kunci tertentu.

```javascript {filename="example.js"}
const text = `Short line.
This line is particularly long and contains many words.
Another short line.
Here is a line about fruits and vegetables.
`;

const indented = textwrap.indent(text, "- ", line => line.length > 30 || line.includes("fruits"));
console.log(indented);
```

Hasil:

```text
Short line.
- This line is particularly long and contains many words.
Another short line.
- Here is a line about fruits and vegetables.
```

### 3. Mengindentasi Semua Baris Termasuk Baris Kosong

Untuk menambahkan indentasi ke dalam semua baris, termasuk baris kosong, Anda dapat menggunakan predikat khusus dengan nilai `true`.

```javascript {filename="example.js"}
const indented = textwrap.indent("Apple\n\nBanana\n\nOrange\n\nBlueberry\n\nAvocado\n\nMango", "- ", lines => true);
console.log(indented);
```

Hasil:

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
