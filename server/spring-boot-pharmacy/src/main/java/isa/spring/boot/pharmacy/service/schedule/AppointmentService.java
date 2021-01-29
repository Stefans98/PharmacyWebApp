package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.*;
import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
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
    private UserService userService;

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

    // Vraca istoriju pregleda kod dermatologa za pacijenta (Samo pregledi)
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

}
