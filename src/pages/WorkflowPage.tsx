import React, { useState } from 'react';
import type { GovernanceWorkflow } from '../core/types/workflow.types';
import { mockGovernanceWorkflows } from '../services/mock/mockWorkflowData';
import {
  Workflow,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  FileCheck,
  HeartHandshake,
  CalendarCheck
} from 'lucide-react';

export const WorkflowPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<GovernanceWorkflow[]>(mockGovernanceWorkflows);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(mockGovernanceWorkflows[0].id);

  const selectedWf = workflows.find(w => w.id === selectedWorkflowId) || workflows[0];

  const getCategoryIcon = (category: GovernanceWorkflow['category']) => {
    switch (category) {
      case 'administrasi': return <FileCheck size={18} color="#00e5ff" />;
      case 'bantuan': return <HeartHandshake size={18} color="#34d399" />;
      default: return <CalendarCheck size={18} color="#f59e0b" />;
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
            <Workflow size={22} color="#00e5ff" />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Alur Kerja & SOP Tata Kelola (Workflow Engine)
            </h1>
          </div>
          <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '3px' }}>
            Standar operasional berjenjang: *"Pemimpin bekerja berdasarkan sistem, bukan pemimpin mengatur sistem."*
          </p>
        </div>

        {/* Status Badge */}
        <div style={{
          backgroundColor: '#0a1220',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={14} color="#10b981" />
          <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Otomasi SOP:</span>
          <strong style={{ fontSize: '12px', color: '#10b981' }}>3 Alur Aktif</strong>
        </div>
      </div>

      {/* 2-Column Layout: Workflow List (Left) + Workflow Steps Visualizer (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px minmax(0, 1fr)',
        gap: '20px'
      }}>
        {/* Left Column: Workflow Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span className="futuristic-card-title" style={{ paddingLeft: '4px' }}>DAFTAR ALUR TATA KELOLA</span>

          {workflows.map((wf) => {
            const isSelected = wf.id === selectedWorkflowId;
            return (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflowId(wf.id)}
                className="futuristic-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #00e5ff' : undefined,
                  backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.08)' : undefined,
                  boxShadow: isSelected ? '0 0 15px rgba(0, 229, 255, 0.15)' : undefined,
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                    {wf.code}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    padding: '1px 5px',
                    borderRadius: '3px'
                  }}>
                    AKTIF
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#00e5ff' : '#ffffff', lineHeight: 1.3 }}>
                  {wf.title}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  {wf.totalSteps} Langkah • Est. {wf.avgCompletionHours} Jam
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Visual Steps Flow */}
        <div className="futuristic-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header */}
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {getCategoryIcon(selectedWf.category)}
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                {selectedWf.title}
              </h2>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', lineHeight: 1.4 }}>
              {selectedWf.description}
            </p>
          </div>

          {/* Steps Timeline Visualizer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="futuristic-card-title">LANGKAH-LANGKAH ALUR KERJA (SOP)</span>

            {selectedWf.steps.map((step, idx) => (
              <div
                key={step.stepNumber}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                {/* Step Circle */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 229, 255, 0.15)',
                  border: '2px solid #00e5ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#00e5ff',
                  flexShrink: 0,
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.25)'
                }}>
                  {step.stepNumber}
                </div>

                {/* Step Card */}
                <div style={{
                  flex: 1,
                  backgroundColor: '#060b13',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '8px',
                  padding: '12px 16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>
                      {step.title}
                    </div>
                    <span style={{ fontSize: '10.5px', color: '#38bdf8', fontWeight: 700 }}>
                      SLA: {step.slaHours} Jam
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#00e5ff', fontWeight: 600, marginBottom: '4px' }}>
                    Pelaksana: {step.actorRole}
                  </div>

                  <p style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.3 }}>
                    {step.actionDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
