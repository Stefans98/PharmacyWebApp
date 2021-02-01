package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferRepository extends JpaRepository<Offer, Long> {
}
