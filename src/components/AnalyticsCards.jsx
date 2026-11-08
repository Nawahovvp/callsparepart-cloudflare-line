import React from 'react';
import { useRef, useState } from 'react';
import { toBlob } from 'html-to-image';

export default function AnalyticsCards({
    data = {},
    onOpenGraph,
    onOpenSpareSummary,
    onOver7Click,
    onWaitingResponseClick,
    onMaxCardClick,
    dashboardFilter,
    callTypeStats = [],
    onCallTypeClick,
    isAdmin = false
}) {
    const waitingResponseCardRef = useRef(null);
    const [copyStatus, setCopyStatus] = useState('');
    const summary = {
        over7: data.over7 || 0,
        over7Percent: data.over7Percent || '0%',
        waitingResponse: data.waitingResponse || 0,
        waitingResponsePercent: data.waitingResponsePercent || '0%',
        maxPendingUnit: data.maxPendingUnit || '-',
        maxPendingCount: data.maxPendingCount || 0
    };

    const handleCopyWaitingResponseImage = async (event) => {
        event.stopPropagation();
        setCopyStatus('');

        try {
            if (!waitingResponseCardRef.current || !navigator.clipboard?.write || !window.ClipboardItem) {
                throw new Error('เบราว์เซอร์นี้ไม่รองรับการคัดลอกรูปภาพ');
            }

            const image = await toBlob(waitingResponseCardRef.current, {
                backgroundColor: '#ffc107',
                pixelRatio: 2,
                filter: node => node.dataset?.excludeFromImage !== 'true'
            });
            if (!image) throw new Error('ไม่สามารถสร้างรูปภาพได้');

            await navigator.clipboard.write([new ClipboardItem({ 'image/png': image })]);
            setCopyStatus('คัดลอกรูปแล้ว');
        } catch (error) {
            console.error('Could not copy the incomplete warehouse-call report:', error);
            setCopyStatus(error instanceof Error ? error.message : 'คัดลอกรูปไม่สำเร็จ');
        }
    };

    return (
        <div id="analyticsDashboard" className="dashboard">
            <div
                id="over7Card"
                className={`dashboard-card over7-card ${dashboardFilter === 'over7' ? 'active' : ''}`}
                onClick={onOver7Click}
                style={{ cursor: 'pointer' }}
            >
                <h3>Call เกิน 7 วัน</h3>
                <div className="value">{summary.over7}</div>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: summary.over7Percent }}></div>
                </div>
                <div className="progress-text">{summary.over7Percent}</div>
            </div>

            <div
                ref={waitingResponseCardRef}
                id="waitingResponseCard"
                className={`dashboard-card new-card ${dashboardFilter === 'waitingResponse' ? 'active' : ''}`}
                onClick={onWaitingResponseClick}
                style={{ cursor: 'pointer', position: 'relative' }}
            >
                <h3>คลังตอบ Call ไม่ครบ</h3>
                <div className="value">{summary.waitingResponse}</div>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: summary.waitingResponsePercent }}></div>
                </div>
                <div className="progress-text">{summary.waitingResponsePercent}</div>
                <button
                    type="button"
                    data-exclude-from-image="true"
                    onClick={handleCopyWaitingResponseImage}
                    style={{
                        alignSelf: 'center',
                        marginTop: 6,
                        padding: '4px 9px',
                        border: 'none',
                        borderRadius: 5,
                        background: 'rgba(255,255,255,0.9)',
                        color: '#333',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 11
                    }}
                >
                    <i className="fas fa-copy" style={{ marginRight: 5 }} />
                    คัดลอกรูป
                </button>
                {copyStatus && (
                    <span
                        data-exclude-from-image="true"
                        aria-live="polite"
                        style={{ position: 'absolute', top: '100%', left: 0, right: 0, fontSize: 11, color: 'var(--text-secondary)' }}
                    >
                        {copyStatus}
                    </span>
                )}
            </div>

            <div
                id="maxCard"
                className="dashboard-card max-card"
                onClick={onMaxCardClick}
                style={{ cursor: 'pointer' }}
            >
                <h3>Call ค้างสูงสุด</h3>
                <div className="value" style={{ fontSize: '1.2em', paddingBottom: '3px' }}>
                    {summary.maxPendingUnit}
                </div>
                <div className="progress-text" style={{ fontSize: '0.85em', color: 'rgba(255,255,255,0.9)' }}>
                    {summary.maxPendingCount} Call
                </div>
            </div>

            <div id="graphCard" className="dashboard-card graph-card" style={{ cursor: 'pointer' }} onClick={onOpenGraph}>
                <h3><i className="fas fa-chart-line"></i> กราฟสรุป</h3>
                <div className="value"><i className="fas fa-chart-line"></i></div>
            </div>

            <div id="spareSummaryCard" className="dashboard-card spare-card" style={{ cursor: 'pointer' }} onClick={onOpenSpareSummary}>
                <h3><i className="fas fa-list-alt"></i> สรุปอะไหล่</h3>
                <div className="value"><i className="fas fa-list-alt"></i></div>
            </div>

            {isAdmin && (
                <div id="gmSummaryCard" className="dashboard-card gm-summary-card" style={{ cursor: 'pointer' }} onClick={() => onMaxCardClick?.('gmSummary')}>
                    <h3><i className="fas fa-chart-pie"></i> สรุป GM (Executive)</h3>
                    <div className="value"><i className="fas fa-user-tie"></i></div>
                </div>
            )}
            {callTypeStats.filter((item) => item.value > 0).map((item, index) => {
                const filter = `calltype_${item.label}`;
                const typeClass = `calltype-${String(item.label).toLowerCase()}-card`;
                return (
                    <div
                        key={filter}
                        id={`callTypeCard${index}`}
                        className={`dashboard-card group-card ${typeClass} ${dashboardFilter === filter ? 'active' : ''}`}
                        onClick={() => onCallTypeClick?.(filter)}
                        style={{ minWidth: '130px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '2px' }}>
                            <h3 style={{ fontSize: '0.8em', margin: 0 }}>{item.label}</h3>
                            {dashboardFilter === filter && (
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
                        <div className="value" style={{ fontSize: '1.2em' }}>{item.value}</div>
                        <div className="progress-container" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            <div className="progress-bar" style={{ width: `${item.percent}%`, backgroundColor: '#fff' }}></div>
                        </div>
                        <div className="progress-text" style={{ color: '#fff' }}>{item.percent}%</div>
                    </div>
                );
            })}
        </div>
    );
}
