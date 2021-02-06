package isa.spring.boot.pharmacy.mapper.schedule;

import isa.spring.boot.pharmacy.dto.schedule.AppointmentDto;
import isa.spring.boot.pharmacy.dto.schedule.WorkDayDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.model.schedule.AppointmentType;

public class AppointmentMapper {

    public static AppointmentDto convertToDto(Appointment appointment) {

        AppointmentDto dto = new AppointmentDto();

        dto.setId(appointment.getId());
        if(appointment.getAppointmentType() == AppointmentType.EXAMINATION) {
            dto.setAppointmentType(0);
        } else if (appointment.getAppointmentType() == AppointmentType.COUNSELING) {
            dto.setAppointmentType(1);
        }
        if(appointment.getAppointmentState() == AppointmentState.AVAILABLE) {
            dto.setAppointmentState(0);
        } else if(appointment.getAppointmentState() == AppointmentState.OCCUPIED) {
            dto.setAppointmentState(1);
        }  else if(appointment.getAppointmentState() == AppointmentState.FINISHED) {
            dto.setAppointmentState(2);
        } else if(appointment.getAppointmentState() == AppointmentState.NOT_HELD) {
            dto.setAppointmentState(3);
        }

        dto.setStartTime(appointment.getStartTime());
        dto.setEndTime(appointment.getEndTime());
        dto.setPrice(appointment.getPrice());
        dto.setPatient(PatientMapper.convertToDto(appointment.getPatient()));
        dto.setWorkDay(WorkDayMapper.convertToDto(appointment.getWorkDay()));

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
            appointment.setAppointmentState(AppointmentState.FINISHED);
        } else if(appointmentDto.getAppointmentState() == 3) {
            appointment.setAppointmentState(AppointmentState.NOT_HELD);
        }

        appointment.setPrice(appointmentDto.getPrice());
        appointment.setStartTime(appointmentDto.getStartTime());
        appointment.setEndTime(appointmentDto.getEndTime());

        return appointment;
    }
}
