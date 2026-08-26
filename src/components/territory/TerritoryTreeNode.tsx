import React, { useState } from 'react';
import type { TerritoryItem } from '../../core/types/territory.types';
import { ChevronRight, ChevronDown, Plus, Shield, Users, Layers, Phone } from 'lucide-react';

interface TerritoryTreeNodeProps {
  item: TerritoryItem;
  selectedId: string;
  onSelect: (item: TerritoryItem) => void;
  onAddSubTerritory: (parent: TerritoryItem) => void;
}

export const TerritoryTreeNode: React.FC<TerritoryTreeNodeProps> = ({
  item,
  selectedId,
  onSelect,
  onAddSubTerritory
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'national': return { label: 'NEGARA', color: '#00e5ff', bg: 'rgba(0, 229, 255, 0.12)' };
      case 'province': return { label: 'PROVINSI', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' };
      case 'regency': return { label: 'KAB/KOTA', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)' };
      case 'district': return { label: 'KECAMATAN', color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)' };
      case 'village': return { label: 'DESA/KEL', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)' };
      case 'rw': return { label: 'RW', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' };
      case 'rt': return { label: 'RT', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' };
      default: return { label: 'WILAYAH', color: '#94a3b8', bg: '#1e293b' };
    }
  };

  const badge = getBadgeColor(item.level);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Row Node */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.12)' : 'rgba(15, 23, 42, 0.4)',
          border: isSelected ? '1px solid #00e5ff' : '1px solid rgba(56, 189, 248, 0.1)',
          boxShadow: isSelected ? '0 0 12px rgba(0, 229, 255, 0.2)' : 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onClick={() => onSelect(item)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Expand / Collapse Button */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <div style={{ width: '18px' }} />
          )}

          {/* Title and Code */}
          <span style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? '#00e5ff' : '#ffffff' }}>
            {item.name}
          </span>
          <span style={{
            fontSize: '8.5px',
            fontWeight: 700,
            color: badge.color,
            backgroundColor: badge.bg,
            border: `1px solid ${badge.color}35`,
            padding: '1px 5px',
            borderRadius: '4px',
            letterSpacing: '0.04em'
          }}>
            {badge.label}
          </span>
          <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
            ({item.code})
          </span>
        </div>

        {/* Action button & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#94a3b8' }}>
            <Users size={12} color="#38bdf8" />
            <span>{item.citizensCount.toLocaleString('id-ID')}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddSubTerritory(item);
            }}
            title="Tambah Sub-Wilayah"
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '4px',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Children Container */}
      {hasChildren && isExpanded && (
        <div style={{
          paddingLeft: '18px',
          marginLeft: '8px',
          borderLeft: '1px dashed rgba(56, 189, 248, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginTop: '2px'
        }}>
          {item.children!.map((child) => (
            <TerritoryTreeNode
              key={child.id}
              item={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddSubTerritory={onAddSubTerritory}
            />
          ))}
        </div>
      )}
    </div>
  );
};
