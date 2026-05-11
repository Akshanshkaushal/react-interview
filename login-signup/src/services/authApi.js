// Step 1: Create API service for login/signup
// Use fetch to call actual APIs with headers.

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust to your API endpoint

// Step 2: Implement login function
export async function login(form) {
  const { email, password } = form;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add Authorization if needed, e.g., 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Login successful',
        user: data.user,
      };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

// Step 3: Implement signup function
export async function signup(form) {
  const { name, email, password } = form;

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add Authorization if needed
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Signup successful',
        user: data.user,
      };
    } else {
      return { success: false, message: data.message || 'Signup failed' };
    }
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}
