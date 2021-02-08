package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.medicines.PrescriptionDto;
import isa.spring.boot.pharmacy.dto.schedule.AppointmentReportDto;
import isa.spring.boot.pharmacy.mapper.medicines.PrescriptionMapper;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;

import java.util.ArrayList;
import java.util.List;

public class AppointmentReportMapper {

    public static AppointmentReport convertToEntity(AppointmentReportDto appointmentReportDto) {
        AppointmentReport appointmentReport = new AppointmentReport();

        appointmentReport.setDescription(appointmentReportDto.getDescription());
        appointmentReport.setAppointment(AppointmentMapper.convertToEntity(appointmentReportDto.getAppointment()));

        return appointmentReport;
    }
}
