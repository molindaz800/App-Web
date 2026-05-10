export type SessionPayload = {
  sub: string;
  role: "owner";
  platform: "NOVAIX OS";
  exp: number;
};

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  const base64 = typeof btoa === "function" ? btoa(binary) : Buffer.from(bytes).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  const binary = typeof atob === "function" ? atob(padded) : Buffer.from(padded, "base64").toString("binary");
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function importHmacKey(secret: string, usage: KeyUsage) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [usage]);
}

export async function createSessionToken(username: string, secret: string) {
  const payload: SessionPayload = {
    sub: username,
    role: "owner",
    platform: "NOVAIX OS",
    exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60
  };
  const payloadPart = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const key = await importHmacKey(secret, "sign");
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadPart));
  return `${payloadPart}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) {
    return null;
  }

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) {
    return null;
  }

  const key = await importHmacKey(secret, "verify");
  const valid = await crypto.subtle.verify("HMAC", key, fromBase64Url(signaturePart), encoder.encode(payloadPart));
  if (!valid) {
    return null;
  }

  const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadPart))) as SessionPayload;
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}
