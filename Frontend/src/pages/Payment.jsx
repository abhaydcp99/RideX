import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);

  const [formData, setFormData] = useState({
    paymentType: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedBooking = localStorage.getItem("currentBooking");
    if (storedBooking) {
      setBookingDetails(JSON.parse(storedBooking));
    }
  }, []);

  const cardNumberRegex = /^\d{16}$/;
  const cardNameRegex = /^[a-zA-Z\s]{3,}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const cvvRegex = /^[0-9]{3}$/;
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

  const validate = () => {
    const newErrors = {};

    if (formData.paymentType === "card") {
      if (!cardNameRegex.test(formData.cardName)) {
        newErrors.cardName = "Cardholder name must be at least 3 letters.";
      }
      if (!cardNumberRegex.test(formData.cardNumber)) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!expiryRegex.test(formData.expiry)) {
        newErrors.expiry = "Expiry must be in MM/YY format.";
      }
      if (!cvvRegex.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3 digits.";
      }
    } else if (formData.paymentType === "upi") {
      if (!upiRegex.test(formData.upiId)) {
        newErrors.upiId = "Enter a valid UPI ID (example@bank).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePaymentTypeChange = (e) => {
    setFormData({
      paymentType: e.target.value,
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get current booking data
      const bookingData = JSON.parse(localStorage.getItem("currentBooking"));

      // Navigate to orders page with booking data
      navigate("/orders", {
        state: {
          bookingData,
          paymentSuccess: true,
        },
      });

      // Clear the booking data after successful navigation
      localStorage.removeItem("currentBooking");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Ride <span className="text-amber-500">X</span> Payment
        </h2>

        {bookingDetails && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Booking Summary</h3>
            <p className="text-sm">
              <span className="font-medium">Car:</span>{" "}
              {bookingDetails.car?.name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Dates:</span>{" "}
              {new Date(bookingDetails.startDate).toLocaleDateString()} -{" "}
              {new Date(bookingDetails.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Total:</span> ₹
              {bookingDetails.totalAmount}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-6 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="card"
                checked={formData.paymentType === "card"}
                onChange={handlePaymentTypeChange}
                className="h-4 w-4 text-indigo-600"
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="upi"
                checked={formData.paymentType === "upi"}
                onChange={handlePaymentTypeChange}
                className="h-4 w-4 text-indigo-600"
              />
              <span>UPI</span>
            </label>
          </div>

          {formData.paymentType === "card" ? (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.cardName && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  maxLength={16}
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={formData.expiry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    maxLength={3}
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID (e.g., example@upi)"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.upiId && (
                <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors ${
              isProcessing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
