package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.dto.schedule.WorkDayDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.EmployeeMapper;
import isa.spring.boot.pharmacy.mapper.users.PharmacistMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.Employee;
import org.hibernate.jdbc.Work;

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

    public static WorkDay convertToEntity(WorkDayDto dto, Employee employee, Pharmacy pharmacy) {

        WorkDay workDay = new WorkDay();

        workDay.setId(dto.getId());
        workDay.setStartTime(dto.getStartTime());
        workDay.setEntTime(dto.getEntTime());
        workDay.setEmployee(employee);
        workDay.setPharmacy(pharmacy);

        return workDay;
    }
}
