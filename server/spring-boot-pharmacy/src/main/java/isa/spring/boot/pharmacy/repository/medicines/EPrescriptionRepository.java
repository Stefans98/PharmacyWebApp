package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionDto;
import isa.spring.boot.pharmacy.model.medicines.EPrescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EPrescriptionRepository extends JpaRepository<EPrescription, Long> {
    List<EPrescription> findByPatientId(Long patientId);
}
