package isa.spring.boot.pharmacy.repository.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    Pharmacy findById(long id);
}
