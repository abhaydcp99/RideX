import React, { useEffect, useState } from "react";
import {
  getBookings,
  updateBooking,
  deleteBooking,
  cancelBooking,
} from "../utils/bookingUtils";
import { isAuthenticated, getCurrentUser } from "../utils/authUtils";
import SuccessModal from "./SuccessModal";
import ModifyBookingModal from "./ModifyBookingModal";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    loadBookings();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated()) {
        loadBookings();
      }
    };

    const handleFocus = () => {
      if (isAuthenticated()) {
        loadBookings();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const loadBookings = async () => {
    const user = getCurrentUser();
    if (user) {
      try {
        setLoading(true);
        setError("");
        const userBookings = await getBookings(user.id);
        setBookings(userBookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleModify = (booking) => {
    setSelectedBooking(booking);
    setShowModifyModal(true);
  };

  const handlePayment = (booking) => {
    localStorage.setItem("currentBooking", JSON.stringify(booking));
    navigate(`/payment?bookingId=${booking.id}`);
  };

  const handleCancel = async (booking) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(booking.id);
        setSuccessMessage("Booking cancelled successfully!");
        setShowSuccessModal(true);
        loadBookings();
      } catch (error) {
        console.error("Failed to cancel booking:", error);
      }
    }
  };

  const handleDelete = async (booking) => {
    if (
      window.confirm(
        "Are you sure you want to delete this booking? This action cannot be undone."
      )
    ) {
      try {
        await deleteBooking(booking.id);
        setSuccessMessage("Booking deleted successfully!");
        setShowSuccessModal(true);
        loadBookings();
      } catch (error) {
        console.error("Failed to delete booking:", error);
      }
    }
  };

  const handleModifySuccess = () => {
    setShowModifyModal(false);
    setSuccessMessage("Booking modified successfully!");
    setShowSuccessModal(true);
    loadBookings();
  };

  const calculateTotalPrice = (booking) => {
    return booking.totalAmount || 0;
  };

  if (loading) {
    return (
      <div className="text-center py-8 mt-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-500 mt-4">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 mt-20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={loadBookings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 mt-20">
        <p className="text-gray-500">No bookings found</p>
        <button
          onClick={loadBookings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="grid gap-6">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={
                    booking.car?.imageUrl ||
                    `/images/car-${(index % 6) + 1}.jpg`
                  }
                  alt={booking.car?.name || "Car"}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="md:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {booking.car?.name || "Car"}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {booking.car?.brand} {booking.car?.model}
                    </p>
                    <p className="text-gray-600">
                      ${booking.car?.pricePerDay}/day
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status || "PENDING"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Pick-up Date</p>
                    <p className="font-semibold">
                      {new Date(booking.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Return Date</p>
                    <p className="font-semibold">
                      {new Date(booking.endDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Booked By</p>
                    <p className="font-semibold">
                      {booking.user?.fullName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold">
                      {booking.user?.mobile || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">
                      {booking.user?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-bold text-lg">
                        {Math.ceil(
                          (new Date(booking.endDate) -
                            new Date(booking.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="font-bold text-lg text-blue-600">
                        ${calculateTotalPrice(booking)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  {booking.status !== "CANCELLED" && (
                    <button
                      className="px-4 py-2 text-sm text-orange-600 hover:text-orange-800 font-medium border border-orange-600 rounded hover:bg-orange-50"
                      onClick={() => handleCancel(booking)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium border border-red-600 rounded hover:bg-red-50"
                    onClick={() => handleDelete(booking)}
                  >
                    Delete Booking
                  </button>
                  {booking.status !== "CANCELLED" && (
                    <>
                      <button
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleModify(booking)}
                      >
                        Modify Booking
                      </button>
                      {booking.status === "PENDING" && (
                        <button
                          className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() => handlePayment(booking)}
                        >
                          Proceed to Payment
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBooking && (
        <ModifyBookingModal
          booking={selectedBooking}
          isOpen={showModifyModal}
          onClose={() => setShowModifyModal(false)}
          onSuccess={handleModifySuccess}
        />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </div>
  );
}
