package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;

public class MedicineMapper {

    public static MedicineDto convertToDto(Medicine medicine) {
        MedicineDto dto = new MedicineDto();
        dto.setId(medicine.getId());
        dto.setName(medicine.getName());
        dto.setCode(medicine.getCode());
        dto.setManufacturer(medicine.getManufacturer());
        dto.setMedicineType(medicine.getMedicineType());
        return dto;
    }

    public static Medicine convertToEntity(MedicineDto dto) {
        Medicine medicine = new Medicine();
        medicine.setName(dto.getName());
        medicine.setCode(dto.getCode());
        return medicine;
    }

}
