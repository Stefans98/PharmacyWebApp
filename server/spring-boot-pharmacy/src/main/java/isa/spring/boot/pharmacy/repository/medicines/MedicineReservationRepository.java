package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineReservationRepository extends JpaRepository<MedicineReservation, Long> {
    MedicineReservation findById(long id);
    List<MedicineReservation> findByPatientId(long patientId);
}
