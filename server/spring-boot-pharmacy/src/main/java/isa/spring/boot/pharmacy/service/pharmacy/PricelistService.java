package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;
import isa.spring.boot.pharmacy.repository.pharmacy.PricelistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Date;

@Service
public class PricelistService {

    @Autowired
    private PricelistRepository pricelistRepository;

    @Autowired
    private AppointmentPriceService appointmentPriceService;

    public List<Pricelist> findByPharmacyId(Long pharmacyId) {
        return pricelistRepository.findByPharmacyId(pharmacyId);
    }

    public double getCounselingPriceByDateAndPharmacyId(String date, Long pharmacyId) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        for (Pricelist pricelist : findByPharmacyId(pharmacyId)) {
            AppointmentPrice appointmentPrice = appointmentPriceService.getCounselingPriceByExpirationDateAndPricelistId(sdf.parse(date), pricelist.getId());
            if (appointmentPrice != null){
                return appointmentPrice.getPrice();
            }
        }
        return 0.0;
    }

}
