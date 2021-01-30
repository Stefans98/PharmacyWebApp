package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.repository.pharmacy.PharmacyRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private UserService userService;

    public List<Pharmacy> getAllPharmacies(){
        return pharmacyRepository.findAll();
    }

    public Pharmacy getPharmacyByPharmacyAdmin(Long pharmacyAdministartorId){
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator)userService.findById(pharmacyAdministartorId);
        return pharmacyAdministrator.getPharmacy();
    }

    public Pharmacy getPharmacyForPharmacist(Long pharmacistId) {
        for(Pharmacist pharmacist : userService.getAllPharmacists()) {
            if(pharmacist.getId() == pharmacistId) {
                return pharmacist.getPharmacy();
            }
        }
        return null;
    }

    public List<Pharmacy> getPharmaciesForDermatologist(Long dermatologistId) {
        for(Dermatologist dermatologist : userService.getAllDermatologists()) {
            if(dermatologist.getId() == dermatologistId) {
                return dermatologist.getPharmacies();
            }
        }
        return null;
    }


}
