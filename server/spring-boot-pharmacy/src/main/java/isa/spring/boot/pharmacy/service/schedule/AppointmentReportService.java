package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentReportService {

    @Autowired
    AppointmentReportRepository appointmentReportRepository;

    public AppointmentReport save(AppointmentReport appointmentReport) {
        return appointmentReportRepository.save(appointmentReport);
    }

}
