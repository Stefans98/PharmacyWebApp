package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.PharmacyMedicineDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.model.medicines.PharmacyMedicine;

public class PharmacyMedicineMapper {

    public static PharmacyMedicineDto convertToDto(PharmacyMedicine pharmacyMedicine) {
        PharmacyMedicineDto pharmacyMedicineDto = new PharmacyMedicineDto();
        pharmacyMedicineDto.setId(pharmacyMedicine.getId());
        pharmacyMedicineDto.setPharmacy(PharmacyMapper.convertToDto(pharmacyMedicine.getPharmacy()));
        pharmacyMedicineDto.setMedicine(MedicineMapper.convertToDto(pharmacyMedicine.getMedicine()));
        pharmacyMedicineDto.setQuantity(pharmacyMedicine.getQuantity());
        return  pharmacyMedicineDto;
    }

    public static PharmacyMedicine convertToEntity(PharmacyMedicineDto pharmacyMedicineDto, Boolean exist) {
        PharmacyMedicine pharmacyMedicine = new PharmacyMedicine();
        if(exist){
            pharmacyMedicine.setId(pharmacyMedicineDto.getId());
        }
        pharmacyMedicine.setPharmacy(PharmacyMapper.convertToEntityWithId(pharmacyMedicineDto.getPharmacy()));
        pharmacyMedicine.setMedicine(MedicineMapper.convertToEntityWithId(pharmacyMedicineDto.getMedicine()));
        pharmacyMedicine.setQuantity(pharmacyMedicineDto.getQuantity());
        return  pharmacyMedicine;
    }

}
