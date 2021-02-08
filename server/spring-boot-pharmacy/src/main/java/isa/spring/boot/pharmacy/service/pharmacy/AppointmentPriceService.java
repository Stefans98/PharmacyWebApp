package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.schedule.AppointmentType;
import isa.spring.boot.pharmacy.repository.pharmacy.AppointmentPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AppointmentPriceService {

    @Autowired
    private AppointmentPriceRepository appointmentPriceRepository;

    public List<AppointmentPrice> findByPricelistId(long pricelistId) {
        return appointmentPriceRepository.findByPricelistId(pricelistId);
    }

    public AppointmentPrice getCounselingPriceByExpirationDateAndPricelistId(Date date, Long pricelistId) {
        for (AppointmentPrice appointmentPrice: findByPricelistId(pricelistId)) {
            if (appointmentPrice.getAppointmentType() == AppointmentType.COUNSELING
                    && appointmentPrice.getStartTime().compareTo(date) <= 0
                        && appointmentPrice.getEndTime().compareTo(date) >= 0) {
                return appointmentPrice;

            }
        }
        return null;
    }
}
