package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PharmacyMedicineRepository extends JpaRepository<PharmacyMedicine, Long> {
}
