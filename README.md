# RuangWarga Web Control Center

> **Executive Web Client & Territory Governance Platform**
> Platform tata kelola masyarakat berbasis wilayah 7 tingkat (*Nasional ➔ Provinsi ➔ Kab/Kota ➔ Kecamatan ➔ Desa/Kelurahan ➔ RW ➔ RT*).

---

## 🏛️ Filosofi Produk
> *"Pemimpin bekerja berdasarkan sistem, bukan pemimpin mengatur sistem."*

RuangWarga dirancang dengan arsitektur **Role + Scope + Permission**, di mana wewenang administrator dan pengurus ditentukan secara presisi berdasarkan batas lingkup wilayah kerjanya.

---

## 🚀 Fitur Utama & 13 Modul Navigasi

1. **Dashboard Utama (`/dashboard`)**:
   - Radar Proyeksi 3D Hologram, 4 KPI Platform, Peta Vektor Geospasial Indonesia, 6 Tier Workspace, Donut Gauges Wawasan, 5 Progress Tugas Sistem, dan Live Activity Feed.
2. **Hierarki Wilayah (`/wilayah`)**:
   - Pohon Hierarki 7 Tingkat interaktif, Filter Pill Tingkatan, Set as Scope, Registrasi/Edit Sub-Wilayah, Tab Aparatur Pengurus, Tab Demografi Warga Android, dan *Safety Deletion Guard*.
3. **Workspace Manager (`/workspace`)**:
   - Ruang kerja operasional pengurus RT/RW/Desa/Kecamatan/Kabupaten/Provinsi, filter cakupan wilayah, dan modal inisiasi workspace baru.
4. **Pengguna & Kependudukan (`/pengguna`)**:
   - Database kependudukan terintegrasi aplikasi Android, sensor privasi NIK, filter akun, dan modal verifikasi e-KTP (*Approve / Reject*).
5. **Pengurus & Aparatur (`/pengurus`)**:
   - Manajemen aparatur wilayah (Ketua RT/RW, Lurah, Camat, Bupati), Nomor SK, Masa Bakti, Scope Wilayah Penugasan, dan registrasi pejabat baru.
6. **Role & Permission (`/role-permission`)**:
   - Matriks hak akses 7 tingkat (*Read, Create, Update, Delete, Verify, Export*) dengan saklar (*toggle*) interaktif per modul.
7. **Workflow Engine (`/workflow`)**:
   - Mesin SOP tata kelola otomatis (*Surat Domisili Ber-QR Code, Bansos Warga, Izin Fasilitas Bersama*) dengan visualisasi tahapan alur dan target SLA.
8. **Tugas Sistem (`/tugas-sistem`)**:
   - Background job scheduler (*Sync Antrean Android, Backup Database Firestore AES-256, Audit Sesi, Indeks Spasial*) dengan tombol eksekusi manual dan bar progres dinamis.
9. **Pusat Alarm SOS (`/alarm`)**:
   - Live Emergency Radar (*SOS / Panic Button*) dari Android warga, koordinat GPS titik kejadian, serta aksi eskalasi ke Posko Keamanan/Ambulans.
10. **Laporan Pengaduan (`/laporan`)**:
    - Pusat investigasi pengaduan masyarakat (*Infrastruktur, Kebersihan, Keamanan, Administrasi*) dengan alur disposisi berjenjang hingga tuntas.
11. **Audit Trail Forensik (`/audit-trail`)**:
    - Log forensik keamanan (*Immutable*) mencatat seluruh jejak aksi admin, IP address, perangkat, tingkat risiko, dan tombol ekspor data.
12. **Wawasan Platform (`/wawasan`)**:
    - Analitik eksekutif tren pertumbuhan warga bulanan, peringkat adopsi wilayah per provinsi, indeks kepuasan publik (*4.6 / 5*), dan ekspor laporan PDF.
13. **Pengaturan Sistem (`/pengaturan`)**:
    - Konfigurasi identitas platform, zona waktu resmi (*WIB / WITA / WIT*), batas waktu respon SLA Alarm & Laporan, serta status integrasi Firebase Firestore.

---

## ⚡ Integrasi Firebase Firestore Realtime Backend

Repository ini terhubung langsung ke **Firebase Project `ruangwarga-app`** yang digunakan bersama dengan repository aplikasi Android warga (`ruangwarga-android`).

### Shared Collections:
- `users`: Data kependudukan & verifikasi e-KTP.
- `alarms`: Sinyal *Panic Button / SOS* darurat realtime dari warga.
- `reports`: Pengaduan & aspirasi warga berjenjang.
- `territories` & `workspaces`: Struktur 7 tingkat wilayah.
- `audit_logs`: Log forensik keamanan.

### Menjalankan Seeder Database Awal:
Masuk ke menu **Pengaturan** ➔ Tab **Integrasi Cloud & Backend** ➔ Klik **"🚀 Jalankan Seeder"**.

---

## 💻 Panduan Menjalankan Proyek Lokal

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/dendiahm17/ruangwarga-web.git
   cd ruangwarga-web
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   File `.env` sudah terkonfigurasi dengan Firebase Project `ruangwarga-app`.

4. **Jalankan Dev Server**:
   ```bash
   npm run dev
   ```
   Buka browser pada: `http://localhost:5173/`

5. **Build Production Bundle**:
   ```bash
   npm run build
   ```
