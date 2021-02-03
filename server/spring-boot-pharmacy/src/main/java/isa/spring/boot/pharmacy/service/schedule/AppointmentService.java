package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.*;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
import isa.spring.boot.pharmacy.repository.schedule.WorkDayRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    public List<Appointment> getAllOccupiedAppointmentsForPharmacist(Long pharmacistId) {
        List<Appointment> occupiedAppointmentsForPharmacist = new ArrayList<Appointment>();
        for(Appointment appointment : getPharmacistCounselings()) {
            if(appointment.getWorkDay().getEmployee().getId() == pharmacistId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED) {
                occupiedAppointmentsForPharmacist.add(appointment);
            }
        }
        return occupiedAppointmentsForPharmacist;
    }

    public List<Appointment> getAllOccupiedAppointmentsForDermatologist(Long dermatologistId) {
        List<Appointment> occupiedAppointmentsForDermatologist = new ArrayList<Appointment>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getWorkDay().getEmployee().getId() == dermatologistId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED) {
                occupiedAppointmentsForDermatologist.add(appointment);
            }
        }
        return occupiedAppointmentsForDermatologist;
    }

    public Appointment scheduleAppointment(Appointment appointment, Long patientId, Long workDayId) {
        if(!isAppointmentFreeToSchedule(appointment, getAllOccupiedAppointmentsForPatient(patientId))) {
            return null;
        }

        User user = userService.findById(workDayService.findById(workDayId).getEmployee().getId());
        if(user.getDiscriminatorValue().equals("PHARMACIST")) {
            if(!isAppointmentFreeToSchedule(appointment, getAllOccupiedAppointmentsForPharmacist(user.getId())) ||
                !isEmployeeWorkDayValid(appointment, user.getId())) {
                return null;
            }
        } else if(user.getDiscriminatorValue().equals("DERMATOLOGIST")) {
            if(!isAppointmentFreeToSchedule(appointment, getAllOccupiedAppointmentsForDermatologist(user.getId())) ||
                !isEmployeeWorkDayValid(appointment, user.getId())) {
                return null;
            }
        }
        appointment.setPatient((Patient)userService.findById(patientId));
        appointment.setWorkDay(workDayService.findById(workDayId));
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return savedAppointment;
    }

    public boolean isAppointmentFreeToSchedule(Appointment newAppointment, List<Appointment> occupiedAppointments) {
        Date startNew = newAppointment.getStartTime();
        Date endNew = newAppointment.getEndTime();
        Date startOccupied, endOccupied;
        for(Appointment occupiedAppointment : occupiedAppointments) {
            startOccupied = occupiedAppointment.getStartTime();
            endOccupied = occupiedAppointment.getEndTime();
            if((startNew.compareTo(startOccupied) <= 0 && ((endNew.compareTo(startOccupied) >= 0 && endNew.compareTo(endOccupied) <= 0) || (endNew.compareTo(startOccupied) >= 0 && endNew.compareTo(endOccupied) >= 0))) ||
                    (startNew.compareTo(startOccupied) >= 0 && startNew.compareTo(endOccupied) <= 0)) {
                return false;
            }
        }
        return true;
    }

    public boolean isEmployeeWorkDayValid(Appointment newAppointment, Long employeeId) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Employee employee = (Employee) userService.findById(employeeId);
        for(WorkDay workDay : employee.getWorkDays()) {
            if(sdf.format(newAppointment.getStartTime()).equals(sdf.format(workDay.getStartTime()))) {
                if(newAppointment.getStartTime().compareTo(workDay.getStartTime()) >= 0 &&
                    newAppointment.getEndTime().compareTo(workDay.getEntTime()) <= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    public List<Appointment> findOccupiedAppointmentsByPatientEmail(String patientEmail, Long employeeId) {
        List<Appointment> occupiedExaminations = new ArrayList<Appointment>();
        User user = userService.findByEmail(patientEmail);
        if(user != null) {
            if(user.getDiscriminatorValue().equals("PATIENT")) {
                Patient patient = (Patient) user;
                for(Appointment appointment : getAllOccupiedAppointmentsForPatient(patient.getId())) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
                    if(appointment.getWorkDay().getEmployee().getId() == employeeId &&
                            sdf.format(appointment.getStartTime()).equals(sdf.format(new Date()))) {
                        occupiedExaminations.add(appointment);
                    }
                }
                return occupiedExaminations;
            }
        }
        return null;
    }

    public Appointment patientNotHeldOnAppointment(Appointment appointment, Long patientId, Long workDayId) {
        userService.givePenaltyToPatient(patientId);
        appointment.setAppointmentState(AppointmentState.NOT_HELD);
        appointment.setPatient((Patient) userService.findById(patientId));
        appointment.setWorkDay(workDayService.findById(workDayId));
        return appointmentRepository.save(appointment);
    }

}
