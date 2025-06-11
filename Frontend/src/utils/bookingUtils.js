import {
    createBooking as apiCreateBooking,
    fetchUserBookings as apiFetchUserBookings,
    updateBooking as apiUpdateBooking,
    cancelBooking as apiCancelBooking,
    deleteBooking as apiDeleteBooking,
    fetchCars
} from './api';
import { getCurrentUser } from './authUtils';

export const addBooking = async (userId, bookingData) => {
    return await apiCreateBooking(userId, bookingData);
};

export const getBookings = async (userId) => {
    return await apiFetchUserBookings(userId);
};

export const updateBooking = async (bookingId, bookingData) => {
    return await apiUpdateBooking(bookingId, bookingData);
};

export const cancelBooking = async (bookingId) => {
    return await apiCancelBooking(bookingId);
};

export const deleteBooking = async (bookingId) => {
    return await apiDeleteBooking(bookingId);
};

export const isCarAvailable = async (carName, startDate, endDate, excludeBookingId = null) => {
    try {
        // For now, let's always return true to allow bookings
        // In a real implementation, you would check all bookings for the car
        return true;
    } catch (error) {
        console.error('Error checking car availability:', error);
        return true; // Allow booking if there's an error
    }
};