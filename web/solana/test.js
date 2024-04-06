import bs58 from 'bs58'; // Importer la bibliothèque bs58 pour décoder la clé privée

const base58PrivateKey = 'TfS52fdcHBW2q2eq3johgvXgNrm4MnDBdhagN7LxG3CH6WRpAi5onsZNkwCFekPywf1WafMcPac7z8Ag2NajSi4';
const uint8ArrayPrivateKey = bs58.decode(base58PrivateKey);

console.log(uint8ArrayPrivateKey);
