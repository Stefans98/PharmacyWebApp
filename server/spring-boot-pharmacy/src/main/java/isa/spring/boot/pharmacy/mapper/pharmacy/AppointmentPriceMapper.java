package isa.spring.boot.pharmacy.mapper.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.AppointmentPriceDto;
import isa.spring.boot.pharmacy.dto.pharmacy.MedicinePriceDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineMapper;
import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.schedule.AppointmentType;

public class AppointmentPriceMapper {

    public static AppointmentPriceDto convertToDto(AppointmentPrice appointmentPrice){
        AppointmentPriceDto appointmentPriceDto = new AppointmentPriceDto();
        appointmentPriceDto.setId(appointmentPrice.getId());
        appointmentPriceDto.setPrice(appointmentPrice.getPrice());
        appointmentPriceDto.setStartTime(appointmentPrice.getStartTime());
        appointmentPriceDto.setEndTime(appointmentPrice.getEndTime());
        if(appointmentPrice.getAppointmentType() == AppointmentType.EXAMINATION){
            appointmentPriceDto.setAppointmentType(0);
        }else if(appointmentPrice.getAppointmentType() == AppointmentType.COUNSELING){
            appointmentPriceDto.setAppointmentType(1);
        }
        return appointmentPriceDto;
    }

    public static AppointmentPrice convertToEntity(AppointmentPriceDto appointmentPriceDto){
        AppointmentPrice appointmentPrice = new AppointmentPrice();
        appointmentPrice.setId(appointmentPriceDto.getId());
        appointmentPrice.setStartTime(appointmentPriceDto.getStartTime());
        appointmentPrice.setEndTime(appointmentPriceDto.getEndTime());
        if(appointmentPriceDto.getAppointmentType() == 0){
            appointmentPrice.setAppointmentType(AppointmentType.EXAMINATION);
        } else if(appointmentPriceDto.getAppointmentType() == 1){
            appointmentPrice.setAppointmentType(AppointmentType.COUNSELING);
        }
        appointmentPrice.setPrice(appointmentPriceDto.getPrice());
        return appointmentPrice;
    }
}
