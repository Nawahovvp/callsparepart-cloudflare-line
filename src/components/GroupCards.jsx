import React from 'react';
import { useRef, useState } from 'react';
import { toBlob } from 'html-to-image';

function GroupCard({ label, value, percent, id, onClick, isActive, typeClass, isDepartmentClear }) {
    return (
        <div
            className={`dashboard-card group-card ${typeClass} ${isDepartmentClear ? 'dept-clear' : ''} ${isActive ? 'active' : ''}`}
            onClick={() => onClick(id)}
            style={{ minWidth: typeClass === 'unit-card' ? '90px' : '130px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '2px' }}>
                <h3 style={{ fontSize: '0.8em', margin: 0 }}>{label}</h3>
                {isActive && (
                    <div style={{
                        background: '#fff',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '16px', color: '#e74c3c' }}></i>
                    </div>
                )}
            </div>
            <div className="value" style={{ fontSize: '1.2em' }}>{value}</div>
            <div className="progress-container" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <div className="progress-bar" style={{ width: `${percent}%`, backgroundColor: '#fff' }}></div>
            </div>
            <div className="progress-text" style={{ color: '#fff' }}>{percent}%</div>
        </div>
    );
}

export default function GroupCards({ title, stats = [], onCardClick, activeFilter, prefix, children, showZero = false }) {
    const captureRef = useRef(null);
    const [copyStatus, setCopyStatus] = useState('');
    const isUnitCards = prefix === 'unit_';

    if (!stats || stats.length === 0) return null;

    const getTypeClass = (label) => {
        if (prefix === 'unit_') return 'unit-card';
        if (prefix === 'calltype_') {
            const cleanLabel = String(label).toLowerCase();
            return `calltype-${cleanLabel}-card`;
        }
        if (prefix === 'gm_') return 'gm-card';
        if (prefix === 'dept_') {
            const cleanLabel = String(label).toLowerCase();
            return `dept-card dept-${cleanLabel}-card`;
        }
        return '';
    };

    const displayStats = (showZero || prefix === 'dept_') ? stats : stats.filter(item => item.value > 0);
    if (displayStats.length === 0) return null;

    const handleCopyImage = async () => {
        setCopyStatus('');
        try {
            if (!captureRef.current || !navigator.clipboard?.write || !window.ClipboardItem) {
                throw new Error('เบราว์เซอร์นี้ไม่รองรับการคัดลอกรูปภาพ');
            }

            const image = await toBlob(captureRef.current, {
                backgroundColor: '#f1f4f8',
                pixelRatio: 2,
                filter: node => node.dataset?.excludeFromImage !== 'true'
            });
            if (!image) throw new Error('ไม่สามารถสร้างรูปภาพได้');

            await navigator.clipboard.write([new ClipboardItem({ 'image/png': image })]);
            setCopyStatus('คัดลอกรูปแล้ว');
        } catch (error) {
            console.error('Could not copy unit cards as an image:', error);
            setCopyStatus(error instanceof Error ? error.message : 'คัดลอกรูปไม่สำเร็จ');
        }
    };

    return (
        <div className="group-cards-section" style={{ marginTop: '20px' }}>
            <div ref={captureRef} style={isUnitCards ? { backgroundColor: '#f1f4f8', padding: '12px' } : undefined}>
                {title && (
                    <h2 style={{
                        fontSize: '1.2em',
                        marginBottom: '20px',
                        fontWeight: '700',
                        paddingLeft: '12px',
                        color: 'var(--text-primary)',
                        borderLeft: '4px solid var(--info-color)',
                        lineHeight: '1.2'
                    }}>
                        {title}
                    </h2>
                )}
                <div className={`dashboard group-dashboard ${isUnitCards ? 'unit-dashboard' : ''}`}>
                    {displayStats.map((item, index) => (
                        <GroupCard
                            key={index}
                            label={isUnitCards ? item.label.toUpperCase() : item.label}
                            value={item.value}
                            percent={item.percent}
                            id={`${prefix}${item.label}`}
                            onClick={onCardClick}
                            isActive={activeFilter === `${prefix}${item.label}` || activeFilter === item.label}
                            typeClass={getTypeClass(item.label)}
                            isDepartmentClear={['dept_', 'unit_'].includes(prefix) && item.waitingResponse === 0}
                        />
                    ))}
                    {children}
                </div>
            </div>
            {isUnitCards && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                    <button
                        type="button"
                        onClick={handleCopyImage}
                        data-exclude-from-image="true"
                        style={{
                            border: 'none',
                            borderRadius: 6,
                            padding: '7px 12px',
                            background: '#0d6efd',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        <i className="fas fa-copy" style={{ marginRight: 6 }} />
                        คัดลอกรูป
                    </button>
                    <span aria-live="polite" style={{ color: copyStatus.includes('ไม่') ? 'var(--danger-color)' : 'var(--text-secondary)' }}>
                        {copyStatus}
                    </span>
                </div>
            )}
        </div>
    );
}
