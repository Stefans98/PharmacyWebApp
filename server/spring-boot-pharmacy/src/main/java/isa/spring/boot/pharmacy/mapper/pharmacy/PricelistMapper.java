package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.AppointmentPriceDto;
import isa.spring.boot.pharmacy.dto.pharmacy.MedicinePriceDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PricelistDto;
import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;

import java.util.ArrayList;
import java.util.List;

public class PricelistMapper {

    public static PricelistDto convertToDto(Pricelist pricelist){
        PricelistDto pricelistDto = new PricelistDto();

        pricelistDto.setId(pricelist.getId());
        List<MedicinePriceDto> medicinePriceDtos = new ArrayList<>();
        for(MedicinePrice medicinePrice : pricelist.getMedicinePrices()){
            medicinePriceDtos.add(MedicinePriceMapper.convertToDto(medicinePrice));
        }
        pricelistDto.setMedicinePrices(medicinePriceDtos);

        List<AppointmentPriceDto> appointmentPriceDtos = new ArrayList<>();
        for(AppointmentPrice appointmentPrice : pricelist.getAppointmentPrices()){
            appointmentPriceDtos.add(AppointmentPriceMapper.convertToDto(appointmentPrice));
        }
        pricelistDto.setAppointmentPrices(appointmentPriceDtos);
        pricelistDto.setPharmacy(PharmacyMapper.convertToDto(pricelist.getPharmacy()));

        return pricelistDto;
    }

    public static Pricelist convertToEntity(PricelistDto pricelistDto, Pharmacy pharmacy){
        Pricelist pricelist = new Pricelist();
        pricelist.setId(pricelistDto.getId());
        //pricelist.setPharmacy(PharmacyMapper.convertToEntityWithId(pricelistDto.getPharmacy()));
        pricelist.setPharmacy(pharmacy);

        List<MedicinePrice> medicinePrices = new ArrayList<>();
        for(MedicinePriceDto medicinePriceDto : pricelistDto.getMedicinePrices()){
            medicinePrices.add(MedicinePriceMapper.convertToEntity(medicinePriceDto));
        }
        pricelist.setMedicinePrices(medicinePrices);
        for(MedicinePrice medicinePrice : pricelist.getMedicinePrices()){
            medicinePrice.setPricelist(pricelist);
        }

        List<AppointmentPrice> appointmentPrices = new ArrayList<>();
        for(AppointmentPriceDto appointmentPriceDto : pricelistDto.getAppointmentPrices()){
            appointmentPrices.add(AppointmentPriceMapper.convertToEntity(appointmentPriceDto));
        }
        pricelist.setAppointmentPrices(appointmentPrices);
        for(AppointmentPrice appointmentPrice : pricelist.getAppointmentPrices()){
            appointmentPrice.setPricelist(pricelist);
        }

        return pricelist;
    }
}
