import React, { useEffect, useState } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://chefkart-backend-1.onrender.com/Booking/get") // Adjust endpoint as per your backend
      .then((res) => res.json())
      .then((data) => setBookings(data.data || []))
      .catch((err) => console.error("Failed to fetch bookings", err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="font-bold text-2xl mb-6 text-gray-800">Booking List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="text-center hover:bg-gray-50 transition"
                  >
                    {/* <td className="px-4 py-2 border">{booking.userName || booking.user || "N/A"}</td> */}
                    <td className="px-4 py-2 border">
                      {booking.userName ||
                        (booking.user &&
                          (booking.user.name || booking.user.email)) ||
                        "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {booking.
bookingDate
 || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {booking.status || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
