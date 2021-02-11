package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionDto;
import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionItemDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.users.PatientMapper;
import isa.spring.boot.pharmacy.mapper.users.PharmacistMapper;
import isa.spring.boot.pharmacy.model.medicines.EPrescription;
import isa.spring.boot.pharmacy.model.medicines.EPrescriptionItem;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EPrescriptionMapper {

    public static EPrescriptionDto convertToDto(EPrescription ePrescription) {
        EPrescriptionDto dto = new EPrescriptionDto();

        dto.setId(ePrescription.getId());
        dto.setCode(ePrescription.getCode());
        dto.setPrice(ePrescription.getPrice());
        dto.setIssuingDate(ePrescription.getIssuingDate());
        dto.setPatient(PatientMapper.convertToDto(ePrescription.getPatient()));
        dto.setPharmacy(PharmacyMapper.convertToDto(ePrescription.getPharmacy()));
        dto.setePrescriptionState(ePrescription.getePrescriptionState());

        List<EPrescriptionItemDto> itemDtos = new ArrayList<>();
        for (EPrescriptionItem item : ePrescription.getePrescriptionItems()) {
            itemDtos.add(EPrescriptionItemMapper.convertToDto(item));
        }
        dto.setItems(itemDtos);

        return dto;
    }

    public static EPrescription convertToEntity(EPrescriptionDto dto) {
        EPrescription ePrescription = new EPrescription();

        ePrescription.setCode("123");
        ePrescription.setPrice(dto.getPrice());
        ePrescription.setIssuingDate(new Date());

        return ePrescription;
    }
}
