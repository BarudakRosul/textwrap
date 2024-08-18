---
title: Pembungkusan Teks
weight: 1
prev: /docs/guide
next: /docs/guide/text-filling
---

Pembungkusan teks adalah fitur mendasar dari TextWrap, yang memungkinkan Anda memformat teks dengan rapi dengan memecahnya menjadi beberapa baris tanpa memisah-misahkan kata secara sembarangan.

<!--more-->

## Penggunaan Dasar

Pada intinya, pembungkusan teks di TextWrap melibatkan pemecahan string teks yang panjang menjadi beberapa baris, masing-masing dengan lebar maksimum yang ditentukan oleh pengguna. Penggunaan dasarnya sangat mudah:

```javascript {filename="example.js"}
const wrapped = textwrap.wrap("This is a long line of text that needs to be wrapped properly without cutting words in half.");
console.log(wrapped);
```

Hasil:

```javascript
[
  'This is a long line of text that needs to be wrapped properly without',
  'cutting words in half.'
]
```

Dalam contoh ini, teks dibungkus dengan 70 karakter (nilai default), memastikan tidak ada kata yang terpotong kecuali jika melebihi lebar maksimum.

## Lebar Khusus

Jika Anda ingin membungkus teks berdasarkan lebar yang diinginkan, perhatikan contoh berikut:

```javascript {filename="example.js"}
const wrapped = textwrap.wrap("This is a long line of text that needs to be wrapped properly without cutting words in half.", 25);
console.log(wrapped);
```

Hasil:

```javascript
[
  'This is a long line of',
  'text that needs to be',
  'wrapped properly without',
  'cutting words in half.'
]
```
