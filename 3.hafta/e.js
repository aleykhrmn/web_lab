const fs = require('fs');

// Asal sayı kontrolü için bir fonksiyon
function isPrime(number) {
  if (number <= 1) return false;
  if (number <= 3) return true;
  if (number % 2 === 0 || number % 3 === 0) return false;

  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

// Asal sayıları hesapla
const primes = [];
const allNumbers = [];

for (let i = 1; i < 90; i++) {
  if (isPrime(i)) {
    primes.push(i);
  }
  allNumbers.push(i);
}

// Asal sayıları asal_sayi.txt dosyasına yaz
fs.writeFileSync('asal_sayi.txt', primes.join(', '));
console.log('90\'dan küçük asal sayılar asal_sayi.txt dosyasına kaydedildi.');

// Tüm sayıları tum_sayilar.txt dosyasına yaz
fs.writeFileSync('tum_sayilar.txt', allNumbers.join('\n'));
console.log('Tüm sayılar tum_sayilar.txt dosyasına kaydedildi.');

// Eksik sayıları belirle ve gerekirse görüntüle
const missingNumbers = allNumbers.filter((number) => !primes.includes(number));

if (missingNumbers.length > 0) {
  console.log('Eksik sayılar:', missingNumbers);
}
