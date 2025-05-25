import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export function cn(...inputs) {
  try {
    return twMerge(clsx(inputs));
  } catch (error) {
    console.error("Error in cn function:", error);
    return "";
  }
}

export function encryptData(data) {
  try {
    if (!SECRET_KEY) throw new Error("SECRET_KEY is missing!");
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    console.error("Error encrypting data:", error);
    throw new Error("Data encryption failed.");
  }
}

export function decryptData(encryptedData) {
  try {
    if (!SECRET_KEY) throw new Error("SECRET_KEY is missing!");
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) throw new Error("Decryption failed. Invalid data.");
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error decrypting data:", error);
    throw new Error("Data decryption failed.");
  }
}

export function saveToLocalStorage(key, data) {
  try {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    // Optionally fallback to other storage methods or show an alert
  }
}



// Function to clear cookies
export function clearCookies() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = ${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;
  }
}