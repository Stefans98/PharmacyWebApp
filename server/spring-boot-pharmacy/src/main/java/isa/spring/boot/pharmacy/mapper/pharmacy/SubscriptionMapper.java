package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.SubscriptionDto;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Subscription;

public class SubscriptionMapper {

    public static SubscriptionDto convertToDto(Subscription subscription) {
        SubscriptionDto dto = new SubscriptionDto();

        dto.setId(subscription.getId());
        dto.setPatient(PatientMapper.convertToDto(subscription.getPatient()));
        dto.setPharmacy(PharmacyMapper.convertToDto(subscription.getPharmacy()));

        return dto;
    }

}
