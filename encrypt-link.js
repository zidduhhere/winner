import { webcrypto } from 'crypto';

const SECRET_KEY = process.env.VITE_SECRET_KEY || 'default_secret_key_for_dev_only';

const getPasswordKey = async () => {
  const enc = new TextEncoder();
  const keyMaterial = await webcrypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  
  const salt = enc.encode("kulathinkara-salt"); 
  return webcrypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

const bufferToHex = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const encryptString = async (text) => {
  const key = await getPasswordKey();
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  
  const ciphertext = await webcrypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    enc.encode(text)
  );
  
  return bufferToHex(iv) + bufferToHex(ciphertext);
};

// If run directly
const link = process.argv[2];
if (link) {
  encryptString(link).then(encrypted => {
    console.log("Original Link:", link);
    console.log("Encrypted Link:", encrypted);
  });
} else {
  console.log("Usage: node encrypt-link.js <link>");
}
