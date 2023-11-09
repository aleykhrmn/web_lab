const fs = require('fs');

// Dosyayı oku ve içeriği al
fs.readFile('quiz6.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Dosya okuma hatası: ' + err);
        return;
    }

    // Dosya içeriğini satırlara böl
    const lines = data.split('\n');

    // Her satır için polinomları hesapla
    lines.forEach((line, index) => {
        if (line.trim() === '') {
            return; // Boş satırları atla
        }

        // Her satırı boşluk karakterine göre ayır
        const values = line.split(' ');

        if (values.length !== 4) {
            console.error(`Satır ${index + 1}: Polinom eksik veya hatalı.`);
            return;
        }

        // Değerleri a, b ve c olarak ayır
        const x = parseFloat(values[0]);
        const a = parseFloat(values[1]);
        const b = parseFloat(values[2]);
        const c = parseFloat(values[3]);

        // Polinomun değerini hesapla
        const result = a * x * x + b * x + c;

        // Sonucu ekrana yazdır
        console.log(`Polinom ${index + 1} değeri: ${result}`);
    });
});
