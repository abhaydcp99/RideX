import { login as apiLogin, register as apiRegister } from './api';

export const login = async (email, password) => {
  try {
    const result = await apiLogin(email, password);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: result.data.id,
        email: result.data.email,
        name: result.data.fullName
      })
    );
    return { success: true, user: result.data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.message || 'Network error. Please try again.' };
  }
};

export const register = async (fullName, email, password, mobile) => {
  try {
    const result = await apiRegister(fullName, email, password, mobile);
    return { success: true, user: result.data };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: error.message || 'Network error. Please try again.' };
  }
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
