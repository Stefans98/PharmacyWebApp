package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.*;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.text.DateFormat;
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

    public Appointment save(Appointment appointment) { return  appointmentRepository.save(appointment); }

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

    public List<Appointment> getExaminationsForDermatologistWorkCalendar(Long dermatologistId) {
        List<Appointment> dermatologistExaminations = new ArrayList<Appointment>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getWorkDay().getEmployee().getId() == dermatologistId) {
                dermatologistExaminations.add(appointment);
            }
        }
        return dermatologistExaminations;
    }

    public List<Appointment> getCounselingsForPharmacistWorkCalendar(Long pharmacistId) {
        List<Appointment> pharmacistCounselings = new ArrayList<Appointment>();
        for(Appointment appointment : getPharmacistCounselings()) {
            if(appointment.getWorkDay().getEmployee().getId() == pharmacistId) {
                pharmacistCounselings.add(appointment);
            }
        }
        return pharmacistCounselings;
    }

    public List<Appointment> getExaminationsHistoryForPatient(long patientId) {
        List<Appointment> dermatologistExaminationsForPatient = new ArrayList<>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.FINISHED) {
                dermatologistExaminationsForPatient.add(appointment);
            }
        }
        return dermatologistExaminationsForPatient;
    }

    public List<Appointment> getCounselingsHistoryForPatient(long patientId) {
        List<Appointment> pharmacistCounselingsForPatient = new ArrayList<Appointment>();
        for (Appointment appointment : getPharmacistCounselings()) {
            if (appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.FINISHED) {
                pharmacistCounselingsForPatient.add(appointment);
            }
        }
        return pharmacistCounselingsForPatient;
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

    public List<Appointment> getScheduledCounselingForPatient(long patientId) {
        List<Appointment> pharmacistCounselingsForPatient = new ArrayList<>();
        for(Appointment appointment : getPharmacistCounselings()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED
                    && appointment.getStartTime().compareTo(new Date()) >= 0) {
                pharmacistCounselingsForPatient.add(appointment);
            }
        }
        return pharmacistCounselingsForPatient;
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

    public List<Appointment> getAllAvailableExaminationTermsForDermatologist(Long dermatologistId) {
        List<Appointment> availableExaminationTermsForDermatologist = new ArrayList<Appointment>();
        for(Appointment appointment : getDermatologistExaminations()) {
            if(appointment.getWorkDay().getEmployee().getId() == dermatologistId &&
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
                    (appointment.getAppointmentState() == AppointmentState.AVAILABLE ||
                        appointment.getAppointmentState() == AppointmentState.CANCELED) &&
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

    public List<Appointment> getAllOccupiedAppointmentsForPatient(long patientId) {
        List<Appointment> occupiedAppointmentsForPatient = new ArrayList<Appointment>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getAppointmentState() == AppointmentState.OCCUPIED) {
                occupiedAppointmentsForPatient.add(appointment);
            }
        }
        return occupiedAppointmentsForPatient;
    }

    public List<Appointment> getOccupiedAvailableNotHeldAppointmentsForPatient(long patientId) {
        List<Appointment> appointments = new ArrayList<>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getPatient().getId() == patientId &&
                    (appointment.getAppointmentState() == AppointmentState.AVAILABLE ||
                            appointment.getAppointmentState() == AppointmentState.OCCUPIED ||
                                appointment.getAppointmentState() == AppointmentState.NOT_HELD)) {
                appointments.add(appointment);
            }
        }
        return appointments;
    }

    public List<Appointment> getAllCanceledAppointmentsForPatientByEmployee(long patientId, long workDayId) {
        List<Appointment> canceledAppointmentsForPatientByEmployee = new ArrayList<>();
        for(Appointment appointment : appointmentRepository.findAll()) {
            if(appointment.getPatient().getId() == patientId &&
                    appointment.getWorkDay().getId() == workDayId &&
                        appointment.getAppointmentState() == AppointmentState.CANCELED) {
                canceledAppointmentsForPatientByEmployee.add(appointment);
            }
        }
        return canceledAppointmentsForPatientByEmployee;
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
            appointment.setAppointmentState(AppointmentState.CANCELED);
            appointmentRepository.save(appointment);
            return true;
        }
        return false;
    }

    public Appointment scheduleAppointment(Appointment appointment, Long patientId, Long workDayId) {
        if(!isAppointmentFreeToSchedule(appointment, getAllOccupiedAppointmentsForPatient(patientId))
                || !isAppointmentFreeToSchedule(appointment, getAllCanceledAppointmentsForPatientByEmployee(patientId, workDayId))
                    || userService.getPenaltiesByPatientId(patientId) > 2) {
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
        appointment.setAppointmentState(AppointmentState.OCCUPIED);
        return appointmentRepository.save(appointment);
    }

    public void checkIfPatientGotPenaltyForAppointmentsThisMonth(long patientId) {
        for (Appointment appointment : getOccupiedAvailableNotHeldAppointmentsForPatient(patientId)) {
            if (isAppointmentInThePast(appointment)
                    && isPatientDeservesPenalty(appointment)) {
                givePenaltyToPatient(appointment);
            }
        }
    }

    public boolean isPatientDeservesPenalty(Appointment appointment) {
        return !appointment.isGotPenalty();
    }

    public boolean isAppointmentInThePast(Appointment appointment) {
        if (appointment.getStartTime().before(new Date()) ) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            if (!sdf.format(appointment.getStartTime()).equals(sdf.format(new Date()))) {
                return appointment.getStartTime().compareTo(getFirstDateInCurrentMonth()) >= 0;
            } else {
                return true;
            }
        }
        return false;
    }

    private Date getFirstDateInCurrentMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        calendar.set(Calendar.MILLISECOND,0);
        return calendar.getTime();
    }

    private void givePenaltyToPatient(Appointment appointment) {
        appointment.setGotPenalty(true);
        appointmentRepository.save(appointment);
        userService.givePenaltyToPatient(appointment.getPatient().getId());
    }

    public List<Appointment> getAllCompletedAppointmentsForPatient(Long patientId) {
        List<Appointment> counselings = getCounselingHistoryForPatient(patientId);
        List<Appointment> examinations = getExaminationsHistoryForPatient(patientId);
        counselings.addAll(examinations);
        return counselings;
    }

    public boolean isAppointmentFreeToSchedule(Appointment newAppointment, List<Appointment> appointments) {
        Date startNew = newAppointment.getStartTime();
        Date endNew = newAppointment.getEndTime();
        Date startOld, endOld;
        for(Appointment appointment : appointments) {
            startOld = appointment.getStartTime();
            endOld = appointment.getEndTime();
            if((startNew.compareTo(startOld) <= 0 && ((endNew.compareTo(startOld) >= 0 && endNew.compareTo(endOld) <= 0) || (endNew.compareTo(startOld) >= 0 && endNew.compareTo(endOld) >= 0))) ||
                    (startNew.compareTo(startOld) >= 0 && startNew.compareTo(endOld) <= 0)) {
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
            "<br><br>Napomena: Ukoliko ne otkažete pregled 24h ranije ili se ne pojavite na istom, broj penala na Vašem nalogu će se povećati za 1. <br>" +
             "Ako dobijete više od 2 penala u trenutnom mesecu, gubite pravo rezervacije leka, kao i zakazivanja savetovanja i pregleda za taj mesec!" +
            "<br><br>S poštovanjem, <br>Health Pharmacy");
    }

    public void sendEmailForCounseling(Appointment appointment) {
        emailService.sendEmailAsync(appointment.getPatient(), "Zakazivanje savetovanja",
            "Poštovani/-a, <br><br> Uspešno ste zakazali savetovanje! <br><br> <b>Osnovne informacije o savetovanju:</b>" +
            "<br>- Datum savetovanja: " + convertToDateStr(appointment.getStartTime()) +
            "<br>- Vreme savetovanja: " + convertToTimeStr(appointment.getStartTime()) + " - " + convertToTimeStr(appointment.getEndTime()) +
            "<br>- Cena savetovanja: " + appointment.getPrice() + " RSD"+
            "<br>- Farmaceut: " + appointment.getWorkDay().getEmployee().getFirstName() + " " + appointment.getWorkDay().getEmployee().getLastName() +
            "<br>- Apoteka: " + appointment.getWorkDay().getPharmacy().getName() +
            "<br><br>Napomena: Ukoliko ne otkažete savetovanje 24h ranije ili se ne pojavite na istom, broj penala na Vašem nalogu će se povećati za 1. <br>" +
            "Ako dobijete više od 2 penala u trenutnom mesecu, gubite pravo rezervacije leka, kao i zakazivanja savetovanja i pregleda za taj mesec!" +
            "<br><br>S poštovanjem, <br>Health Pharmacy");
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
