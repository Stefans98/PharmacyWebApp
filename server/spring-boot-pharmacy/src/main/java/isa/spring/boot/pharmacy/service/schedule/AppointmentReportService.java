package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.dto.schedule.AppointmentReportDto;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentReportRepository;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
import isa.spring.boot.pharmacy.service.medicines.PrescriptionService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentReportService {

    @Autowired
    private AppointmentReportRepository appointmentReportRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private WorkDayService workDayService;

    @Autowired
    private PrescriptionService prescriptionService;

    public AppointmentReport saveAppointmentReport(AppointmentReport appointmentReport, Long patientId, Long workDayId, List<Prescription> prescriptions) {
          Appointment finishedAppointment = appointmentReport.getAppointment();
          finishedAppointment.setAppointmentState(AppointmentState.FINISHED);
          finishedAppointment.setPatient((Patient) userService.findById(patientId));
          finishedAppointment.setWorkDay(workDayService.findById(workDayId));
          appointmentService.save(finishedAppointment);
          AppointmentReport savedAppointmentReport = appointmentReportRepository.save(appointmentReport);
          for(Prescription prescription : prescriptions) {
                Prescription existingPrescription = prescriptionService.findById(prescription.getId());
                existingPrescription.setAppointmentReport(savedAppointmentReport);
                prescriptionService.updatePrescription(existingPrescription);
          }
          return savedAppointmentReport;
    }

}
