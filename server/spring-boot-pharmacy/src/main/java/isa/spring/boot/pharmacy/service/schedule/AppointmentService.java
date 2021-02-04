package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.*;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
import isa.spring.boot.pharmacy.repository.schedule.WorkDayRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentReportService appointmentReportService;

    @Autowired
    private UserService userService;

    @Autowired
    private WorkDayService workDayService;

    public List<Appointment> getDermatologistExaminations() {
        List<Appointment> dermatologistExaminations = new ArrayList<Appointment>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getAppointmentType() == AppointmentType.EXAMINATION) {
                dermatologistExaminations.add(appointment);
            }
        }
        return dermatologistExaminations;
    }

    public List<Appointment> getPharmacistCounselings() {
        List<Appointment> pharmacistCounselings = new ArrayList<Appointment>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getAppointmentType() == AppointmentType.COUNSELING) {
                pharmacistCounselings.add(appointment);
            }
        }
        return pharmacistCounselings;
    }

    // Vraca istoriju pregleda kod dermatologa za pacijenta
    public List<Appointment> getExaminationsHistoryForPatient(Long patientId) {
        List<Appointment> dermatologistExaminationsForPatient = new ArrayList<Appointment>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.FINISHED) {
                dermatologistExaminationsForPatient.add(appointment);
            }
        }
        return dermatologistExaminationsForPatient;
    }

    public List<Appointment> getCounselingHistoryForPatient(Long patientId) {
        List<Appointment> pharmacistCounselingsForPatient = new ArrayList<Appointment>();
        for(Appointment appointment : getPharmacistCounselings()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.FINISHED) {
                pharmacistCounselingsForPatient.add(appointment);
            }
        }
        return pharmacistCounselingsForPatient;
    }

    public List<Appointment> getAvailableExaminationTermsForDermatologist(Long dermatologistId, Long pharmacyId) {
        List<Appointment> availableExaminationTermsForDermatologist = new ArrayList<Appointment>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getWorkDay().getEmployee().getId() == dermatologistId &&
                    appointment.getWorkDay().getPharmacy().getId() == pharmacyId &&
                        appointment.getAppointmentState() == AppointmentState.AVAILABLE) {
                availableExaminationTermsForDermatologist.add(appointment);
            }
        }
        return  availableExaminationTermsForDermatologist;
    }

    public List<Appointment> getAllOccupiedAppointmentsForPatient(Long patientId) {
        List<Appointment> occupiedAppointmentsForPatient = new ArrayList<Appointment>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED) {
                occupiedAppointmentsForPatient.add(appointment);
            }
        }
        return occupiedAppointmentsForPatient;
    }

    public List<Appointment> getAllOccupiedAppointmentsForDermatologist(Long dermatologistId) {
        List<Appointment> occupiedAppointmentsForDermatologist = new ArrayList<Appointment>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getWorkDay().getEmployee().getId() == dermatologistId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED) {
                occupiedAppointmentsForDermatologist.add(appointment);
            }
        }
        return occupiedAppointmentsForDermatologist;
    }

    public Appointment scheduleAppointment(Appointment appointment, Long patientId, Long workDayId) {
        for(Appointment patientOccupiedAppointment : getAllOccupiedAppointmentsForPatient(appointment.getPatient().getId())) {
            if(appointment.getStartTime().after(patientOccupiedAppointment.getStartTime()) && appointment.getStartTime().before(patientOccupiedAppointment.getEndTime()) ||
                    appointment.getEndTime().before(patientOccupiedAppointment.getEndTime()) && appointment.getEndTime().before(patientOccupiedAppointment.getStartTime()) ||
                                appointment.getStartTime().before(patientOccupiedAppointment.getStartTime()) && appointment.getEndTime().after(patientOccupiedAppointment.getEndTime())) {
                return null;
            }
        }

        appointment.setPatient((Patient)userService.findById(patientId));
        appointment.setWorkDay(workDayService.findById(workDayId));
        Appointment savedAppointment = appointmentRepository.save(appointment);
        AppointmentReport appointmentReport = new AppointmentReport();
        appointmentReport.setAppointment(savedAppointment);
        appointmentReport.setDescription(appointment.getAppointmentReport().getDescription());
        appointmentReportService.save(appointmentReport);
        return savedAppointment;
    }

    public List<Appointment> getAllCompletedAppointmentsForPatient(Long patientId) {
        List<Appointment> counselings = getCounselingHistoryForPatient(patientId);
        List<Appointment> examinations = getExaminationsHistoryForPatient(patientId);
        counselings.addAll(examinations);
        return counselings;
    }
}
