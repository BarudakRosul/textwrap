---
title: Opsi Lanjutan
weight: 6
prev: /docs/guide/text-indenting
---

Dalam TextWrap, metode `wrap()`, `fill()`, dan `shorten()` dirancang untuk menawarkan pemformatan teks yang fleksibel. Di luar penggunaan dasar, fungsi-fungsi ini menyediakan opsi lanjutan yang memberikan Anda kontrol yang baik atas bagaimana teks diproses dan diformat.

<!--more-->

## Opsi yang Didukung

- **`width`**</br>
  (default: `70`) – Panjang maksimum baris yang dibungkus. Selama tidak ada kata dalam teks input yang lebih panjang dari `width`, TextWrap menjamin bahwa tidak ada baris output yang lebih panjang dari karakter `width`.
- **`expand_tabs`**</br>
  (default: `true`) – Jika `true`, maka semua karakter tab pada teks akan diperluas menjadi spasi dengan menggunakan metode teks [`expandTabs()`](https://npm.im/@barudakrosul/expand-tabs).
- **`tabsize`**</br>
  (default: `8`) – Jika `expand_tabs` bernilai `true`, maka semua karakter tab pada teks akan diperluas hingga nol spasi atau lebih, tergantung pada kolom saat ini dan ukuran tab yang diberikan.
- **`replace_whitespace`**</br>
  (default: `true`) – Jika `true`, setelah perluasan tab tetapi sebelum pembungkusan, metode `wrap ()`, `fill ()`, atau `shorten ()` akan mengganti setiap karakter spasi dengan spasi tunggal. Karakter spasi yang diganti adalah sebagai berikut: tab, baris baru, tab vertikal, _formfeed_, dan _carriage return_ (`'\t\n\v\f\r'`).</br>
  {{< callout type="info" >}}
    Jika `expand_tabs` bernilai `false` dan `replace_whitespace` bernilai `true`, setiap karakter tab akan digantikan oleh satu spasi, yang tidak sama dengan perluasan tab.
  {{< /callout >}}

  {{< callout type="info" >}}
    Jika `replace_whitespace` bernilai `false`, baris baru dapat muncul di tengah-tengah baris dan menyebabkan output yang aneh. Untuk alasan ini, teks harus dipecah menjadi beberapa paragraf (menggunakan [`String.splitLines()`](https://npm.im/@barudakrosul/split-lines) atau sejenisnya) yang dibungkus secara terpisah.
  {{< /callout >}}
- **`drop_whitespace`**</br>
  (default: `true`) – Jika `true`, spasi pada awal dan akhir setiap baris (setelah pembungkusan tetapi sebelum indentasi) dihilangkan. Namun, spasi di awal paragraf tidak akan dihilangkan jika tidak ada spasi yang mengikutinya. Jika spasi yang dibuang memenuhi seluruh baris, seluruh baris akan dibuang.
- **`initial_indent`**</br>
  (default: `''`) – String yang akan ditambahkan ke baris pertama output yang dibungkus. Dihitung sebagai panjang baris pertama. String kosong tidak diindentasi.
- **`subsequent_indent`**</br>
  (default: `''`) – String yang akan ditambahkan ke semua baris output yang dibungkus kecuali baris pertama. Dihitung berdasarkan panjang setiap baris kecuali baris pertama.
- **`fix_sentence_endings`**</br>
  (default: `false`) – Jika `true`, TextWrap mencoba mendeteksi akhiran kalimat dan memastikan bahwa kalimat selalu dipisahkan oleh dua spasi. This is generally desired for text in a monospaced font. Namun, algoritma pendeteksian kalimat ini tidak sempurna: algoritma ini mengasumsikan bahwa akhiran kalimat terdiri dari huruf kecil yang diikuti oleh salah satu dari `'.'`, `'!'`, atau `'?'`, mungkin diikuti oleh salah satu dari `'"'` atau `"'"`, yang diikuti oleh spasi. Salah satu masalah dengan algoritme ini adalah bahwa algoritme ini tidak dapat mendeteksi perbedaan antara “Dr.” dalam</br>
  ```mathematica
  [...] Dr. Frankenstein's monster [...]
  ```

  ```mathematica
  [...] See Spot. See Spot run [...]
  ```

  `fix_sentence_endings` bernilai `false` secara default.</br>
  Karena algoritme pendeteksian kalimat bergantung pada `String.toLowerCase` untuk definisi “huruf kecil”, dan konvensi penggunaan dua spasi setelah titik untuk memisahkan kalimat di baris yang sama, algoritme ini khusus untuk teks berbahasa Inggris.
- **`break_long_words`**</br>
  (default: `true`) – Jika `true`, maka kata yang lebih panjang dari `width` akan diputus untuk memastikan tidak ada baris yang lebih panjang dari `width`. Jika `false`, kata yang panjang tidak akan diputus, dan beberapa baris mungkin lebih panjang dari `width`. (Kata-kata yang panjang akan diletakkan pada satu baris dengan sendirinya, untuk meminimalkan jumlah yang melebihi `width`).
- **`break_on_hyphens`**</br>
  (default: `true`) – Jika `true`, pemenggalan akan terjadi sebaiknya pada spasi dan tepat setelah tanda penghubung pada kata majemuk, seperti yang biasa terjadi dalam bahasa Inggris. Jika `false`, hanya spasi yang akan dianggap sebagai tempat yang baik untuk pemenggalan baris, tetapi Anda perlu mengatur `break_long_words` ke `false` jika Anda menginginkan kata-kata yang benar-benar tidak dapat dipenggal. Perilaku default pada versi sebelumnya adalah selalu memperbolehkan pemenggalan kata yang diberi tanda hubung.
- **`max_lines`**</br>
  (default: `null`) – Jika bukan `null`, maka output akan berisi paling banyak baris `max_lines`, dengan placeholder yang muncul di akhir output.
- **`placeholder`**</br>
  (default: `' [...]'`) – String yang akan muncul di akhir teks keluaran jika telah terpotong.

## Penggunaan Dasar

```javascript {filename="example.js"}
const text = "This is a long line of text that needs\tto be wrapped properly\twithout cutting\twords in half.";
const options = {
  replace_whitespace: false,
  tabsize: 12,
  initial_indent: "[!] "
}
const wrapped = textwrap.wrap(text, 20, options)

console.log(wrapped);
```

Hasil:

```javascript
[
  '[!] This is a long',
  'line of text that',
  'needs          to be',
  'wrapped properly',
  'without cutting',
  'words in half.'
]
```

Contoh lainnya:

```javascript {filename="example.js"}
const text = "This is a long piece of text that needs to be shortened for display purposes.";
const options = {
  placeholder: " (...)"
};
const shortened = textwrap.shorten(text, 30, options);

console.log(shortened);
```

Hasil:

```text
This is a long piece of (...)
```
