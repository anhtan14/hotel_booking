package com.atpn.TriggerHotel.service;

import com.atpn.TriggerHotel.dto.Response;
import com.atpn.TriggerHotel.entity.Booking;

public interface BookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
