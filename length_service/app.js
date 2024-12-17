const express = require('express');
const app = express();

app.use(express.json());

// Fungsi untuk konversi panjang
function convertLength(value, fromUnit, toUnit) {
    const validUnits = ['Meter', 'Kilometer', 'Inch'];
    const conversionRates = {
        Meter: { Meter: 1, Kilometer: 0.001, Inch: 39.3701 },
        Kilometer: { Meter: 1000, Kilometer: 1, Inch: 39370.1 },
        Inch: { Meter: 0.0254, Kilometer: 0.0000254, Inch: 1 },
    };

    // Validasi satuan
    if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
        return { error: `Invalid units. Valid units are: ${validUnits.join(', ')}` };
    }

    return conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]
        ? { result: value * conversionRates[fromUnit][toUnit] }
        : { error: 'Conversion not supported' };
}

// Endpoint untuk konversi panjang
app.post('/length/convert', (req, res) => {
    const { value, from_unit, to_unit } = req.body;

    if (value === undefined || !from_unit || !to_unit) {
        return res.status(400).json({ error: 'Missing required fields: value, from_unit, or to_unit' });
    }

    const { result, error } = convertLength(value, from_unit, to_unit);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json({ converted_value: result });
});

app.listen(5002, () => {
    console.log('Length Service running on port 5002');
});
