import React, { useState, useEffect } from 'react';
import { useScope } from '../context/ScopeContext';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services';

import { ScopeInfoPanel } from '../components/dashboard/ScopeInfoPanel';
import { IndonesiaMapPanel } from '../components/dashboard/IndonesiaMapPanel';
import { NationalSummaryPanel } from '../components/dashboard/NationalSummaryPanel';
import { SystemTasksPanel } from '../components/dashboard/SystemTasksPanel';
import { AlarmEventsPanel } from '../components/dashboard/AlarmEventsPanel';
import { ActivityTrendPanel } from '../components/dashboard/ActivityTrendPanel';
import { AccessPermissionPanel } from '../components/dashboard/AccessPermissionPanel';
import { PriorityRegionsTable } from '../components/dashboard/PriorityRegionsTable';
import { WorkspaceDistributionPanel } from '../components/dashboard/WorkspaceDistributionPanel';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { QuickActionsPanel } from '../components/dashboard/QuickActionsPanel';
import { PhilosophyFooter } from '../components/dashboard/PhilosophyFooter';

import { 
  DashboardMetrics, 
  SystemTask, 
  SystemAlarm, 
  PriorityRegion, 
  WorkspaceDistribution, 
  RealtimeActivity 
} from '../core/types/dashboard.types';

interface DashboardPageProps {
  onOpenScopeModal: () => void;
  onNavigate?: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenScopeModal, onNavigate }) => {
  const { currentScope } = useScope();
  const { user } = useAuth();

  const [metrics, setMetrics] = useState<DashboardMetrics>(() => ({
    totalWorkspace: { value: '120.654', change: '+2,06%', isPositive: true },
    totalWargaAktif: { value: '25.684.112', change: '+1,37%', isPositive: true },
    totalAktivitas: { value: '184.932', change: '+7,44%', isPositive: true },
    laporanMasuk: { value: '5.432', change: '+11,11%', isPositive: false },
    tingkatRespons: { value: '92,7%', change: '+3,4%', isPositive: true },
    kegiatanSelesai: { value: '14.287', change: '+6,7%', isPositive: true },
  }));
  const [tasks, setTasks] = useState<SystemTask[]>([]);
  const [alarms, setAlarms] = useState<SystemAlarm[]>([]);
  const [regions, setRegions] = useState<PriorityRegion[]>([]);
  const [distributions, setDistributions] = useState<WorkspaceDistribution[]>([]);
  const [activities, setActivities] = useState<RealtimeActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [m, t, a, r, d, act] = await Promise.all([
          dashboardService.getDashboardMetrics(currentScope.id),
          dashboardService.getSystemTasks(currentScope.id),
          dashboardService.getSystemAlarms(currentScope.id),
          dashboardService.getPriorityRegions(currentScope.id),
          dashboardService.getWorkspaceDistributions(currentScope.id),
          dashboardService.getRecentActivities(currentScope.id)
        ]);

        setMetrics(m);
        setTasks(t);
        setAlarms(a);
        setRegions(r);
        setDistributions(d);
        setActivities(act);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [currentScope.id]);

  if (loading || !metrics) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#64748b' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '3px solid #cbd5e1',
            borderTopColor: '#10b981',
            animation: 'spin 0.8s linear infinite'
          }} />
          <span style={{ fontSize: '13px', fontWeight: 500 }}>Memuat Data Control Center...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px 24px 32px 24px',
      maxWidth: '1600px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* ROW 1: Scope Info + Peta Wilayah + Ringkasan Nasional */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1.4fr 1.6fr',
        gap: '16px',
        minHeight: '260px'
      }}>
        <ScopeInfoPanel onOpenModal={onOpenScopeModal} />
        <IndonesiaMapPanel />
        <NationalSummaryPanel metrics={metrics} />
      </div>

      {/* ROW 2: Tugas Sistem + Alarm & Kejadian + Trend Aktivitas + Info Akses */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.1fr 1.1fr 0.8fr',
        gap: '16px',
        minHeight: '220px'
      }}>
        <SystemTasksPanel tasks={tasks} onViewAll={() => onNavigate?.('/tugas-sistem')} />
        <AlarmEventsPanel alarms={alarms} />
        <ActivityTrendPanel />
        <AccessPermissionPanel user={user} />
      </div>

      {/* ROW 3: 10 Wilayah Perhatian Khusus + Workspace Distribusi + Aktivitas Terbaru + Pintasan */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.9fr 1.1fr 0.7fr',
        gap: '16px',
        minHeight: '270px'
      }}>
        <PriorityRegionsTable regions={regions} onViewAll={() => onNavigate?.('/hierarki-wilayah')} />
        <WorkspaceDistributionPanel distributions={distributions} onManageWorkspace={() => onNavigate?.('/workspace')} />
        <RecentActivityFeed activities={activities} onViewAll={() => onNavigate?.('/audit-trail')} />
        <QuickActionsPanel />
      </div>

      {/* ROW 4: Footer Filosofi RuangWarga & Berlandaskan Pancasila */}
      <PhilosophyFooter />
    </div>
  );
};
