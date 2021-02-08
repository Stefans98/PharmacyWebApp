package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.repository.medicines.PharmacyMedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PharmacyMedicineService {

    @Autowired
    private PharmacyMedicineRepository pharmacyMedicineRepository;

    @Autowired
    private MedicineService medicineService;

    public List<PharmacyMedicine> findAll() { return  pharmacyMedicineRepository.findAll(); }

    public Medicine isMedicineAvailable(Long medicineId, Long pharmacyId) {
        for(PharmacyMedicine pharmacyMedicine : pharmacyMedicineRepository.findAll()) {
            if(pharmacyMedicine.getPharmacy().getId() == pharmacyId && pharmacyMedicine.getMedicine().getId() == medicineId) {
                if(pharmacyMedicine.getQuantity() <= 0) {
                    return null;
                }
            }
        }
        return medicineService.findById(medicineId);
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

    public List<Pharmacy> getAllPharmaciesWithMedicine(String medicineCode) {
        List<Pharmacy> pharmacies = new ArrayList<>();
        for (PharmacyMedicine pm : this.findAll()) {
            if (pm.getMedicine().getCode().equals(medicineCode)) {
                pharmacies.add(pm.getPharmacy());
            }
        }
        return pharmacies;
    }

}
