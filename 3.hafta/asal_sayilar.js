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

// 1 ile 100 arasındaki asal sayıları bul
const primes = [];
for (let i = 0; i <= 100; i++) {
  if (isPrime(i)) {
    primes.push(i);
  }
}

// Asal sayıları asal.txt dosyasına yaz
fs.writeFileSync('asal.txt', primes.join(', '));
console.log("100'den küçük asal sayılar asal.txt dosyasına kaydedildi.");
