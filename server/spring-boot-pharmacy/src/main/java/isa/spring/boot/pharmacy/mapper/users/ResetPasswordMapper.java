package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.ResetPasswordDto;
import isa.spring.boot.pharmacy.model.users.User;

public class ResetPasswordMapper {

    public static ResetPasswordDto convertToDto(User user) {
        ResetPasswordDto dto = new ResetPasswordDto();

        dto.setUserId(user.getId());
        if(user.getLastPasswordResetDate() != null) {
            dto.setPasswordReset(true);
        } else {
            dto.setPasswordReset(false);
        }
        dto.setNewPassword(user.getPassword());

        return dto;
    }

    public static User convertToEntity(ResetPasswordDto dto) {
        User user = new User();

        user.setId(dto.getUserId());
        user.setPassword(dto.getNewPassword(), true);

        return user;
    }
}
