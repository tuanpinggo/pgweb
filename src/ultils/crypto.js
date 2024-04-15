import CryptoJS from "crypto-js";
import { globalConfig } from "@/ultils/config";

export function encryptWb(value) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(value),
    globalConfig.SECRET_ENCRY
  ).toString();
}

export function decryptWb(value) {
  return CryptoJS.AES.decrypt(value, globalConfig.SECRET_ENCRY).toString(
    CryptoJS.enc.Utf8
  );
}
