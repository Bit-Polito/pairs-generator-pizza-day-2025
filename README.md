# Random Pairs Generator

Un'applicazione web per generare squadre casuali per Il Pizza Day 2025.

## 🚀 Funzionalità

- Inserimento nomi dei partecipanti
- Generazione casuale di squadre
- Algoritmo Fisher-Yates per una distribuzione veramente casuale
- Download delle squadre in formato Excel

## 🎲 Algoritmo di Shuffle

L'applicazione utilizza l'algoritmo Fisher-Yates (anche noto come Knuth shuffle) per garantire una distribuzione veramente casuale dei partecipanti nelle squadre. La casualità è garantita utilizzando `crypto.getRandomValues()`, che fornisce numeri casuali crittograficamente sicuri basati su fonti di entropia del sistema operativo.

Questo approccio offre diversi vantaggi:
- Distribuzione uniforme e imparziale
- Imprevedibilità dei risultati
- Sicurezza crittografica
- Prevenzione di manipolazioni

## 🛠️ Tecnologie Utilizzate

- React
- Vite
- Chakra UI
- GitHub Pages per il deploy

## 🏗️ Installazione

1. Clona il repository:
```bash
git clone https://github.com/Bit-Polito/pairs-generator-pizza-day-2025
cd random-pairs-generator
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

## 🚀 Deploy

L'applicazione è deployata su GitHub Pages all'indirizzo:
https://Bit-Polito.github.io/pairs-generator-pizza-day-2025

Per fare il deploy di nuove modifiche:
```bash
npm run deploy
```


