---
title: Pemendekan Teks
weight: 3
prev: /docs/guide/text-filling
next: /docs/guide/text-dedenting
---

Pemendekan teks adalah fitur penting saat bekerja dengan konten yang harus muat dalam ruang terbatas, seperti di antarmuka pengguna, ringkasan data, atau pratinjau. Metode pemendekan di TextWrap dirancang untuk memotong string teks ke panjang maksimum yang ditentukan, menambahkan placeholder yang dapat disesuaikan (seperti elips) untuk menunjukkan bahwa teks telah dipendekkan.

<!--more-->

## Penggunaan Dasar

Penggunaan pemendekan teks yang paling mudah adalah untuk memotong teks ke panjang tertentu. Berikut ini adalah cara untuk melakukannya dengan TextWrap.

```javascript {filename="example.js"}
const text = "This is a long piece of text that needs to be shortened for display purposes.";
const shortened = textwrap.shorten(text, 30);
console.log(shortened);
```

Hasil:

```text
This is a long piece of [...]
```

Dalam contoh ini, teks dipersingkat menjadi 30 karakter, untuk memastikan tidak ada kata yang terpotong, dan jika melebihi lebar maksimum akan menambahkan placeholder.
