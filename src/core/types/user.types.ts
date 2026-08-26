export interface CitizenUser {
  id: string;
  nik: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  phone: string;
  email: string;
  territoryPath: string; // e.g. "Kel. Sukamaju > RW 02 > RT 01"
  rt: string;
  rw: string;
  kelurahan: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  appRegisteredAt: string;
  lastActive: string;
  isHeadOfFamily: boolean;
  ktpPhotoUrl?: string;
}

export interface OfficerAccount {
  id: string;
  name: string;
  nipOrNik: string;
  roleTitle: string; // e.g. "Ketua RW", "Lurah", "Camat"
  tierLevel: 'Nasional' | 'Provinsi' | 'Kabupaten/Kota' | 'Kecamatan' | 'Desa/Kelurahan' | 'RW' | 'RT';
  assignedScope: string; // e.g. "RW 02 Sukamaju"
  phone: string;
  email: string;
  skNumber: string;
  periodStart: string;
  periodEnd: string;
  status: 'active' | 'inactive';
}
