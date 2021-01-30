package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.UserDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.User;

import java.util.ArrayList;

public class UserMapper {

    public static UserDto convertToDto(User user) {
        UserDto dto = new UserDto();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setCity(user.getAddress().getCity());
        dto.setCountry(user.getAddress().getCountry());
        dto.setStreet(user.getAddress().getStreet());
        dto.setPassword(null);

        return dto;
    }

    public static User convertToEntity(UserDto dto, boolean alreadyExist) {
        User user = new User();

        if (alreadyExist) {
            user.setId(dto.getId());
        }
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setAddress(new Address(dto.getCountry(), dto.getCity(),
                dto.getStreet(), user));
        user.setPassword(dto.getPassword(), false);

        return user;
    }

}
