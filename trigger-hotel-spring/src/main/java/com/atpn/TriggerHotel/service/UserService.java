package com.atpn.TriggerHotel.service;

import com.atpn.TriggerHotel.dto.LoginRequest;
import com.atpn.TriggerHotel.dto.Response;
import com.atpn.TriggerHotel.entity.User;

public interface UserService {

    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String  userId);

    Response getUserById(String userId);

    Response deleteUser(String userId);

    Response getMyInfo(String email);
}
