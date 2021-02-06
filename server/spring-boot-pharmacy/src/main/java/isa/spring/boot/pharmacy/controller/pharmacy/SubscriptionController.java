package isa.spring.boot.pharmacy.controller.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.pharmacy.SubscriptionDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.pharmacy.SubscriptionMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import isa.spring.boot.pharmacy.service.pharmacy.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping(value = "/subscribe", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<SubscriptionDto> subscribeToPharmacy(@RequestBody SubscriptionDto subscriptionDto)
    {
        Subscription subscription = subscriptionService.subscribeToPharmacy(subscriptionDto.getPharmacyId(),
                subscriptionDto.getPatientId());

        return new ResponseEntity<>(SubscriptionMapper.convertToDto(subscription), HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAllForPatient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<SubscriptionDto>> subscribeToPharmacy(@PathVariable Long patientId)
    {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptionsForPatient(patientId);
        List<SubscriptionDto> subscriptionDtos = new ArrayList<>();
        for (Subscription subscription : subscriptions) {
            subscriptionDtos.add(SubscriptionMapper.convertToDto(subscription));
        }
        return new ResponseEntity<>(subscriptionDtos, HttpStatus.OK);
    }

    @PutMapping(value = "/unsubscribe", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<Void> unsubscribeToPharmacy(@RequestBody SubscriptionDto subscriptionDto)
    {
        if (subscriptionService.findById(subscriptionDto.getId()) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        subscriptionService.unsubscribeToPharmacy(subscriptionDto.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
