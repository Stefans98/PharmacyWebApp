package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(String name);
}
