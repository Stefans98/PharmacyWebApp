package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
