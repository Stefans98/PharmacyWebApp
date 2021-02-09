package isa.spring.boot.pharmacy.repository.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PricelistRepository extends JpaRepository<Pricelist, Long> {
    List<Pricelist> findByPharmacyId(Long pharmacyId);
}
