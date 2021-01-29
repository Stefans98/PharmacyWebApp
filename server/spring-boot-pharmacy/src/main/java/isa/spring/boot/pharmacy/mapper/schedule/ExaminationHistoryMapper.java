package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.ExaminationHistoryDto;
import isa.spring.boot.pharmacy.model.schedule.Appointment;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class ExaminationHistoryMapper {

    public static ExaminationHistoryDto convertToDto(Appointment appointment) {

        ExaminationHistoryDto dto = new ExaminationHistoryDto();

        dto.setPatientFullName(appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
        dto.setDermatologisFullName(appointment.getWorkDay().getEmployee().getFirstName() + " " + appointment.getWorkDay().getEmployee().getLastName());
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy.");
        dto.setDateOfExamination(dateFormat.format(appointment.getWorkDay().getDate()));
        DateFormat timeFormat = new SimpleDateFormat("hh:mm");
        dto.setTimePeriodOfExamination(timeFormat.format(appointment.getStartTime()) + " - " + timeFormat.format(appointment.getEndTime()));

        return dto;
    }
}
