package isa.spring.boot.pharmacy.repository.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentPriceRepository extends JpaRepository<AppointmentPrice, Long> {
    List<AppointmentPrice> findByPricelistId(long pricelistId);
}
