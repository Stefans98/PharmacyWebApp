package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.MedicinePriceDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PricelistDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;

public class MedicinePriceMapper {

    public static MedicinePriceDto convertToDto(MedicinePrice medicinePrice){
        MedicinePriceDto medicinePriceDto = new MedicinePriceDto();
        medicinePriceDto.setId(medicinePrice.getId());
        medicinePriceDto.setPrice(medicinePrice.getPrice());
        medicinePriceDto.setStartTime(medicinePrice.getStartTime());
        medicinePriceDto.setEndTime(medicinePrice.getEndTime());
        medicinePriceDto.setMedicine(MedicineMapper.convertToDto(medicinePrice.getMedicine()));
        return medicinePriceDto;
    }

    public static MedicinePrice convertToEntity(MedicinePriceDto medicinePriceDto){
        MedicinePrice medicinePrice = new MedicinePrice();
        medicinePrice.setId(medicinePriceDto.getId());
        medicinePrice.setStartTime(medicinePriceDto.getStartTime());
        medicinePrice.setEndTime(medicinePriceDto.getEndTime());
        medicinePrice.setMedicine(MedicineMapper.convertToEntityWithId(medicinePriceDto.getMedicine()));
        medicinePrice.setPrice(medicinePriceDto.getPrice());
        return medicinePrice;
    }
}
