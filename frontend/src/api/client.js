const API_BASE_URL = '/api';

export async function evaluateClaim(claimData) {
  try {
    const response = await fetch(`${API_BASE_URL}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claimData),
    });
    if (!response.ok) throw new Error('Failed to evaluate claim');
    return await response.json();
  } catch (err) {
    console.error('API Error (evaluateClaim):', err);
    throw err;
  }
}

export async function processOcrReceipt(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/ocr`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to process OCR receipt');
    return await response.json();
  } catch (err) {
    console.error('API Error (processOcrReceipt):', err);
    throw err;
  }
}