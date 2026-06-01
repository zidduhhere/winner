// Using Web Crypto API for AES-GCM encryption/decryption
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'default_secret_key_for_dev_only';

// Helper to convert string to ArrayBuffer
const getPasswordKey = async () => {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  
  // Derive a 256-bit key from the password
  // We use a fixed salt for simplicity since this is a simple static site decryptor
  const salt = enc.encode("kulathinkara-salt"); 
  return window.crypto.subtle.deriveKey(
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

// Convert ArrayBuffer to Hex String
const bufferToHex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Convert Hex String to ArrayBuffer
const hexToBuffer = (hex: string) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
};

/**
 * Encrypts a string using AES-GCM
 * Returns a hex string: iv(12 bytes) + ciphertext
 */
export const encryptString = async (text: string): Promise<string> => {
  const key = await getPasswordKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    enc.encode(text)
  );
  
  return bufferToHex(iv.buffer) + bufferToHex(ciphertext);
};

/**
 * Decrypts an AES-GCM encrypted hex string
 */
export const decryptString = async (encryptedHex: string): Promise<string> => {
  try {
    const key = await getPasswordKey();
    
    // First 24 hex chars = 12 bytes IV
    const ivHex = encryptedHex.substring(0, 24);
    const cipherHex = encryptedHex.substring(24);
    
    const iv = hexToBuffer(ivHex);
    const ciphertext = hexToBuffer(cipherHex);
    
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      ciphertext
    );
    
    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption failed", error);
    return "";
  }
};
