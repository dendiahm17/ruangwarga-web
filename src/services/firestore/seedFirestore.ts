import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../config/firebase';
import { mockTerritoryHierarchy, mockWorkspacesList } from '../mock/mockTerritoryData';
import { mockCitizenUsers, mockOfficerAccounts } from '../mock/mockUserData';
import { mockEmergencyAlarms, mockCitizenReports } from '../mock/mockReportData';
import { mockRoleMatrices } from '../mock/mockSecurityData';

export async function seedInitialFirestoreData(): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      message: 'Kredensial Firebase belum terkonfigurasi pada file .env'
    };
  }

  try {
    console.log('Memulai proses seeding database Firestore ruangwarga-app...');

    // 1. Seed Territories
    await setDoc(doc(db, 'territories', mockTerritoryHierarchy.id), {
      name: mockTerritoryHierarchy.name,
      level: mockTerritoryHierarchy.level,
      code: mockTerritoryHierarchy.code,
      status: mockTerritoryHierarchy.status,
      childrenCount: mockTerritoryHierarchy.childrenCount,
      citizensCount: mockTerritoryHierarchy.citizensCount,
      workspacesCount: mockTerritoryHierarchy.workspacesCount,
      leaderName: mockTerritoryHierarchy.leaderName,
      leaderPhone: mockTerritoryHierarchy.leaderPhone
    });

    // 2. Seed Workspaces
    for (const ws of mockWorkspacesList) {
      await setDoc(doc(db, 'workspaces', ws.id), ws);
    }

    // 3. Seed Citizen Users (Shared with Android)
    for (const user of mockCitizenUsers) {
      await setDoc(doc(db, 'users', user.id), user);
    }

    // 4. Seed Officers
    for (const off of mockOfficerAccounts) {
      await setDoc(doc(db, 'officers', off.id), off);
    }

    // 5. Seed Emergency Alarms
    for (const alarm of mockEmergencyAlarms) {
      await setDoc(doc(db, 'alarms', alarm.id), alarm);
    }

    // 6. Seed Citizen Reports
    for (const report of mockCitizenReports) {
      await setDoc(doc(db, 'reports', report.id), report);
    }

    // 7. Seed Role Permission Matrices
    for (const role of mockRoleMatrices) {
      await setDoc(doc(db, 'roles', role.roleId), role);
    }

    return {
      success: true,
      message: 'Berhasil menginisialisasi seluruh koleksi awal ke Firebase Firestore ruangwarga-app!'
    };
  } catch (error: any) {
    console.error('Error saat seeding database Firestore:', error);
    return {
      success: false,
      message: `Gagal seeding data: ${error.message || 'Periksa aturan Firestore Rules di Firebase Console'}`
    };
  }
}
