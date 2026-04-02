import crypto from "crypto";
import { headers } from "next/headers";

const API_BASE = "https://api.lemonsqueezy.com/v1";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

export function getLemonSqueezyApiKey() {
  return getRequiredEnv("LEMON_SQUEEZY_API_KEY");
}

export function getLemonSqueezyStoreId() {
  return getRequiredEnv("LEMON_SQUEEZY_STORE_ID");
}

export function getLemonSqueezyVariantId() {
  return getRequiredEnv("LEMON_SQUEEZY_VARIANT_ID");
}

export function getLemonSqueezyWebhookSecret() {
  return getRequiredEnv("LEMON_SQUEEZY_WEBHOOK_SECRET");
}

export function isLemonSqueezyTestMode() {
  return process.env.LEMON_SQUEEZY_TEST_MODE === "true";
}

export function getLemonHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${getLemonSqueezyApiKey()}`,
  };
}

export async function lemonFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...getLemonHeaders(),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Lemon Squeezy API error (${response.status}): ${errorText}`,
    );
  }

  return response.json() as Promise<T>;
}

export function verifyLemonSignature(rawBody: string, signature: string) {
  const digest = crypto
    .createHmac("sha256", getLemonSqueezyWebhookSecret())
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(digest, "utf8"),
    Buffer.from(signature, "utf8"),
  );
}
