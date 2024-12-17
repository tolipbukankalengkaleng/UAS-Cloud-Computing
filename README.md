# Orkestrasi Sistem Konversi (Temperature, Length, Weight)

**Penugasan UAS Cloud Computing - PTIK - 2021**

**Anggota Kelompok :**
1. Achmad
2. Bagas
3. Reza

## Deskripsi Proyek

Proyek ini adalah sistem orkestrasi untuk melakukan konversi suhu, panjang, dan berat menggunakan mikroservis yang terpisah. Orkestrator akan mengarahkan permintaan ke layanan konversi yang sesuai.

## Apa Itu Microservices dan Orkestrasi?

- **Microservices** adalah pendekatan untuk mengembangkan aplikasi sebagai serangkaian layanan kecil yang berkomunikasi satu sama lain.
- **Orkestrasi** adalah pengelolaan komunikasi antar layanan untuk memastikan bahwa mereka bekerja bersama-sama dalam aplikasi yang lebih besar. Dalam proyek ini, Orkestrator mengarahkan permintaan untuk konversi suhu, panjang, dan berat ke layanan yang tepat.

## Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda sudah menginstal dependensi berikut:

### 1. **Node.js**
Proyek ini menggunakan **Node.js** sebagai runtime untuk menjalankan aplikasi backend. Pastikan Node.js versi 14 atau lebih baru sudah terinstal di sistem Anda.

- **Unduh dan install Node.js** dari [nodejs.org](https://nodejs.org/)
- Untuk memeriksa apakah Node.js sudah terinstal, jalankan perintah berikut di terminal:
  
`node -v`


### 2. **NPM (Node Package Manager)**
NPM adalah package manager yang digunakan untuk mengelola dependensi proyek.

NPM biasanya terinstal secara otomatis ketika Anda menginstal Node.js.
Untuk memeriksa versi NPM, jalankan perintah berikut:

`npm -v`


### 3. **Docker**
Proyek ini menggunakan Docker untuk menjalankan beberapa layanan mikroservis dalam container. Pastikan Anda sudah menginstal Docker dan Docker Compose.

- **Unduh dan install Docker** dari [docker.com](https://www.docker.com/)
- Untuk memeriksa apakah Docker sudah terinstal, jalankan perintah berikut:

`docker -v docker-compose -v`


Jika Anda menggunakan Windows, pastikan untuk mengaktifkan WSL (Windows Subsystem for Linux) agar Docker dapat berjalan dengan baik. Anda bisa mengikuti petunjuk ini untuk menginstal Docker Desktop: [Install Docker Desktop](https://docs.docker.com/get-docker/).

### 4. **Git**
Pastikan Git terinstal di sistem Anda untuk mengelola kode sumber dan mengunduh proyek dari GitHub.

- **Unduh dan install Git** dari [git-scm.com](https://git-scm.com/)
- Untuk memeriksa apakah Git sudah terinstal, jalankan perintah berikut:

`git --version`


## Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek ini:

### 1. Clone Repository
Clone repositori ini ke lokal Anda:

`git clone https://github.com/tolipbukankalengkaleng/UAS-Cloud-Computing.git`

### 2. Instalasi Dependensi Node.js
Setelah proyek di-clone, masuk ke direktori proyek dan instal dependensi Node.js:

`cd UAS-Cloud-Computing`

`npm install`


### 3. Menjalankan Layanan Mikroservis
Proyek ini menggunakan Docker Compose untuk menjalankan beberapa layanan secara bersamaan. Layanan yang dijalankan meliputi:

- Orkestrator (Port 5000)
- Temperature Service (Port 5001)
- Length Service (Port 5002)
- Weight Service (Port 5003)

Untuk menjalankan semua layanan, gunakan perintah berikut:

`docker-compose up`

Perintah ini akan membangun dan menjalankan semua layanan yang telah dikonfigurasi di dalam file `docker-compose.yml`. Setelah layanan berjalan, Anda dapat mengakses Orkestrator di [http://localhost:5000](http://localhost:5000).

### 4. Menguji Endpoints
Setelah aplikasi berjalan, Anda dapat menguji layanan melalui Postman atau alat serupa dengan mengirimkan permintaan ke endpoint berikut:

#### Konversi Suhu (POST)

- **Endpoint**: [http://localhost:5000/converter/convert-temperature](http://localhost:5000/converter/convert-temperature)
- **Body (contoh)**:

  ```json
  {
    "value": 100,
    "from_unit": "Celsius",
    "to_unit": "Fahrenheit"
  }

#### Konversi Panjang (POST)

- **Endpoint**: [http://localhost:5000/converter/convert-length](http://localhost:5000/converter/convert-length)
- **Body (contoh)**:

  ```json
  {
    "value": 100,
    "from_unit": "Meter",
    "to_unit": "Kilometer"
  }

#### Konversi Berat (POST)

- **Endpoint**: [http://localhost:5000/converter/convert-weight](http://localhost:5000/converter/convert-weight)
- **Body (contoh)**:

  ```json
  {
    "value": 100,
    "from_unit": "Gram",
    "to_unit": "Kilogram"
  }


### Unit Value yang Valid:

- **Temperature**: 
  - "Celsius"
  - "Kelvin"
  - "Fahrenheit"

- **Length / Panjang**: 
  - "Meter"
  - "Kilometer"
  - "Inch"

- **Weight**: 
  - "Gram"
  - "Kilogram"
  - "Ons"

---

## Troubleshooting

- **Docker Compose tidak berjalan**: 
  Pastikan Docker sudah berjalan di mesin Anda. Jika tidak, buka aplikasi Docker Desktop (untuk Windows atau Mac) atau jalankan Docker di terminal (untuk Linux).
  
- **Port yang sudah digunakan**: 
  Jika Anda mendapatkan error terkait port yang sudah digunakan, pastikan tidak ada aplikasi lain yang berjalan di port yang sama, atau ubah port di file `docker-compose.yml`.
  
- **Kesalahan dependensi**: 
  Jika ada masalah terkait dependensi Node.js, pastikan Anda menjalankan `npm install` di direktori proyek untuk menginstal semua dependensi yang diperlukan.

---
