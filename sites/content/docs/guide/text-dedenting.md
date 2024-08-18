---
title: Pemenggalan Teks
weight: 4
prev: /docs/guide/text-shortening
next: /docs/guide/text-indenting
---

Pemenggalan teks adalah proses yang digunakan untuk menghilangkan spasi di depan setiap baris dalam blok teks. Hal ini sangat berguna ketika bekerja dengan string multi-baris yang menjorok ke dalam kode sumber namun perlu disejajarkan dengan benar ketika dirender atau ditampilkan. TextWrap menyediakan metode `dedent` yang nyaman untuk menyederhanakan tugas ini.

<!--more-->

## Penggunaan Dasar

Penggunaan paling dasar dari pemenggalan teks adalah menghapus spasi di depan yang umum dari tiap baris dari string multi-baris.

```javascript {filename="example.js"}
const text = `
    This is an example of indented text.
    The leading spaces on each line will be removed.
    This helps in keeping the code clean and readable.
`;
const dedented = textwrap.dedent(text);
console.log(dedented);
```

Hasil:

```text
This is an example of indented text.
The leading spaces on each line will be removed.
This helps in keeping the code clean and readable.
```

Dalam contoh ini, metode ini menghilangkan spasi di depan dari setiap baris dalam teks yang disediakan. Hal ini sangat berguna ketika teks menjorok ke dalam di kode sumber namun perlu disejajarkan dengan benar saat dirender.

Contoh lainnya:

```javascript {filename="example.js"}
const dedented = textwrap.dedent("  \thello there\n  \t  how are you?");
console.log(dedented);
```

Hasil:

```text
hello there
  how are you?
```
