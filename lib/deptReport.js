import { getIncompleteWarehouseCallCount } from '../src/utils/helpers.js';

export async function fetchIncompleteWarehouseCallCount(baseUrl) {
    const dataUrl = new URL('/api/quick-data', baseUrl);
    const response = await fetch(dataUrl);
    if (!response.ok) {
        throw new Error(`Could not load quick dashboard data (HTTP ${response.status})`);
    }

    const data = await response.json();
    if (!Array.isArray(data.mainData) || data.mainData.length === 0) {
        throw new Error('Quick dashboard data returned no CallMaterial rows');
    }

    return getIncompleteWarehouseCallCount(data.mainData);
}
