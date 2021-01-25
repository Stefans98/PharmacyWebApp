package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.repository.users.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    protected final Log LOGGER = LogFactory.getLog(getClass());

    @Autowired
    private UserRepository userRepository;

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
}
