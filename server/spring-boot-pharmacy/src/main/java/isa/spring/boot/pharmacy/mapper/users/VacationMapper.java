package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.VacationDto;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class VacationMapper {

    public static VacationDto convertToDto(VacationRequest vacationRequest) {
        VacationDto dto = new VacationDto();

        dto.setId(vacationRequest.getId());
        dto.setEmployeeId(vacationRequest.getEmployee().getId());
        dto.setPharmacyId(vacationRequest.getPharmacy().getId());
        dto.setStartTime(vacationRequest.getStartTime());
        dto.setEndTime(vacationRequest.getEndTime());
        dto.setProcessed(vacationRequest.getProcessed());
        if(vacationRequest.getVacationType() == VacationType.VACATION){
            dto.setVacationType(0);
        }else if(vacationRequest.getVacationType() == VacationType.ABSENCE){
            dto.setVacationType(1);
        }

        return dto;
    }

    public static VacationRequest convertToEntity(VacationDto dto) {
        VacationRequest vacationRequest = new VacationRequest();

        vacationRequest.setId(dto.getId());
        vacationRequest.setProcessed(dto.getProcessed());
        if(dto.getVacationType() == 0) {
            vacationRequest.setVacationType(VacationType.VACATION);
        } else if(dto.getVacationType() == 1){
            vacationRequest.setVacationType(VacationType.ABSENCE);
        }
        vacationRequest.setStartTime(dto.getStartTime());
        vacationRequest.setEndTime(dto.getEndTime());

        return vacationRequest;
    }

}
