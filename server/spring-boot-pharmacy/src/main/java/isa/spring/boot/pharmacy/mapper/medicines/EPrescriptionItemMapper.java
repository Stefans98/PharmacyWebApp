package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionDto;
import isa.spring.boot.pharmacy.dto.medicines.EPrescriptionItemDto;
import isa.spring.boot.pharmacy.model.medicines.EPrescriptionItem;

import java.util.HashMap;
import java.util.List;

public class EPrescriptionItemMapper {

    public static HashMap<String, Integer> convertEPrescriptionItemsToMap(List<EPrescriptionItemDto> dtos) {
        HashMap<String, Integer> result = new HashMap<>();
        for (EPrescriptionItemDto dto : dtos) {
            if (result.containsKey(dto.getMedicineCode())) {
                result.put(dto.getMedicineCode(), result.get(dto.getMedicineCode()) + dto.getQuantity());
            } else {
                result.put(dto.getMedicineCode(), dto.getQuantity());
            }
        }
        return result;
    }

    public static EPrescriptionItemDto convertToDto(EPrescriptionItem item) {
        EPrescriptionItemDto dto = new EPrescriptionItemDto();

        dto.setMedicineCode(item.getMedicine().getCode());
        dto.setMedicineName(item.getMedicine().getName());
        dto.setQuantity(item.getQuantity());

        return dto;
    }
}
