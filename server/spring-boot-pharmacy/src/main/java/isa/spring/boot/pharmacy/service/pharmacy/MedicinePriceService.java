package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.repository.pharmacy.MedicinePriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicinePriceService {

    @Autowired
    private MedicinePriceRepository medicinePriceRepository;

    public List<MedicinePrice> getAllMedicinePrices() {
        return medicinePriceRepository.findAll();
    }

    public double getMedicinePriceByMedicineId(Long medicineId) {
        for (MedicinePrice medicinePrice : medicinePriceRepository.findAll()){
           if (medicinePrice.getMedicine().getId() == medicineId){
               return medicinePrice.getPrice();
           }
        }
        return 0.0;
    }
}
