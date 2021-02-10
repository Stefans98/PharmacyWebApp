package isa.spring.boot.pharmacy.repository.medicines;


import isa.spring.boot.pharmacy.model.medicines.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long>  {
    Medicine findById(long id);

    Medicine findByCode(String code);
}
