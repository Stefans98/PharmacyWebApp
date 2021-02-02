package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.repository.medicines.PharmacyMedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PharmacyMedicineService {

    @Autowired
    private PharmacyMedicineRepository pharmacyMedicineRepository;

    public boolean isMedicineAvailable(Long medicineId, Long pharmacyId) {
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId) {
                if(pharmacyMedicine.getQuantity() <= 0) {
                    return  false;
                }
            }
        }
        return true;
    }

    public void decrementMedicineQuantity(Long medicineId, Long pharmacyId) {
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId) {
                pharmacyMedicine.setQuantity(pharmacyMedicine.getQuantity() - 1);
                pharmacyMedicineRepository.save(pharmacyMedicine);
                return;
            }
        }
    }
}
