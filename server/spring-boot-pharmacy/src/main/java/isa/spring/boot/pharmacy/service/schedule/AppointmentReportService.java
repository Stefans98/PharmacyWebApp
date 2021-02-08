package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentReportService {

    @Autowired
    AppointmentReportRepository appointmentReportRepository;

    @Autowired
    AppointmentService appointmentService;


    public AppointmentReport saveAppointmentReport(Appointment appointment) {
        AppointmentReport appointmentReport = new AppointmentReport();
        appointment.setAppointmentState(AppointmentState.FINISHED);
        Appointment finishedAppointment = appointmentService.save(appointment);
        appointmentReport.setAppointment(finishedAppointment);
        appointmentReport.setDescription(appointment.getAppointmentReport().getDescription()); // IZMENI
        return appointmentReportRepository.save(appointmentReport);
    }

}
