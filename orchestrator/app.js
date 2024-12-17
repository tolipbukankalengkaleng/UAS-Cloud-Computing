const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Helper untuk validasi
function validateRequest(req, res) {
    const { value, from_unit, to_unit } = req.body;
    if (value === undefined || !from_unit || !to_unit) {
        return res.status(400).json({ error: 'Missing required fields: value, from_unit, or to_unit' });
    }
    return true;
}

// Fungsi umum untuk menangani error respons
function handleServiceError(error, res) {
    if (error.response) {
        // Respons dari service dengan status 400 atau lainnya
        return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
        // Jika service tidak bisa dihubungi
        return res.status(500).json({ error: 'Service is not reachable' });
    } else {
        // Error lainnya
        return res.status(500).json({ error: error.message });
    }
}

// Endpoint untuk konversi suhu
app.post('/converter/convert-temperature', async (req, res) => {
    if (!validateRequest(req, res)) return;

    try {
        const response = await axios.post('http://temperature_service:5001/temperature/convert', req.body);
        res.json(response.data);
    } catch (error) {
        handleServiceError(error, res);
    }
});

// Endpoint untuk konversi panjang
app.post('/converter/convert-length', async (req, res) => {
    if (!validateRequest(req, res)) return;

    try {
        const response = await axios.post('http://length_service:5002/length/convert', req.body);
        res.json(response.data);
    } catch (error) {
        handleServiceError(error, res);
    }
});

// Endpoint untuk konversi berat
app.post('/converter/convert-weight', async (req, res) => {
    if (!validateRequest(req, res)) return;

    try {
        const response = await axios.post('http://weight_service:5003/weight/convert', req.body);
        res.json(response.data);
    } catch (error) {
        handleServiceError(error, res);
    }
});

app.listen(5000, () => {
    console.log('Orchestrator running on port 5000');
});
