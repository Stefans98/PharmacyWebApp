package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.*;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.text.DateFormat;
import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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

    @Autowired
    private EmailService emailService;

    public Appointment findById(long id) {
        return appointmentRepository.findById(id);
    }

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

    public List<Appointment> getScheduledExaminationForPatient(long patientId) {
        List<Appointment> dermatologistExaminationsForPatient = new ArrayList<>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED
                        && appointment.getStartTime().compareTo(new Date()) >= 0) {
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
        return availableExaminationTermsForDermatologist;
    }

    public List<Appointment> getAvailableExaminationTermsForPharmacy(long pharmacyId) {
        List<Appointment> availableExaminationTermsForPharmacy = new ArrayList<>();
        for (Appointment appointment : getDermatologistExaminations()) {
            if (appointment.getWorkDay().getPharmacy().getId() == pharmacyId &&
                    appointment.getAppointmentState() == AppointmentState.AVAILABLE &&
                        appointment.getStartTime().compareTo(new Date()) >= 0) {
                availableExaminationTermsForPharmacy.add(appointment);
            }
        }
        return availableExaminationTermsForPharmacy;
    }

    public List<Appointment> getOccupiedCounselingTermsForPharmacyByDate(long pharmacyId, Date reservationDate) {
        List<Appointment> occupiedCounselingTermsForPharmacy = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        for (Appointment appointment : getPharmacistCounselings()) {
            if (appointment.getWorkDay().getPharmacy().getId() == pharmacyId
                    && appointment.getAppointmentState() == AppointmentState.OCCUPIED
                        && appointment.getStartTime().compareTo(new Date()) >= 0
                            && sdf.format(appointment.getStartTime()).equals(sdf.format(reservationDate))) {
                occupiedCounselingTermsForPharmacy.add(appointment);
            }
        }
        return occupiedCounselingTermsForPharmacy;
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

    public boolean cancelExamination(Appointment appointment) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, 1);

        if(calendar.getTime().before(appointment.getStartTime())) {
            appointment.setAppointmentState(AppointmentState.AVAILABLE);
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
    }

    public Appointment scheduleAppointment(Appointment appointment, Long patientId, Long workDayId) {
        if(findById(appointment.getId()) == null) {
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
        }

        appointment.setPatient((Patient)userService.findById(patientId));
        appointment.setWorkDay(workDayService.findById(workDayId));
        appointment.setAppointmentState(AppointmentState.OCCUPIED);
        try {
            if(appointment.getAppointmentType() == AppointmentType.EXAMINATION) {
                sendEmailForExamination(appointment);
            }
        } catch( Exception ignored ){}
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllCompletedAppointmentsForPatient(Long patientId) {
        List<Appointment> counselings = getCounselingHistoryForPatient(patientId);
        List<Appointment> examinations = getExaminationsHistoryForPatient(patientId);
        counselings.addAll(examinations);
        return counselings;
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

    public void sendEmailForExamination(Appointment appointment) {
        emailService.sendEmailAsync(appointment.getPatient(), "Zakazivanje pregleda",
            "Poštovani/-a, <br><br> Uspešno ste zakazali pregled! <br><br> <b>Osnovne informacije o pregledu:</b>" +
           "<br>- Datum pregleda: " + convertToDateStr(appointment.getStartTime()) +
            "<br>- Vreme pregleda: " + convertToTimeStr(appointment.getStartTime()) + " - " + convertToTimeStr(appointment.getEndTime()) +
            "<br>- Cena pregleda: " + appointment.getPrice() + " RSD"+
            "<br>- Dermatolog: " + appointment.getWorkDay().getEmployee().getFirstName() + " " + appointment.getWorkDay().getEmployee().getLastName() +
            "<br>- Apoteka: " + appointment.getWorkDay().getPharmacy().getName() +
            "<br><br>S poštovanjem, <br>Vaša ISA");
    }

    public static String convertToTimeStr(Date date) {
        DateFormat timeFormat = new SimpleDateFormat("HH:mm");
        return timeFormat.format(date);
    }

    public static String convertToDateStr(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy.");
        return sdf.format(date);
    }
}
