package isa.spring.boot.pharmacy.repository.users;

import isa.spring.boot.pharmacy.model.users.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllergyRepository extends JpaRepository<Allergy, Long> {
    Allergy findByMedicineId(long medicineId);
}
