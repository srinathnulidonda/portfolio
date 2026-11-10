// data/validate.ts
import type { ContactErrors, ContactValues } from "./types";

export const NAME_MIN = 2;
export const NAME_MAX = 50;
export const EMAIL_MAX = 254;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 500;

const LOCAL_MAX = 64;
const ATOM = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
const LABEL = "[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?";
const EMAIL_RE = new RegExp(`^${ATOM}(?:\\.${ATOM})*@(?:${LABEL}\\.)+[A-Za-z]{2,}$`);

function validEmail(email: string) {
  if (!email || email.length > EMAIL_MAX) return false;
  const at = email.lastIndexOf("@");
  if (at < 1 || at > LOCAL_MAX) return false;
  return EMAIL_RE.test(email);
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim().length;
  const email = values.email.trim();
  const message = values.message.trim().length;
  if (name < NAME_MIN || name > NAME_MAX) errors.name = `Enter your name (${NAME_MIN} to ${NAME_MAX} characters).`;
  if (!validEmail(email)) errors.email = "Enter a valid email address.";
  if (message < MESSAGE_MIN || message > MESSAGE_MAX) {
    errors.message = `Write a message of ${MESSAGE_MIN} to ${MESSAGE_MAX} characters.`;
  }
  return errors;
}