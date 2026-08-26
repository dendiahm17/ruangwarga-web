export interface EmergencyAlarm {
  id: string;
  type: 'medis' | 'kebakaran' | 'kriminalitas' | 'bencana' | 'keamanan';
  title: string;
  description: string;
  reporterName: string;
  reporterPhone: string;
  locationScope: string; // e.g. "RW 02 Sukamaju, RT 01"
  coordinates?: string;
  status: 'critical' | 'investigating' | 'resolved';
  timestamp: string;
  respondedBy?: string;
  slaMinutes: number;
}

export interface CitizenReport {
  id: string;
  ticketNumber: string;
  category: 'infrastruktur' | 'kebersihan' | 'keamanan' | 'administrasi' | 'sosial';
  title: string;
  description: string;
  reporterName: string;
  reporterPhone: string;
  locationScope: string;
  priority: 'high' | 'medium' | 'low';
  status: 'received' | 'dispositioned' | 'in_progress' | 'completed';
  assignedTo?: string; // e.g. "Seksi Pembangunan RT 01"
  createdAt: string;
  updatedAt: string;
  photoUrl?: string;
}
