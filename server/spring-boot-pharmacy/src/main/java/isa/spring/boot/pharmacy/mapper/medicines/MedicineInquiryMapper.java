package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineInquiryDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.EmployeeMapper;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineInquiry;

public class MedicineInquiryMapper {

    public static MedicineInquiryDto convertToDto(MedicineInquiry medicineInquiry) {
        MedicineInquiryDto dto = new MedicineInquiryDto();
        dto.setPharmacy(PharmacyMapper.convertToDto(medicineInquiry.getPharmacy()));
        dto.setEmployee(EmployeeMapper.convertToDto(medicineInquiry.getEmployee()));
        dto.setMedicine(MedicineMapper.convertToDto(medicineInquiry.getMedicine()));
        return dto;
    }
}
