package com.atpn.TriggerHotel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class TriggerHotelApplication {

	public static final Logger logger = LogManager.getLogger(TriggerHotelApplication.class);

	public static void main(String[] args) {

		SpringApplication.run(TriggerHotelApplication.class, args);

		logger.warn("Application started successfully");

	}

}
