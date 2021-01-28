package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;

public class MedicineMapper {
    public static MedicineDto ConvertToDto(Medicine medicine) {
        MedicineDto dto = new MedicineDto();
        dto.setName(medicine.getName());
        dto.setCode(medicine.getCode());
        return dto;
    }

    public static Medicine ConvertToEntity(MedicineDto dto) {
        Medicine medicine = new Medicine();
        medicine.setName(dto.getName());
        medicine.setCode(dto.getCode());
        return medicine;
    }
}
