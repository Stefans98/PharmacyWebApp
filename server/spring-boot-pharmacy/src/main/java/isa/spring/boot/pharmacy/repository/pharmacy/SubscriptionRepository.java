package isa.spring.boot.pharmacy.repository.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByPatientId(Long patientId);
}
