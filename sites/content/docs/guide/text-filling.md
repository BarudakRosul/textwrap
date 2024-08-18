---
title: Pengisian Teks
weight: 2
prev: /docs/guide/text-wrapping
next: /docs/guide/text-shortening
---

Pengisian teks adalah fitur yang mirip dengan pembungkusan teks dengan tidak hanya membungkus teks agar sesuai dengan lebar yang ditentukan, tetapi juga dengan mengembalikan teks yang dibungkus sebagai satu string, dengan baris yang digabungkan dengan karakter baris baru (`\n`). Hal ini sangat berguna ketika Anda perlu menampilkan atau menampilkan teks sebagai blok yang diformat, seperti pada aplikasi konsol, file log, atau komponen UI berbasis teks.

<!--more-->

## Penggunaan Dasar

Penggunaan pengisian teks yang paling mudah adalah dengan mengambil blok teks dan memformatnya ke lebar tertentu. Hal ini dapat dilakukan dengan mudah dengan TextWrap.

```javascript {filename="example.js"}
const filled = textwrap.fill("This is a long line of text that needs to be wrapped properly without cutting words in half.");
console.log(filled);
```

Hasil:

```text
This is a long line of text that needs to be wrapped properly without
cutting words in half.
```

Dalam contoh ini, teks diisi dengan 70 karakter (nilai default), untuk memastikan bahwa tidak ada kata yang terpotong, kecuali jika melebihi lebar maksimum.

## Lebar Khusus

Jika Anda ingin mengisi teks berdasarkan lebar yang diinginkan, perhatikan contoh berikut ini:

```javascript {filename="example.js"}
const filled = textwrap.fill("This is a long line of text that needs to be wrapped properly without cutting words in half.", 25);
console.log(filled);
```

Hasil:

```text
This is a long line of
text that needs to be
wrapped properly without
cutting words in half.
```
