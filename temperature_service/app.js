const express = require('express');
const app = express();

app.use(express.json());

// Fungsi konversi suhu
function convertTemperature(value, fromUnit, toUnit) {
    const validUnits = ['Celsius', 'Fahrenheit', 'Kelvin'];
    const conversions = {
        Celsius: { Fahrenheit: (v) => (v * 9/5) + 32, Kelvin: (v) => v + 273.15 },
        Fahrenheit: { Celsius: (v) => (v - 32) * 5/9, Kelvin: (v) => ((v - 32) * 5/9) + 273.15 },
        Kelvin: { Celsius: (v) => v - 273.15, Fahrenheit: (v) => ((v - 273.15) * 9/5) + 32 }
    };

    // Validasi satuan
    if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
        return { error: `Invalid units. Valid units are: ${validUnits.join(', ')}` };
    }

    return conversions[fromUnit] && conversions[fromUnit][toUnit]
        ? { result: conversions[fromUnit][toUnit](value) }
        : { error: 'Conversion not supported' };
}

// Endpoint konversi suhu
app.post('/temperature/convert', (req, res) => {
    const { value, from_unit, to_unit } = req.body;

    if (value === undefined || !from_unit || !to_unit) {
        return res.status(400).json({ error: 'Missing required fields: value, from_unit, or to_unit' });
    }

    const { result, error } = convertTemperature(value, from_unit, to_unit);

    if (error) {
        return res.status(400).json({ error });
    }

    res.json({ converted_value: result });
});

app.listen(5001, () => {
    console.log('Temperature Service running on port 5001');
});
