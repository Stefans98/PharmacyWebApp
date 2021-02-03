package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.dto.schedule.WorkDayDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.EmployeeMapper;
import isa.spring.boot.pharmacy.mapper.users.PharmacistMapper;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class WorkDayMapper {

    public static WorkDayDto convertToDto(WorkDay workDay) {

        WorkDayDto dto = new WorkDayDto();

        dto.setId(workDay.getId());
        dto.setStartTime(workDay.getStartTime());
        dto.setEntTime(workDay.getEntTime());
        dto.setEmployee(EmployeeMapper.convertToDto(workDay.getEmployee()));
        dto.setPharmacy(PharmacyMapper.convertToDto(workDay.getPharmacy()));

        return dto;
    }
}
