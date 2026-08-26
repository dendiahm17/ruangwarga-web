# Panduan Arsitektur & Sinkronisasi Data: Web Control Center & Android Warga

Dokumen ini menjelaskan kontrak data koleksi Firestore bersama (*Shared Collections*) antara **`ruangwarga-web`** dan **`ruangwarga-android`**.

---

## 1. Koleksi `alarms` (Panic Button & Sinyal Darurat SOS)

Dibuat oleh Android saat warga menekan tombol Panic Button, dibaca realtime oleh Web Control Center.

```json
{
  "id": "alarm-uuid",
  "type": "medis | kebakaran | kriminalitas | bencana | keamanan",
  "title": "Panggilan Darurat Medis Lansia",
  "description": "Deskripsi kebutuhan bantuan...",
  "reporterName": "Nama Warga Pelapor",
  "reporterPhone": "+628123456789",
  "locationScope": "Kel. Sukamaju > RW 02 > RT 01",
  "coordinates": "-6.4829, 106.8452",
  "status": "critical | investigating | resolved",
  "timestamp": "2026-08-26T16:00:00Z",
  "respondedBy": "Petugas / Posko yang menangani",
  "slaMinutes": 15
}
```

---

## 2. Koleksi `reports` (Laporan & Pengaduan Warga)

Dibuat oleh Android saat warga mengirimkan laporan infrastruktur / ketertiban, didisposisikan oleh Web Control Center.

```json
{
  "id": "report-uuid",
  "ticketNumber": "RW-2025-0012",
  "category": "infrastruktur | kebersihan | keamanan | administrasi | sosial",
  "title": "Lampu Jalan Padam di Gang Mawar",
  "description": "Keluhan detail...",
  "reporterName": "Nama Warga",
  "reporterPhone": "+628123456789",
  "locationScope": "Kel. Sukamaju > RW 02 > RT 01",
  "priority": "high | medium | low",
  "status": "received | dispositioned | in_progress | completed",
  "assignedTo": "Seksi Pembangunan RT 01",
  "createdAt": "2026-08-26T14:00:00Z",
  "updatedAt": "2026-08-26T16:00:00Z",
  "photoUrl": "https://firebasestorage.googleapis.com/..."
}
```

---

## 3. Koleksi `users` (Kependudukan & Akun Warga)

Didaftarkan oleh Android saat registrasi akun, diverifikasi e-KTP oleh Web Control Center.

```json
{
  "id": "user-auth-uid",
  "nik": "3201014502880001",
  "name": "Budi Kurniawan",
  "gender": "Laki-laki | Perempuan",
  "phone": "+628123456789",
  "email": "budi@gmail.com",
  "territoryPath": "Jawa Barat > Kab. Bogor > Kec. Cibinong > Kel. Sukamaju > RW 02 > RT 01",
  "rt": "RT 01",
  "rw": "RW 02",
  "kelurahan": "Kel. Sukamaju",
  "verificationStatus": "verified | pending | rejected",
  "appRegisteredAt": "2026-08-26",
  "lastActive": "Baru saja",
  "isHeadOfFamily": true,
  "ktpPhotoUrl": "https://..."
}
```
