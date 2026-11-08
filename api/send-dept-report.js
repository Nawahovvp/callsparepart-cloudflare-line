import { jsonResponse } from '../functions/_shared.js';
import { handleVercelRequest } from '../lib/vercel.js';

async function onRequestGet({ request, env }) {
    const cronSecret = env.CRON_SECRET;
    if (!cronSecret || request.headers.get('Authorization') !== `Bearer ${cronSecret}`) {
        return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    const accessToken = env.LINE_CHANNEL_ACCESS_TOKEN;
    const groupId = env.LINE_GROUP_ID;
    if (!accessToken || !groupId) {
        console.error('LINE report is not configured: LINE credentials are missing');
        return jsonResponse({ error: 'LINE report is not configured' }, 503);
    }

    const imageUrl = new URL('/api/dept-report-image', request.url);
    if (imageUrl.protocol !== 'https:') {
        return jsonResponse({ error: 'The report image URL must use HTTPS' }, 500);
    }

    let image;
    try {
        image = await fetch(imageUrl);
    } catch (error) {
        console.error('Could not render the unit-card report image:', error);
        return jsonResponse({ error: 'Could not render the unit-card report image' }, 502);
    }

    if (!image.ok || !image.headers.get('Content-Type')?.startsWith('image/png')) {
        console.error(`Unit-card report image failed (HTTP ${image.status})`);
        return jsonResponse({ error: 'Could not render the unit-card report image' }, 502);
    }

    const imageBytes = new Uint8Array(await image.arrayBuffer());
    const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
    if (!pngSignature.every((byte, index) => imageBytes[index] === byte)) {
        console.error('Unit-card report endpoint returned an invalid PNG');
        return jsonResponse({ error: 'Could not render the unit-card report image' }, 502);
    }

    let response;
    try {
        response = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: groupId,
                messages: [{
                    type: 'image',
                    originalContentUrl: imageUrl.toString(),
                    previewImageUrl: imageUrl.toString()
                }]
            })
        });
    } catch (error) {
        console.error('Could not reach LINE Messaging API:', error);
        return jsonResponse({ error: 'Could not reach LINE Messaging API' }, 502);
    }

    if (!response.ok) {
        const details = await response.text();
        console.error(`LINE report delivery failed (HTTP ${response.status}):`, details);
        return jsonResponse({ error: 'LINE report delivery failed' }, 502);
    }

    return jsonResponse({ sent: true });
}

export default function handler(request, response) {
    return handleVercelRequest(request, response, 'GET', onRequestGet);
}
