import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  where 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../config/firebase';
import type { EmergencyAlarm, CitizenReport } from '../../core/types/report.types';
import type { CitizenUser, OfficerAccount } from '../../core/types/user.types';
import type { TerritoryItem, WorkspaceItem } from '../../core/types/territory.types';
import { mockEmergencyAlarms, mockCitizenReports } from '../mock/mockReportData';
import { mockCitizenUsers, mockOfficerAccounts } from '../mock/mockUserData';
import { mockTerritoryHierarchy, mockWorkspacesList } from '../mock/mockTerritoryData';

export class FirestoreRealtimeService {
  // ALARMS: Realtime SOS Listener
  static subscribeToEmergencyAlarms(callback: (alarms: EmergencyAlarm[]) => void) {
    if (!isFirebaseConfigured || !db) {
      callback(mockEmergencyAlarms);
      return () => {};
    }

    try {
      const q = query(collection(db, 'alarms'), limit(20));
      return onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(mockEmergencyAlarms);
        } else {
          const items: EmergencyAlarm[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as EmergencyAlarm);
          });
          callback(items);
        }
      }, (error) => {
        console.warn('Firestore alarms fallback:', error);
        callback(mockEmergencyAlarms);
      });
    } catch (e) {
      console.warn('Firestore alarms error, falling back:', e);
      callback(mockEmergencyAlarms);
      return () => {};
    }
  }

  // ALARMS: Update status
  static async updateAlarmStatus(alarmId: string, status: EmergencyAlarm['status'], respondedBy?: string): Promise<void> {
    if (!isFirebaseConfigured || !db) {
      console.log(`[Mock Mode] Alarm ${alarmId} updated to ${status}`);
      return;
    }
    try {
      const ref = doc(db, 'alarms', alarmId);
      await updateDoc(ref, { status, ...(respondedBy && { respondedBy }) });
    } catch (e) {
      console.warn('Error updating alarm in Firestore:', e);
    }
  }

  // REPORTS: Realtime Citizen Reports Listener
  static subscribeToCitizenReports(callback: (reports: CitizenReport[]) => void) {
    if (!isFirebaseConfigured || !db) {
      callback(mockCitizenReports);
      return () => {};
    }

    try {
      const q = query(collection(db, 'reports'), limit(50));
      return onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(mockCitizenReports);
        } else {
          const items: CitizenReport[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as CitizenReport);
          });
          callback(items);
        }
      }, (error) => {
        console.warn('Firestore reports fallback:', error);
        callback(mockCitizenReports);
      });
    } catch (e) {
      console.warn('Firestore reports error, falling back:', e);
      callback(mockCitizenReports);
      return () => {};
    }
  }

  // REPORTS: Update Report Status & Disposition
  static async updateReportStatus(reportId: string, status: CitizenReport['status'], assignedTo?: string): Promise<void> {
    if (!isFirebaseConfigured || !db) {
      console.log(`[Mock Mode] Report ${reportId} updated to ${status} (assigned to ${assignedTo})`);
      return;
    }
    try {
      const ref = doc(db, 'reports', reportId);
      await updateDoc(ref, { 
        status, 
        ...(assignedTo && { assignedTo }), 
        updatedAt: new Date().toISOString() 
      });
    } catch (e) {
      console.warn('Error updating report in Firestore:', e);
    }
  }

  // CITIZENS: Realtime Users & KTP verification
  static subscribeToCitizens(callback: (users: CitizenUser[]) => void) {
    if (!isFirebaseConfigured || !db) {
      callback(mockCitizenUsers);
      return () => {};
    }

    try {
      const q = query(collection(db, 'users'), limit(100));
      return onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(mockCitizenUsers);
        } else {
          const items: CitizenUser[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as CitizenUser);
          });
          callback(items);
        }
      }, (error) => {
        console.warn('Firestore users fallback:', error);
        callback(mockCitizenUsers);
      });
    } catch (e) {
      console.warn('Firestore users error, falling back:', e);
      callback(mockCitizenUsers);
      return () => {};
    }
  }

  // CITIZENS: Verify Citizen
  static async verifyCitizenStatus(userId: string, verificationStatus: CitizenUser['verificationStatus']): Promise<void> {
    if (!isFirebaseConfigured || !db) {
      console.log(`[Mock Mode] Citizen ${userId} set to ${verificationStatus}`);
      return;
    }
    try {
      const ref = doc(db, 'users', userId);
      await updateDoc(ref, { verificationStatus });
    } catch (e) {
      console.warn('Error verifying citizen in Firestore:', e);
    }
  }

  // OFFICERS: Realtime Officers
  static subscribeToOfficers(callback: (officers: OfficerAccount[]) => void) {
    if (!isFirebaseConfigured || !db) {
      callback(mockOfficerAccounts);
      return () => {};
    }

    try {
      const q = query(collection(db, 'officers'), limit(50));
      return onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(mockOfficerAccounts);
        } else {
          const items: OfficerAccount[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as OfficerAccount);
          });
          callback(items);
        }
      }, (error) => {
        callback(mockOfficerAccounts);
      });
    } catch (e) {
      callback(mockOfficerAccounts);
      return () => {};
    }
  }

  // WORKSPACES: Realtime Workspaces
  static subscribeToWorkspaces(callback: (workspaces: WorkspaceItem[]) => void) {
    if (!isFirebaseConfigured || !db) {
      callback(mockWorkspacesList);
      return () => {};
    }

    try {
      const q = query(collection(db, 'workspaces'), limit(50));
      return onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          callback(mockWorkspacesList);
        } else {
          const items: WorkspaceItem[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as WorkspaceItem);
          });
          callback(items);
        }
      }, (error) => {
        callback(mockWorkspacesList);
      });
    } catch (e) {
      callback(mockWorkspacesList);
      return () => {};
    }
  }

  // SAVE WORKSPACE
  static async saveWorkspace(ws: WorkspaceItem): Promise<void> {
    if (!isFirebaseConfigured || !db) return;
    try {
      await setDoc(doc(db, 'workspaces', ws.id), ws);
    } catch (e) {
      console.warn('Error saving workspace to Firestore:', e);
    }
  }

  // SAVE OFFICER
  static async saveOfficer(off: OfficerAccount): Promise<void> {
    if (!isFirebaseConfigured || !db) return;
    try {
      await setDoc(doc(db, 'officers', off.id), off);
    } catch (e) {
      console.warn('Error saving officer to Firestore:', e);
    }
  }
}
