package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.ExaminationDto;
import isa.spring.boot.pharmacy.model.schedule.Appointment;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class ExaminationMapper {

    public static ExaminationDto convertToDto(Appointment appointment) {

        ExaminationDto dto = new ExaminationDto();

        dto.setId(appointment.getId());
        dto.setPatientFullName(appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName());
        dto.setDermatologistFullName(appointment.getWorkDay().getEmployee().getFirstName() + " " + appointment.getWorkDay().getEmployee().getLastName());
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy.");
        dto.setDateOfExamination(dateFormat.format(appointment.getStartTime().getTime()));
        DateFormat timeFormat = new SimpleDateFormat("HH:mm");
        dto.setTimePeriodOfExamination(timeFormat.format(appointment.getStartTime()) + " - " + timeFormat.format(appointment.getEndTime()));
        dto.setPharmacyName(appointment.getWorkDay().getPharmacy().getName());
        dto.setPrice(appointment.getPrice());
        dto.setAverageGrade(appointment.getWorkDay().getEmployee().getAverageGrade());

        return dto;
    }
}
