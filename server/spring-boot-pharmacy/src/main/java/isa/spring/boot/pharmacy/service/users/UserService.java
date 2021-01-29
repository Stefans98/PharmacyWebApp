package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentReport;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.repository.users.UserRepository;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    protected final Log LOGGER = LogFactory.getLog(getClass());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentService appointmentService;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) { return  userRepository.findByEmail(email); }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(s);
        if (user == null)
        {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", s));
        } else {
            return user;
        }
    }

    public Patient getPatientById(Long patientId){
        for(Patient patient : getAllPatients()) {
            if(patient.getId() == patientId) {
                return patient;
            }
        }
        return null;
    }


    public List<Patient> getAllPatients(){
        List<Patient> patientsForDermatologist = new ArrayList<Patient>();
        for(User user : userRepository.findAll()) {
            if(user instanceof Patient) {
                Patient patient = (Patient)user;
                patientsForDermatologist.add(patient);
            }
        }
        return patientsForDermatologist;
    }

    public Set<Patient> getPatientsForDermatologist(Long dermatologistId){
        Set<Patient> patientsForDermatologist = new HashSet<Patient>();
        for(Appointment appointment : appointmentService.getDermatologistExaminations()) {
            if(appointment.getWorkDay().getEmployee().getId() == dermatologistId &&
                    appointment.getAppointmentState() == AppointmentState.FINISHED) {
                patientsForDermatologist.add(appointment.getPatient());
            }
        }
        return patientsForDermatologist;
    }

}
