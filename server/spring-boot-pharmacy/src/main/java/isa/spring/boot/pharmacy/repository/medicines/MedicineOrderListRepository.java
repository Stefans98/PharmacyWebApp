package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineOrderListRepository extends JpaRepository<MedicineOrderList, Long> {
}
