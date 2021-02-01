package isa.spring.boot.pharmacy.repository.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicinePriceRepository extends JpaRepository<MedicinePrice, Long> {
}
