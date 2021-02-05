package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.LoyaltyProgramDto;
import isa.spring.boot.pharmacy.dto.users.PatientDto;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.LoyaltyProgram;
import isa.spring.boot.pharmacy.model.users.Patient;

import java.util.ArrayList;

public class LoyaltyProgramMapper {

    public static LoyaltyProgram convertToEntity(LoyaltyProgramDto loyaltyProgramDto) {
        LoyaltyProgram loyaltyProgram = new LoyaltyProgram();

        loyaltyProgram.setSilverPointsBorder(loyaltyProgramDto.getSilverPointsBorder());
        loyaltyProgram.setGoldPointsBorder(loyaltyProgramDto.getGoldPointsBorder());
        loyaltyProgram.setSilverCategoryDiscount(loyaltyProgramDto.getSilverCategoryDiscount());
        loyaltyProgram.setGoldCategoryDiscount(loyaltyProgramDto.getGoldCategoryDiscount());
        loyaltyProgram.setPointsPerExaminations(loyaltyProgramDto.getPointsPerExaminations());
        loyaltyProgram.setPointsPerCounseling(loyaltyProgramDto.getPointsPerCounseling());

        return loyaltyProgram;
    }

    public static LoyaltyProgramDto convertToDto(LoyaltyProgram loyaltyProgram) {
        LoyaltyProgramDto loyaltyProgramDto = new LoyaltyProgramDto();

        loyaltyProgramDto.setSilverPointsBorder(loyaltyProgram.getSilverPointsBorder());
        loyaltyProgramDto.setGoldPointsBorder(loyaltyProgram.getGoldPointsBorder());
        loyaltyProgramDto.setSilverCategoryDiscount(loyaltyProgram.getSilverCategoryDiscount());
        loyaltyProgramDto.setGoldCategoryDiscount(loyaltyProgram.getGoldCategoryDiscount());
        loyaltyProgramDto.setPointsPerExaminations(loyaltyProgram.getPointsPerExaminations());
        loyaltyProgramDto.setPointsPerCounseling(loyaltyProgram.getPointsPerCounseling());

        return loyaltyProgramDto;
    }
}
