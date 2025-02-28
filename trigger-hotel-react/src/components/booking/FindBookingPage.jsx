import React from "react";
import { useState } from "react";
import APIService from "../../service/APIService";

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please enter a confirmation code");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    try {
        //Call API to get booking by confirmation code
      const response = await APIService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      console.log(response.booking);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="find-booking-page">
      <h2>Find Booking</h2>
      <div className="search-container">
        <input
          required
          type="text"
          placeholder="Search by booking confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {bookingDetails && (
        <div className="booking-details">
          <h3>Booking Details</h3>
          <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
          <p>Check-in Date: {bookingDetails.checkInDate}</p>
          <p>Check-out Date: {bookingDetails.checkOutDate}</p>
          <p>Num Of Adults: {bookingDetails.numOfAdults}</p>
          <p>Num Of Children: {bookingDetails.numOfChildren}</p>

          <br />
          <hr />
          <br />

          <h3>Guest Details</h3>
          <div>
            <p>Name: {bookingDetails.user.name}</p>
            <p>Email: {bookingDetails.user.email}</p>
            <p>Phone: {bookingDetails.user.phone}</p>
          </div>

          <br />
          <hr />
          <br />

          <h3>Room Details</h3>
          <div>
            <p>Room Type: {bookingDetails.room.roomType}</p>
            <img src={bookingDetails.room.roomPhotoUrl} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
