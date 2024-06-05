package com.dh.msusers.application.utils;

import com.dh.msusers.domain.entities.User;
import com.dh.msusers.exceptions.RestException;
import lombok.experimental.UtilityClass;

import java.util.Map;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@UtilityClass
public class UserFieldValidator {

    public static boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    public static boolean isValidPassword(String password) {
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#.$%^&+=!])(?=\\S+$).{8,}$");
    }

    public static boolean isValidName(String name) {
        return name.matches("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)$") && name.length() >= 2 && name.length() <= 50;
    }

    public static boolean isValidNumber(String phoneNumber, int length) {
        return phoneNumber.matches(String.format("^[0-9]{%d}$", length));
    }

    public static boolean isValidCoordinate(String coordinate) {
        return coordinate.matches("^-?\\d{1,3}\\.\\d{7}$");
    }

    public static boolean isNullField(User user) {
        return isNull(user.getEmail()) || isNull(user.getFirstName()) || isNull(user.getLastName()) || isNull(user.getPassword());
    }

    public static void validateUserFields(User user) {
        if (isNullField(user)) {
            throwInvalidFieldException("user", "The fields email, firstName, lastName and password are required.");
        }

        if (nonNull(user.getEmail()) && !isValidEmail(user.getEmail())) {
            throwInvalidFieldException("email", "Invalid email, It must comply with the following regular expression: ^[A-Za-z0-9+_.-]+@(.+)$");
        }

        if (nonNull(user.getPassword()) && !isValidPassword(user.getPassword())) {
            throwInvalidFieldException("password", "Invalid password, must contain at least a number, a letter in uppercase, a letter in lowercase, a special character (@#.$%^&+=!) and must be at least 8 characters long.");
        }

        if (nonNull(user.getFirstName()) && !isValidName(user.getFirstName())) {
            throwInvalidFieldException("firstName", "Invalid name, only allows letters and spaces, must be at least 3 characters long and a maximum of 50.");
        }

        if (nonNull(user.getLastName()) && !isValidName(user.getLastName())) {
            throwInvalidFieldException("lastName", "Invalid name, only allows letters and spaces, must be at least 3 characters long and a maximum of 50.");
        }

        if (nonNull(user.getPhone()) && !isValidNumber(user.getPhone().toString(), 10)) {
            throwInvalidFieldException("phone", "Invalid phone number, must be 10 digits long.");
        }

        if (nonNull(user.getDocument()) && !isValidNumber(user.getDocument().toString(), 10)) {
            throwInvalidFieldException("document", "Invalid document number, must be 10 digits long.");
        }

        if (nonNull(user.getLocation()) && !isValidCoordinate(user.getLocation().getX() + "") && !isValidCoordinate(user.getLocation().getY() + "")) {
            throwInvalidFieldException("location", "Invalid location, must be a valid coordinate.");
        }

        if (nonNull(user.getLocationDetails()) && user.getLocationDetails().length() > 255) {
            throwInvalidFieldException("locationDetails", "Invalid location details, must be less than 255 characters long.");
        }
    }

    private static void throwInvalidFieldException(String field, String message) {
        throw new RestException(BAD_REQUEST, Map.of(field, message).toString());
    }
}
