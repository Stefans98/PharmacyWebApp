package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.users.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    protected final Log LOGGER = LogFactory.getLog(getClass());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

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
        return userRepository.save(patient);
    }

    public Patient savePatient(Patient patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()), true);
        List<Authority> authorities = authorityService.findByName("PATIENT");
        patient.setAuthorities(authorities);

        return userRepository.save(patient);
    }

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
}
