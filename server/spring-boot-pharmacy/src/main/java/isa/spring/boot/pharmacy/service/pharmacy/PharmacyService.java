package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.repository.pharmacy.PharmacyRepository;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private MedicinePriceService medicinePriceService;

    public List<Pharmacy> getAllPharmacies(){
        return pharmacyRepository.findAll();
    }

    public Pharmacy findById(long id) {
        return pharmacyRepository.findById(id);
    }

    public Pharmacy getPharmacyByPharmacyAdmin(Long pharmacyAdministratorId) {
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) userService.findById(pharmacyAdministratorId);

        return pharmacyAdministrator.getPharmacy();
    }

    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public List<Pharmacy> getPharmaciesByMedicineId(Long medicineId){
        Medicine medicine = medicineService.findById(medicineId);
        List<Pharmacy> pharmacies = new ArrayList<Pharmacy>();
        for(PharmacyMedicine pharmacyMedicine : medicine.getPharmacyMedicines()) {
            if(pharmacyMedicine.getMedicine().getId() == medicineId) {
                pharmacies.add(pharmacyMedicine.getPharmacy());
            }
        }
        return pharmacies;
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

    public double getMedicinePriceFromPharmacy(Long medicineId, Long pharmacyId) {
        Pharmacy pharmacy = findById(pharmacyId);
        for(PharmacyMedicine pharmacyMedicine : pharmacy.getPharmacyMedicines()) {
            if(pharmacyMedicine.getMedicine().getId() == medicineId) {
                return medicinePriceService.getMedicinePriceByMedicineId(medicineId);
            }
        }
        return 0.0;
    }

    public List<Pharmacy> findAll(){
        return pharmacyRepository.findAll();
    }

    public Pharmacy getPharmacyById(Long id){
        for(Pharmacy pharmacy : findAll()){
            if(pharmacy.getId() == id){
                return pharmacy;
            }
        }
        return null;
    }
}
