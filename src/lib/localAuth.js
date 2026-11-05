const USERS_KEY = "gatherly.demo.users";
const SESSION_KEY = "gatherly.demo.session";
const PASSWORD_ITERATIONS = 150_000;

function readJson(storage, key, fallback) {
  const raw = storage.getItem(key);
  if (raw === null) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Saved demo data is invalid. Clear this site's browser data and try again.");
  }
}

function writeJson(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
}

function toBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure password hashing is unavailable in this browser context.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: PASSWORD_ITERATIONS,
    },
    key,
    256,
  );

  return toBase64(bits);
}

function getUsers() {
  const users = readJson(window.localStorage, USERS_KEY, []);
  if (!Array.isArray(users)) {
    throw new Error("Saved demo accounts are invalid. Clear this site's browser data and try again.");
  }
  return users;
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

function saveSession(session, remember) {
  if (remember) {
    window.sessionStorage.removeItem(SESSION_KEY);
    writeJson(window.localStorage, SESSION_KEY, session);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
    writeJson(window.sessionStorage, SESSION_KEY, session);
  }
}

export async function registerLocalUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const account = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    salt: toBase64(salt),
    passwordHash: await hashPassword(password, salt),
  };
  users.push(account);
  writeJson(window.localStorage, USERS_KEY, users);

  const sessionUser = publicUser(account);
  saveSession(sessionUser, true);
  return sessionUser;
}

export async function loginLocalUser({ email, password, remember = false }) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = getUsers().find((user) => user.email === normalizedEmail);

  if (!account) {
    throw new Error("Email or password is incorrect.");
  }

  const salt = Uint8Array.from(atob(account.salt), (character) =>
    character.charCodeAt(0),
  );
  const passwordHash = await hashPassword(password, salt);
  if (passwordHash !== account.passwordHash) {
    throw new Error("Email or password is incorrect.");
  }

  const sessionUser = publicUser(account);
  saveSession(sessionUser, remember);
  return sessionUser;
}

export function getLocalSession() {
  const session =
    readJson(window.localStorage, SESSION_KEY, null) ??
    readJson(window.sessionStorage, SESSION_KEY, null);
  if (
    session === null ||
    typeof session.id !== "string" ||
    typeof session.email !== "string" ||
    typeof session.name !== "string"
  ) {
    if (session === null) return null;
    throw new Error("Saved demo session is invalid. Please sign in again.");
  }
  return session;
}

export function clearLocalSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}
