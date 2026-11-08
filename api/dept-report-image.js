import React from 'react';
import { ImageResponse } from '@vercel/og';
import { jsonResponse } from '../functions/_shared.js';
import { fetchIncompleteWarehouseCallCount } from '../lib/deptReport.js';

const h = React.createElement;

async function loadReportFonts(baseUrl) {
    const [latinResponse, thaiResponse] = await Promise.all([
        fetch(new URL('/fonts/noto-sans-thai-latin-400-normal.woff', baseUrl)),
        fetch(new URL('/fonts/noto-sans-thai-thai-400-normal.woff', baseUrl))
    ]);
    if (!latinResponse.ok || !thaiResponse.ok) {
        throw new Error('Could not load Noto Sans Thai report fonts');
    }

    const [latin, thai] = await Promise.all([
        latinResponse.arrayBuffer(),
        thaiResponse.arrayBuffer()
    ]);

    return [
        { name: 'Noto Sans Thai', data: latin, weight: 400, style: 'normal' },
        { name: 'Noto Sans Thai', data: thai, weight: 400, style: 'normal' }
    ];
}

function createReportElement(incompleteCallCount, createdAt) {
    const height = 280;
    return {
        width: 900,
        height,
        element: h('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 900,
                height,
                padding: 24,
                boxSizing: 'border-box',
                background: '#f1f4f8',
                color: '#333',
                fontFamily: 'Noto Sans Thai'
            }
        },
        h('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 460,
                height: 176,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #ffc107, #e0a800)',
                color: '#2f2f2f',
                boxShadow: '0 5px 16px rgba(50, 50, 50, 0.16)'
            }
        },
        h('div', { style: { fontSize: 23, fontWeight: 700 } }, 'คลังตอบ Call ไม่ครบ'),
        h('div', { style: { marginTop: 4, fontSize: 58, fontWeight: 800, lineHeight: 1.1 } }, String(incompleteCallCount)),
        h('div', { style: { marginTop: 2, fontSize: 16 } }, 'Call รอตรวจสอบ')),
        h('div', { style: { marginTop: 12, color: '#667085', fontSize: 14 } }, createdAt))
    };
}

export const config = { runtime: 'edge' };

export default async function handler(request) {
    if (request.method !== 'GET') {
        return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'GET' });
    }

    try {
        const incompleteCallCount = await fetchIncompleteWarehouseCallCount(request.url);
        const createdAt = new Intl.DateTimeFormat('th-TH', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Asia/Bangkok'
        }).format(new Date());
        const fonts = await loadReportFonts(request.url);
        const { element, width, height } = createReportElement(incompleteCallCount, createdAt);
        return new ImageResponse(element, {
            width,
            height,
            fonts,
            headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' }
        });
    } catch (error) {
        console.error('Could not render unit-card report image:', error);
        return jsonResponse({ error: 'Could not render the unit-card report image' }, 502);
    }
}
