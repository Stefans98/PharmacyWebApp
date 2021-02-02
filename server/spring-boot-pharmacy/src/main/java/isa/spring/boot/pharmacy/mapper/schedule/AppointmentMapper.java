package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.AppointmentDto;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.model.schedule.AppointmentType;

public class AppointmentMapper {

    public static AppointmentDto convertToDto(Appointment appointment) {

        AppointmentDto dto = new AppointmentDto();

        dto.setId(appointment.getId());
        dto.setStartTime(appointment.getStartTime());
        dto.setEndTime(appointment.getEndTime());
        dto.setPrice(appointment.getPrice());

        return dto;
    }

    public static Appointment convertToEntity(AppointmentDto appointmentDto) {

        Appointment appointment = new Appointment();

        if(appointmentDto.getId() != 0) { // Sa fronta se salje id 0 kada se menja postojeci objekat
            appointment.setId(appointmentDto.getId());
        }

        if(appointmentDto.getAppointmentType() == 0) {
            appointment.setAppointmentType(AppointmentType.EXAMINATION);
        } else if(appointmentDto.getAppointmentType() == 1) {
            appointment.setAppointmentType(AppointmentType.COUNSELING);
        }

        if(appointmentDto.getAppointmentState() == 0) {
            appointment.setAppointmentState(AppointmentState.AVAILABLE);
        } else if(appointmentDto.getAppointmentState() == 1) {
            appointment.setAppointmentState(AppointmentState.OCCUPIED);
        } else if(appointmentDto.getAppointmentState() == 2) {
            appointment.setAppointmentState(AppointmentState.CANCELED);
        } else if(appointmentDto.getAppointmentState() == 3) {
            appointment.setAppointmentState(AppointmentState.FINISHED);
        } else if(appointmentDto.getAppointmentState() == 4) {
            appointment.setAppointmentState(AppointmentState.NOT_HELD);
        }

        appointment.setPrice(appointmentDto.getPrice());
        appointment.setStartTime(appointmentDto.getStartTime());
        appointment.setEndTime(appointmentDto.getEndTime());

        return appointment;
    }
}
