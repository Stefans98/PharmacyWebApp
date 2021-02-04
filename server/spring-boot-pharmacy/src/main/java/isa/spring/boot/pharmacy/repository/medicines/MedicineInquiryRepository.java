package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineInquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineInquiryRepository extends JpaRepository<MedicineInquiry, Long> {
}
