package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.AppointmentReportDto;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;

public class AppointmentReportMapper {

    public static AppointmentReport convertToEntity(AppointmentReportDto appointmentReportDto) {
        AppointmentReport appointmentReport = new AppointmentReport();

        appointmentReport.setDescription(appointmentReportDto.getDescription());

        return appointmentReport;
    }
}
