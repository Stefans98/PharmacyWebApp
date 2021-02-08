package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineSpecification;

public class MedicineMapper {

    public static MedicineDto convertToDto(Medicine medicine) {
        MedicineDto dto = new MedicineDto();
        dto.setId(medicine.getId());
        dto.setName(medicine.getName());
        dto.setCode(medicine.getCode());
        dto.setManufacturer(medicine.getManufacturer());
        dto.setMedicineType(medicine.getMedicineType());
        if (medicine.getMedicineSpecification() != null) {
            dto.setMedicineSpecification(MedicineSpecificationMapper.convertToDto(medicine.getMedicineSpecification()));
        }
        return dto;
    }

    public static Medicine convertToEntity(MedicineDto dto) {
        Medicine medicine = new Medicine();
        medicine.setName(dto.getName());
        medicine.setCode(dto.getCode());
        medicine.setManufacturer(dto.getManufacturer());
        medicine.setMedicineType(dto.getMedicineType());
        medicine.setMedicineForm(dto.getMedicineForm());
        medicine.setOnPrescription(dto.isOnPrescription());
        medicine.setAdditionalInformation(dto.getAdditionalInformation());
        if (dto.getMedicineSpecification() != null) {
            medicine.setMedicineSpecification(MedicineSpecificationMapper.convertToEntity(dto.getMedicineSpecification()));
            medicine.getMedicineSpecification().setMedicine(medicine);
        }
        return medicine;
    }

}
