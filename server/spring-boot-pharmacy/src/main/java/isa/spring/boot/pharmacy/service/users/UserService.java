package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.users.UserRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    protected final Log LOGGER = LogFactory.getLog(getClass());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return  userRepository.findByEmail(email);
    }

    public User findById(long id) {
        return userRepository.findById(id);
    }

    public Patient updatePatient(Patient patient) {
        if (patient.getPassword() == null || patient.getPassword().trim().isEmpty()) {
            String currentPassword = userRepository.getOne(patient.getId()).getPassword();
            patient.setPassword(currentPassword, false);
        } else {
            patient.setPassword(passwordEncoder.encode(patient.getPassword()), true);
        }
        patient.setAuthorities(authorityService.findByName("PATIENT"));
        return userRepository.save(patient);
    }

    public void givePenaltyToPatient(long patientId) {
        Patient patient = (Patient)findById(patientId);
        patient.setPenalty(patient.getPenalty() + 1);
        userRepository.save(patient);
    }

    public Pharmacist updatePharmacist(Pharmacist pharmacist) {
        if (pharmacist.getPassword() == null || pharmacist.getPassword().trim().isEmpty()) {
            String currentPassword = userRepository.getOne(pharmacist.getId()).getPassword();
            pharmacist.setPassword(currentPassword, false);
        } else {
            pharmacist.setPassword(passwordEncoder.encode(pharmacist.getPassword()), true);
        }
        pharmacist.setAuthorities(authorityService.findByName("PHARMACIST"));
        pharmacist.setPharmacy(pharmacyService.getPharmacyForPharmacist(pharmacist.getId()));
        return userRepository.save(pharmacist);
    }

    public Dermatologist updateDermatologist(Dermatologist dermatologist) {
        if (dermatologist.getPassword() == null || dermatologist.getPassword().trim().isEmpty()) {
            String currentPassword = userRepository.getOne(dermatologist.getId()).getPassword();
            dermatologist.setPassword(currentPassword, false);
        } else {
            dermatologist.setPassword(passwordEncoder.encode(dermatologist.getPassword()), true);
        }
        dermatologist.setAuthorities(authorityService.findByName("DERMATOLOGIST"));
        return userRepository.save(dermatologist);
    }

    public Supplier updateSupplier(Supplier supplier) {
        if (supplier.getPassword() == null || supplier.getPassword().trim().isEmpty()) {
            String currentPassword = userRepository.getOne(supplier.getId()).getPassword();
            supplier.setPassword(currentPassword, false);
        } else {
            supplier.setPassword(passwordEncoder.encode(supplier.getPassword()), true);
        }
        supplier.setAuthorities(authorityService.findByName("SUPPLIER"));
        return userRepository.save(supplier);

    }

    public Patient savePatient(Patient patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()), true);
        List<Authority> authorities = authorityService.findByName("PATIENT");
        patient.setAuthorities(authorities);

        return userRepository.save(patient);
    }

    public User saveDermatologist(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()), true);

        Dermatologist dermatologist = new Dermatologist(user);
        dermatologist.getAddress().setUser(dermatologist);
        List<Authority> authorities = authorityService.findByName("DERMATOLOGIST");
        dermatologist.setAuthorities(authorities);
        return userRepository.save(dermatologist);
    }

    public Supplier saveSupplier(Supplier supplier) {
        supplier.setPassword(passwordEncoder.encode(supplier.getPassword()), true);
        List<Authority> authorities = authorityService.findByName("SUPPLIER");
        supplier.setAuthorities(authorities);
        return userRepository.save(supplier);
    }

    public PharmacyAdministrator savePharmacyAdministrator(PharmacyAdministrator pharmacyAdministrator, Long pharmacyId) {
        pharmacyAdministrator.setPassword(passwordEncoder.encode(pharmacyAdministrator.getPassword()), true);
        pharmacyAdministrator.setPharmacy(pharmacyService.findById(pharmacyId));
        List<Authority> authorities = authorityService.findByName("PHARMACY_ADMIN");
        pharmacyAdministrator.setAuthorities(authorities);
        return userRepository.save(pharmacyAdministrator);
    }

    public User saveSystemAdministrator(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()), true);

        SystemAdministrator systemAdministrator = new SystemAdministrator(user);
        systemAdministrator.getAddress().setUser(systemAdministrator);
        List<Authority> authorities = authorityService.findByName("SYSTEM_ADMIN");
        systemAdministrator.setAuthorities(authorities);
        return userRepository.save(systemAdministrator);
    }

    public List<Dermatologist> getAllDermatologists(){
        List<Dermatologist> dermatologists = new ArrayList<Dermatologist>();
        for(User user : userRepository.findAll()) {
            if(user instanceof Dermatologist) {
                Dermatologist dermatologist = (Dermatologist)user;
                dermatologists.add(dermatologist);
            }
        }
        return dermatologists;
    }

    public List<Pharmacist> getAllPharmacists(){
        List<Pharmacist> pharmacists = new ArrayList<Pharmacist>();
        for(User user : userRepository.findAll()) {
            if(user instanceof Pharmacist) {
                Pharmacist pharmacist = (Pharmacist)user;
                pharmacists.add(pharmacist);
            }
        }
        return pharmacists;
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

    public Set<Patient> getPatientsForPharmacist(Long pharmacistId){
        Set<Patient> patientsForPharmacist = new HashSet<Patient>();
        for(Appointment appointment : appointmentService.getPharmacistCounselings()) {
            if(appointment.getWorkDay().getEmployee().getId() == pharmacistId && (
                    appointment.getAppointmentState() == AppointmentState.FINISHED ||
                        appointment.getAppointmentState() == AppointmentState.OCCUPIED)) {
                patientsForPharmacist.add(appointment.getPatient());
            }
        }
        return patientsForPharmacist;
    }
    
    public List<Dermatologist> getDermatologistsForPharmacy(Long pharmacyId){
        List<Dermatologist> dermatologists = new ArrayList<>();
        for(Dermatologist dermatologist : getAllDermatologists()){
            for(Pharmacy pharmacy : dermatologist.getPharmacies()){
                if(pharmacy.getId() == pharmacyId){
                    dermatologists.add(dermatologist);
                }
            }
        }
        return dermatologists;
    }

    public boolean checkIfAddressesMatch(Address first, Address second) {
        return first.getStreet().equals(second.getStreet()) && first.getCity().equals(second.getCity())
                    && first.getCountry().equals(second.getCountry());
    }

    public List<Pharmacist> getPharmacistsForPharmacy(Long pharmacyId){
        List<Pharmacist> pharmacists = new ArrayList<>();
        for(Pharmacist pharmacist : getAllPharmacists()){
            if(pharmacist.getPharmacy().getId() == pharmacyId) {
                pharmacists.add(pharmacist);
            }
        }
        return pharmacists;
    }

    public List<Dermatologist> getDermatologistsThatExaminedPatient(Long patientId) {
        List<Appointment> patientExaminations = appointmentService.getExaminationsHistoryForPatient(patientId);
        List<Dermatologist> dermatologists = new ArrayList<>();
        for (Appointment examination : patientExaminations) {
            for (Dermatologist dermatologist : getAllDermatologists()) {
                if (dermatologist.getId() == examination.getWorkDay().getEmployee().getId()) {
                    dermatologists.add(dermatologist);
                }
            }
        }
        return dermatologists;
    }

    public List<Pharmacist> getPharmacistThatCounselledPatient(Long patientId) {
        List<Appointment> patientCounselings = appointmentService.getCounselingHistoryForPatient(patientId);
        List<Pharmacist> pharmacists = new ArrayList<>();
        for (Appointment counselling : patientCounselings) {
            for (Pharmacist pharmacist : getAllPharmacists()) {
                if (pharmacist.getId() == counselling.getWorkDay().getEmployee().getId()) {
                    pharmacists.add(pharmacist);
                }
            }
        }
        return pharmacists;
    }

    public boolean isPatientAllergicToMedicine(long patientId, long medicineId) {
        Patient patient = (Patient)userRepository.findById(patientId);
        for(Allergy allergy : patient.getAllergies()) {
            if(allergy.getMedicine().getId() == medicineId) {
                return true;
            }
        }
        return false;
    }
}
