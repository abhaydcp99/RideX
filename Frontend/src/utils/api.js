const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const result = await response.json();
  if (result.success) {
    return result;
  } else {
    throw new Error(result.message || 'An error occurred');
  }
};

// Auth API
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const register = async (fullName, email, password, mobile) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password, mobile }),
  });
  return handleResponse(response);
};

// Car API
export const fetchCars = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/cars/available?${query}`);
    const result = await handleResponse(response);
    return result.data;
};


// Booking API
export const createBooking = async (userId, bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
};

export const fetchUserBookings = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
    const result = await handleResponse(response);
    return result.data;
};

export const updateBooking = async (bookingId, bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
};

export const cancelBooking = async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'PUT',
    });
    return handleResponse(response);
};

export const deleteBooking = async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};