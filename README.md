<div align="center">
  <img src="./image/logo.svg" alt="TextWrap Logo" width="210"/>
  <h1>TextWrap</h1>
  <p><a href="/docs/README-EN.md">English</a></p>
  <p><a href="https://github.com/BarudakRosul/textwrap/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml">Laporkan Bug</a> · <a href="https://github.com/BarudakRosul/textwrap/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml">Ajukan Fitur</a></p>
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

## Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Fitur](#fitur)
3. [Instalasi](#instalasi)
4. [Penggunaan](#penggunaan)
5. [Berkontribusi](#berkontribusi)
6. [Lisensi](#lisensi)
7. [Penghargaan](#penghargaan)
8. [Donasi](#donasi)
9. [Catatan Perubahan](#catatan-perubahan)

## Pendahuluan

TextWrap adalah implementasi JavaScript dari modul `textwrap` yang tersedia di Python, yang menyediakan beberapa fungsi untuk membungkus dan memformat paragraf teks dengan panjang baris yang dibatasi. Modul ini berguna untuk memformat teks agar lebih mudah dibaca atau untuk kebutuhan tampilan.

## Fitur

TextWrap menawarkan fitur-fitur berikut:

- **Teks Wrap**: Membungkus teks menjadi beberapa baris (dengan tipe array) sesuai dengan lebar yang diberikan.
- **Teks Fill**: Membungkus teks seperti `wrap`, tetapi mengembalikan teks yang sudah dibungkus sebagai satu string, dengan baris-baris dipisahkan oleh karakter _newline_ (`\n`).
- **Teks Shorten**: Membungkus teks menjadi satu baris dengan lebar maksimum yang diberikan, menggantikan bagian akhir teks dengan _placeholder_ jika teks terlalu panjang.
- **Teks Dedent**: Menghapus indentasi umum dari setiap baris dalam teks yang diberikan.
- **Teks Indent**: Menambahkan string _prefix_ (indentasi) di awal setiap baris dari teks yang diberikan. Opsi `predicate` dapat digunakan untuk mengontrol baris mana yang akan diberi _prefix_.

## Instalasi

Untuk menginstal TextWrap secara lokal, ikuti langkah instalasi ini:

```shell
npm install @barudakrosul/textwrap
```

## Penggunaan

Untuk memulai menggunakan TextWrap, import modulnya terlebuh dahulu:

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

Contoh penggunaan:

### Teks Wrap

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

### Teks Fill

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

### Teks Shorten

```javascript
console.log(textwrap.shorten("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 59))

// Result:
//   Lorem ipsum dolor sit amet, consectetur adipisicing [...]
```

### Teks Dedent

```javascript
console.log(textwrap.dedent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua."))

// Result:
//   Lorem ipsum dolor sit amet,
//   consectetur adipisicing elit,
//   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

### Teks Indent

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> "))

// Result:
//   > Lorem ipsum dolor sit amet,
//   > consectetur adipisicing elit,
//   > sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

Contoh menambahkan _prefix_ untuk setiap newline, termasuk yang kosong:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\n\n\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => true))

// Result:
//   > Lorem ipsum dolor sit amet,
//   >
//   >
//   > consectetur adipisicing elit,
//   > sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

Contoh menambahkan _prefix_ untuk setiap baris yang dimulai dengan string tertentu secara spesifik:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => lines.startsWith("Lorem")))

// Result:
//   > Lorem ipsum dolor sit amet,
//   consectetur adipisicing elit,
//   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

Contoh menambahkan _prefix_ untuk setiap baris yang terdapat string tertentu secara spesifik:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => lines.includes(",")))

// Result:
//   > Lorem ipsum dolor sit amet,
//   consectetur adipisicing elit,
//   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

Contoh menambahkan _prefix_ untuk setiap baris yang yang memiliki batas panjang tertentu:

```javascript
console.log(textwrap.indent("Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "> ", lines => lines.length > 28))

// Result:
//   Lorem ipsum dolor sit amet,
//   > consectetur adipisicing elit,
//   > sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

Untuk fungsi `wrap()`, `fill()`, dan `shorten()` mempunyai opsi tambahan. Adapun, opsi yang didukung di antaranya:

<table>
  <tr>
    <td><p align="center"><b>Nama</b></p></td>
    <td><p align="center"><b>Keterangan</b></p></td>
    <td><p align="center"><b>Tipe</b></p></td>
    <td><p align="center"><b>Nilai default</b></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>width</code></p></td>
    <td><p align="left">Lebar maksimum baris yang dibungkus (kecuali <code>break_long_words</code> adalah <code>false</code>).</p></td>
    <td><p align="center"><code>number</code></p></td>
    <td><p align="center">70</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>initial_indent</code></p></td>
    <td><p align="left">String indentasi untuk baris pertama.</p></td>
    <td><p align="center"><code>string</code></p></td>
    <td><p align="center">""</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>subsequent_indent</code></p></td>
    <td><p align="left">String indentasi untuk baris-baris berikutnya.</p></td>
    <td><p align="center"><code>string</code></p></td>
    <td><p align="center">""</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>expand_tabs</code></p></td>
    <td><p align="left">Jika <code>true</code>, tab akan digantikan dengan spasi.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>replace_whitespace</code></p></td>
    <td><p align="left">Jika <code>true</code>, karakter <i>whitespace</i> akan digantikan dengan spasi.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>fix_sentence_endings</code></p></td>
    <td><p align="left">Jika <code>true</code>, dua spasi akan ditambahkan setelah tanda titik di akhir kalimat.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>false</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>break_long_words</code></p></td>
    <td><p align="left">Jika <code>true</code>, kata-kata yang lebih panjang dari lebar baris akan dipecah.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>drop_whitespace</code></p></td>
    <td><p align="left">Jika <code>true</code>, <i>whitespace</i> di awal dan akhir baris akan dihapus.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>break_on_hyphens</code></p></td>
    <td><p align="left">Jika <code>true</code>, teks akan dipecah pada tanda hubung.</p></td>
    <td><p align="center"><code>boolean</code></p></td>
    <td><p align="center"><code>true</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>tabsize</code></p></td>
    <td><p align="left">Ukuran tab dalam karakter.</p></td>
    <td><p align="center"><code>number</code></p></td>
    <td><p align="center">8</p></td>
  </tr>
  <tr>
    <td><p align="left"><code>max_lines</code></p></td>
    <td><p align="left">Jumlah maksimum baris.</p></td>
    <td><p align="center"><code>number | null</code></p></td>
    <td><p align="center"><code>null</code></p></td>
  </tr>
  <tr>
    <td><p align="left"><code>placeholder</code></p></td>
    <td><p align="left">String yang digunakan untuk menggantikan bagian akhir teks jika terlalu panjang.</p></td>
    <td><p align="center"><code>string</code></p></td>
    <td><p align="center"><code> [...]</code></p></td>
  </tr>
</table>

Contoh dasar penggunaan opsi tersebut:

```javascript
const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const width = 20;
const options = {
  fix_sentence_endings: true,
  break_long_words: false
};

console.log(textwrap.wrap(text, width, options));
```

## Berkontribusi

Kontribusi pada TextWrap sangat dihargai! Baik melaporkan bug, menyarankan fitur baru, atau berkontribusi pada perbaikan kode.

## Lisensi

TextWrap dilisensikan di bawah Lisensi MIT - lihat berkas [LICENSE](/LICENSE) untuk detailnya.

## Penghargaan

TextWrap menghargai dukungan dan kontribusi dari individu dan proyek sumber terbuka berikut:

- [@FajarKim](https://github.com/FajarKim) - Pengembang utama dan pencipta aplikasi.
- Modul [TextWrap Python](https://docs.python.org/3/library/textwrap.html) - Sumber asli dalam pengembangan TextWrap JavaScript.
- Komunitas sumber terbuka - Untuk kontribusi berharga pada alat dan perpustakaan yang digunakan dalam proyek ini.

## Donasi

Kami sangat menghargai dukungan Anda untuk terus mengembangkan proyek ini. Jika Anda merasa proyek ini bermanfaat, Anda dapat mendukung kami dengan donasi:

[![Ko-fi](https://img.shields.io/badge/Ko%e2%80%92fi-donate-7480ff?logo=ko-fi&logoColor=cyan)](https://ko-fi.com/barudakrosul)
[![Trakteer](https://custom-icon-badges.demolab.com/badge/Trakteer-donate-red?logo=trakteerid&logoColor=pink)](https://trakteer.id/barudakrosul)

Setiap donasi, berapapun jumlahnya, sangat berarti bagi kami. Terima kasih atas dukungan Anda! ❤️

## Catatan Perubahan

Terus ikuti perubahan dan pembaruan terbaru TextWrap dengan mengacu ke [Catatan Perubahan](https://github.com/BarudakRosul/textwrap/releases).

Terima kasih telah memilih TextWrap! Kami bertujuan untuk memberikan solusi yang mudah untuk memformat teks atau paragraf di beberapa lingkungan.

[![Stand with Palestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/StandWithPalestine.svg)](https://techforpalestine.org/learn-more)