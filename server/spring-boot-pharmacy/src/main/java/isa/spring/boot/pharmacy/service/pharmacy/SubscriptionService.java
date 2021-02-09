package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.pharmacy.SubscriptionRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private UserService userService;

    public  Subscription findById(Long id) {
        return subscriptionRepository.getOne(id);
    }

    public Subscription subscribeToPharmacy(Long pharmacyId, Long patientId) {
        Subscription subscription = new Subscription();
        subscription.setCanceled(false);
        subscription.setPharmacy(pharmacyService.getPharmacyById(pharmacyId));
        subscription.setPatient((Patient) Hibernate.unproxy(userService.findById(patientId)));
        return subscriptionRepository.save(subscription);
    }

    public List<Subscription> getAllSubscriptionsForPatient(Long patientId) {
        List<Subscription> activeSubscriptions = new ArrayList<>();
        for (Subscription subscription : subscriptionRepository.findByPatientId(patientId)) {
            if (!subscription.isCanceled()) {
                activeSubscriptions.add(subscription);
            }
        }
        return activeSubscriptions;
    }

    public void unsubscribeToPharmacy(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.getOne(subscriptionId);
        subscription.setCanceled(true);
        subscriptionRepository.save(subscription);
    }
}
