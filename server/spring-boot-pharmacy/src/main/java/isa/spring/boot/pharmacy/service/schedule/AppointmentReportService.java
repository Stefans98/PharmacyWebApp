package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentReportService {

    @Autowired
    AppointmentReportRepository appointmentReportRepository;

    public AppointmentReport saveAppointmentReport(Appointment appointment) {
        AppointmentReport appointmentReport = new AppointmentReport();
        appointmentReport.setAppointment(appointment);
        appointmentReport.setDescription(appointment.getAppointmentReport().getDescription());
        return appointmentReportRepository.save(appointmentReport);
    }

}
