import React, { useState, useEffect } from 'react';
import { useScope } from '../context/ScopeContext';
import { dashboardService } from '../services';

import { CurrentScopeCard } from '../components/scope/CurrentScopeCard';
import { PlatformSummaryCards } from '../components/summary/PlatformSummaryCards';
import { MonitoringWilayahPanel } from '../components/monitoring/MonitoringWilayahPanel';
import { WorkspaceSection } from '../components/workspace/WorkspaceSection';
import { WawasanPlatformPanel } from '../components/insights/WawasanPlatformPanel';
import { SystemTasksPanel } from '../components/tasks/SystemTasksPanel';
import { PerhatianKhususPanel } from '../components/alerts/PerhatianKhususPanel';
import { AktivitasSistemTimeline } from '../components/activity/AktivitasSistemTimeline';

import type {
  PlatformSummaryMetrics,
  MonitoringWilayahData,
  SystemTaskItem,
  SpecialAttentionItem,
  WorkspaceTierItem,
  RealtimeActivityItem,
  PlatformInsightsData
} from '../core/types/dashboard.types';

interface DashboardPageProps {
  onOpenScopeModal: () => void;
  onNavigate?: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenScopeModal, onNavigate }) => {
  const { currentScope } = useScope();

  const [summary, setSummary] = useState<PlatformSummaryMetrics | null>(null);
  const [monitoring, setMonitoring] = useState<MonitoringWilayahData | null>(null);
  const [tasks, setTasks] = useState<SystemTaskItem[]>([]);
  const [attentions, setAttentions] = useState<SpecialAttentionItem[]>([]);
  const [workspaces, setWorkspaces] = useState<WorkspaceTierItem[]>([]);
  const [activities, setActivities] = useState<RealtimeActivityItem[]>([]);
  const [insights, setInsights] = useState<PlatformInsightsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const [sum, mon, t, att, ws, act, ins] = await Promise.all([
          dashboardService.getSummaryMetrics(currentScope.id),
          dashboardService.getMonitoringData(currentScope.id),
          dashboardService.getSystemTasks(currentScope.id),
          dashboardService.getSpecialAttentions(currentScope.id),
          dashboardService.getWorkspaceTiers(currentScope.id),
          dashboardService.getRealtimeActivities(currentScope.id),
          dashboardService.getPlatformInsights(currentScope.id)
        ]);

        setSummary(sum);
        setMonitoring(mon);
        setTasks(t);
        setAttentions(att);
        setWorkspaces(ws);
        setActivities(act);
        setInsights(ins);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [currentScope.id]);

  if (loading || !summary || !monitoring || !insights) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#38bdf8' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '3px solid rgba(0, 229, 255, 0.2)',
            borderTopColor: '#00e5ff',
            animation: 'spin 0.8s linear infinite',
            boxShadow: '0 0 10px rgba(0, 229, 255, 0.4)'
          }} />
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em' }}>Memuat Control Center RuangWarga...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 340px',
      gap: '16px',
      padding: '20px 24px 32px 24px',
      maxWidth: '1720px',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* LEFT & CENTER REGION (2fr) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
        {/* ROW 1: Current Scope Card (with 3D Hologram Radar) + Platform Summary (4 KPI tiles) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px minmax(0, 1fr)',
          gap: '16px'
        }}>
          <CurrentScopeCard onOpenModal={onOpenScopeModal} />
          <PlatformSummaryCards metrics={summary} />
        </div>

        {/* ROW 2: Panel Besar Monitoring Wilayah */}
        <MonitoringWilayahPanel
          data={monitoring}
          onViewDetails={() => onNavigate?.('/wilayah')}
        />

        {/* ROW 3: Section Workspace (6 Tier Cards) */}
        <WorkspaceSection
          workspaces={workspaces}
          onViewWorkspace={(id) => onNavigate?.(`/workspace`)}
        />

        {/* ROW 4: Section Wawasan Platform (Donuts, Gauges & Rating) */}
        <WawasanPlatformPanel insights={insights} />
      </div>

      {/* RIGHT REGION: System Intelligence Sidebar (1fr) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '340px' }}>
        {/* 1. Tugas Sistem (5 Progress Bars) */}
        <SystemTasksPanel
          tasks={tasks}
          onViewAll={() => onNavigate?.('/tugas-sistem')}
        />

        {/* 2. Perhatian Khusus (3 Priority Status Cards) */}
        <PerhatianKhususPanel
          items={attentions}
          onViewAll={() => onNavigate?.('/alarm')}
        />

        {/* 3. Aktivitas Sistem Terbaru (Realtime Timeline Feed) */}
        <AktivitasSistemTimeline
          activities={activities}
          onViewAll={() => onNavigate?.('/audit-trail')}
        />
      </div>
    </div>
  );
};
