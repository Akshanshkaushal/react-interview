const STORAGE_KEY = 'mockAuthDb';

function loadUsers() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  return loadUsers().find((user) => user.email.toLowerCase() === normalizedEmail) || null;
}

export function saveUser(user) {
  const users = loadUsers().filter((existing) => existing.email.toLowerCase() !== user.email.toLowerCase());
  users.push(user);
  saveUsers(users);
  return user;
}

export function getUsers() {
  return loadUsers();
}
