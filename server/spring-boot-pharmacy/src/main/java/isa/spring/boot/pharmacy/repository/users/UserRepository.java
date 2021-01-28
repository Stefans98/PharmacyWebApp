package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findById(long id);
}
