// Step 1: Create a mock backend service for login/signup
// In an interview, start by defining the API functions that simulate backend calls.
// Use localStorage as a simple "database" for demo purposes.

const STORAGE_KEY = 'dummyAuthDb';

// Helper to read users from localStorage
function readUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Helper to save users to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Step 2: Implement login function
// Check if user exists and password matches
export async function login(form) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { email, password } = form;
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user || user.password !== password) {
    return { success: false, message: 'Invalid email or password.' };
  }

  return {
    success: true,
    message: `Welcome back, ${user.name}!`,
    user: { name: user.name, email: user.email },
  };
}

// Step 3: Implement signup function
// Validate input, check for existing user, save new user
export async function signup(form) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { name, email, password } = form;
  if (!name || !email || !password) {
    return { success: false, message: 'Name, email, and password are required.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (existing) {
    return { success: false, message: 'Email is already registered.' };
  }

  const newUser = {
    id: Date.now().toString(),
    name: name.trim(),
    email: normalizedEmail,
    password,
  };
  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: 'Account created successfully!',
    user: { name: newUser.name, email: newUser.email },
  };
}
