package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.repository.pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAllPharmacies(){
        return pharmacyRepository.findAll();
    }

    public Pharmacy getPharmacyByPharmacyAdmin(Long id){
        for(Pharmacy pharmacy : pharmacyRepository.findAll()){
           if(pharmacy.getPharmacyAdministrator().getId() == id){
               return pharmacy;
           }
        }
        return null;
    }
}
