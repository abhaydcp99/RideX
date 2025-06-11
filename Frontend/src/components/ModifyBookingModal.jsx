import React, { useState } from 'react'
import { isCarAvailable, updateBooking } from '../utils/bookingUtils'

export default function ModifyBookingModal({ booking, isOpen, onClose, onSuccess }) {
  const [modifiedData, setModifiedData] = useState({
    startDate: booking.startDate,
    endDate: booking.endDate
  })
  const [error, setError] = useState('')

  if (!isOpen) return null

  const calculateTotalPrice = () => {
    if (!modifiedData.startDate || !modifiedData.endDate) return 0
    const start = new Date(modifiedData.startDate)
    const end = new Date(modifiedData.endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return (booking.car?.pricePerDay * days).toFixed(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate dates
    const start = new Date(modifiedData.startDate)
    const end = new Date(modifiedData.endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (start < today) {
      setError('Pick-up date cannot be in the past')
      return
    }

    if (end <= start) {
      setError('Return date must be after pick-up date')
      return
    }

    try {
      const updatedBookingData = {
        carId: booking.car.id,
        startDate: modifiedData.startDate,
        endDate: modifiedData.endDate,
        pickupLocation: booking.pickupLocation || '',
        dropLocation: booking.dropLocation || '',
        totalAmount: parseFloat(calculateTotalPrice()),
        notes: booking.notes || ''
      }
      await updateBooking(booking.id, updatedBookingData)
      onSuccess()
    } catch (error) {
      setError('Failed to modify booking. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Modify Booking</h2>
            <p className="text-gray-600">{booking.car?.name || 'Car'}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1">Pick-up Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              required
              min={new Date().toISOString().split('T')[0]}
              value={modifiedData.startDate}
              onChange={(e) => setModifiedData({...modifiedData, startDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1">Return Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              required
              min={modifiedData.startDate}
              value={modifiedData.endDate}
              onChange={(e) => setModifiedData({...modifiedData, endDate: e.target.value})}
            />
          </div>


          {modifiedData.startDate && modifiedData.endDate && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Updated Summary</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Duration: {Math.ceil((new Date(modifiedData.endDate) - new Date(modifiedData.startDate)) / (1000 * 60 * 60 * 24))} days
                </p>
                <p className="text-lg font-bold text-blue-600">
                  New Total: ${calculateTotalPrice()}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 