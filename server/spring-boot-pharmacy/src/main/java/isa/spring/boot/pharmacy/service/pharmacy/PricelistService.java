package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.repository.pharmacy.PricelistRepository;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@Service
public class PricelistService {

    @Autowired
    private PricelistRepository pricelistRepository;

    @Autowired
    private AppointmentPriceService appointmentPriceService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private MedicinePriceService medicinePriceService;

    @Autowired
    private PharmacyService pharmacyService;


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

    public Pricelist findById(Long id){
        for(Pricelist pricelist : pricelistRepository.findAll()){
            if(pricelist.getId() == id){
                return pricelist;
            }
        }
        return null;
    }

    public Pricelist save(Pricelist pricelist){

        Pricelist oldPriceList = findById(pricelist.getId());
        List<MedicinePrice> medicinePrices = new ArrayList<>();
        for(MedicinePrice medicinePrice : pricelist.getMedicinePrices()){
            Medicine medicine = medicineService.findById(medicinePrice.getMedicine().getId());
            MedicinePrice oldMedicinePrice = medicinePriceService.findById(medicinePrice.getId());
            oldMedicinePrice.setMedicine(medicine);
            oldMedicinePrice.setPricelist(pricelist);
            oldMedicinePrice.setPrice(medicinePrice.getPrice());
            oldMedicinePrice.setStartTime(medicinePrice.getStartTime());
            oldMedicinePrice.setEndTime(medicinePrice.getEndTime());
            medicinePrices.add(oldMedicinePrice);
        }

        /*List<AppointmentPrice> appointmentPrices = new ArrayList<>();
        for(AppointmentPrice appointmentPrice : pricelist.getAppointmentPrices()){
            //appointmentPriceService.save(appointmentPrice);
            AppointmentPrice oldAppointmentPrice = appointmentPriceService.findById(appointmentPrice.getId());
            appointmentPrices.add(oldAppointmentPrice);
        }
        pricelist.setAppointmentPrices(appointmentPrices);*/

        pricelist.setMedicinePrices(medicinePrices);
        return pricelistRepository.save(pricelist);
    }
}
