package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineReservationRepository extends JpaRepository<MedicineReservation, Long> {
}
