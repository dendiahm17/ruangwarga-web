import React, { useState } from 'react';
import type { SystemJob } from '../core/types/workflow.types';
import { mockSystemJobs } from '../services/mock/mockWorkflowData';
import {
  Cpu,
  RefreshCw,
  Play,
  CheckCircle2,
  Clock,
  Database,
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';

export const TugasSistemPage: React.FC = () => {
  const [jobs, setJobs] = useState<SystemJob[]>(mockSystemJobs);
  const [runningJobId, setRunningJobId] = useState<string | null>(null);

  const handleRunJob = (id: string) => {
    setRunningJobId(id);
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'running' } : j));

    setTimeout(() => {
      setJobs(prev => prev.map(j => {
        if (j.id === id) {
          return {
            ...j,
            currentCount: j.totalCount,
            percentage: 100,
            status: 'completed',
            lastRunTime: 'Baru saja'
          };
        }
        return j;
      }));
      setRunningJobId(null);
    }, 1500);
  };

  const getCategoryIcon = (category: SystemJob['category']) => {
    switch (category) {
      case 'sync': return <RefreshCw size={18} color="#00e5ff" />;
      case 'backup': return <Database size={18} color="#38bdf8" />;
      case 'verification': return <Layers size={18} color="#a855f7" />;
      case 'audit': return <ShieldCheck size={18} color="#10b981" />;
      default: return <Cpu size={18} color="#f59e0b" />;
    }
  };

  return (
    <div style={{
      padding: '24px',
      maxWidth: '1720px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Top Banner & Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Manajemen Tugas Sistem & Background Jobs
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Otomasi sinkronisasi, validasi integritas hierarki wilayah, dan pencadangan database terenkripsi
          </p>
        </div>

        {/* Global Action */}
        <button
          onClick={() => {
            jobs.forEach(j => handleRunJob(j.id));
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid #00e5ff',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#00e5ff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)'
          }}
        >
          <Sparkles size={15} />
          <span>Jalankan Semua Pemeliharaan</span>
        </button>
      </div>

      {/* Jobs Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {jobs.map((job) => {
          const isRunning = job.status === 'running' || runningJobId === job.id;
          const isCompleted = job.status === 'completed';
          return (
            <div
              key={job.id}
              className="futuristic-card"
              style={{
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                border: isRunning ? '1px solid rgba(0, 229, 255, 0.4)' : undefined,
                boxShadow: isRunning ? '0 0 20px rgba(0, 229, 255, 0.15)' : undefined
              }}
            >
              {/* Left Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid rgba(0, 229, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getCategoryIcon(job.category)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                      {job.title}
                    </h3>
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 700,
                      color: isRunning ? '#00e5ff' : isCompleted ? '#10b981' : '#f59e0b',
                      backgroundColor: isRunning ? 'rgba(0, 229, 255, 0.15)' : isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {isRunning ? 'RUNNING' : isCompleted ? 'OPTIMAL' : 'TERJADWAL'}
                    </span>
                  </div>

                  <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
                    {job.description}
                  </p>

                  <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '6px', display: 'flex', gap: '16px' }}>
                    <span>Interval: <strong style={{ color: '#cbd5e1' }}>{job.scheduleInterval}</strong></span>
                    <span>Terakhir: <strong style={{ color: '#cbd5e1' }}>{job.lastRunTime}</strong></span>
                    <span>Durasi: <strong style={{ color: '#cbd5e1' }}>{job.executionDuration}</strong></span>
                  </div>
                </div>
              </div>

              {/* Middle: Progress Bar */}
              <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: '#94a3b8' }}>Progres Tugas:</span>
                  <span style={{ fontWeight: 800, color: '#00e5ff' }}>
                    {job.currentCount} / {job.totalCount} ({job.percentage}%)
                  </span>
                </div>

                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#060b13',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid rgba(56, 189, 248, 0.15)'
                }}>
                  <div style={{
                    width: `${job.percentage}%`,
                    height: '100%',
                    backgroundColor: isCompleted ? '#10b981' : '#00e5ff',
                    boxShadow: isCompleted ? '0 0 8px #10b981' : '0 0 8px #00e5ff',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {/* Right Action */}
              <button
                onClick={() => handleRunJob(job.id)}
                disabled={isRunning}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  backgroundColor: isRunning ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 229, 255, 0.15)',
                  border: isRunning ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #00e5ff',
                  borderRadius: '6px',
                  color: isRunning ? '#64748b' : '#00e5ff',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: isRunning ? 'not-allowed' : 'pointer'
                }}
              >
                <Play size={13} fill={isRunning ? '#64748b' : '#00e5ff'} />
                <span>{isRunning ? 'Memproses...' : 'Jalankan'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
