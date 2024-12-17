const express = require('express');
const app = express();

app.use(express.json());

// Fungsi untuk konversi berat
function convertWeight(value, fromUnit, toUnit) {
    const validUnits = ['Gram', 'Kilogram', 'Ons'];
    const conversionRates = {
        Gram: { Gram: 1, Kilogram: 0.001, Ons: 0.1 },
        Kilogram: { Gram: 1000, Kilogram: 1, Ons: 10 },
        Ons: { Gram: 100, Kilogram: 0.1, Ons: 1 },
    };

    // Validasi satuan
    if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
        return { error: `Invalid units. Valid units are: ${validUnits.join(', ')}` };
    }

    return conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]
        ? { result: value * conversionRates[fromUnit][toUnit] }
        : { error: 'Conversion not supported' };
}

// Endpoint untuk konversi berat
app.post('/weight/convert', (req, res) => {
    const { value, from_unit, to_unit } = req.body;

    if (value === undefined || !from_unit || !to_unit) {
        return res.status(400).json({ error: 'Missing required fields: value, from_unit, or to_unit' });
    }

    const { result, error } = convertWeight(value, from_unit, to_unit);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json({ converted_value: result });
});

app.listen(5003, () => {
    console.log('Weight Service running on port 5003');
});
