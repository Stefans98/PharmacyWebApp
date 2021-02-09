package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
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

    public double calculateAppointmentPrice(double price, String startTime, String endTime) {
        long diffSec = (convertDateStrToDate(endTime, "yyyy-MM-dd HH:mm").getTime() - convertDateStrToDate(startTime, "yyyy-MM-dd HH:mm").getTime()) / 1000;
        long minute = diffSec / 60;
        int priceMultiplier = (int)minute / 30;
        if ((int)minute % 30 != 0) {
            priceMultiplier += 1;
        }
        return priceMultiplier * price;
    }

    public Date convertDateStrToDate(String dateStr, String format) {
        SimpleDateFormat df = new SimpleDateFormat(format);
        Date date = new Date();
        try {
            date = df.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public Pricelist findPricelistForPharmacy(Long pharmacyId){
        for(Pricelist pricelist : pricelistRepository.findAll()){
            if(pricelist.getPharmacy().getId() == pharmacyId){
                return pricelist;
            }
        }
        return null;
    }

    public Pricelist save(Pricelist pricelist){
        return pricelistRepository.save(pricelist);
    }

}
