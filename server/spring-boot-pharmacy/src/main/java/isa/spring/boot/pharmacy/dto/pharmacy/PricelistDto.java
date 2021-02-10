package isa.spring.boot.pharmacy.dto.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.AppointmentPrice;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;
import java.util.List;

public class PricelistDto {

    private Long id;
    private PharmacyDto pharmacy;
    private List<MedicinePriceDto> medicinePrices;
    private List<AppointmentPriceDto> appointmentPrices;

    public PricelistDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PharmacyDto getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(PharmacyDto pharmacy) {
        this.pharmacy = pharmacy;
    }

    public List<MedicinePriceDto> getMedicinePrices() {
        return medicinePrices;
    }

    public void setMedicinePrices(List<MedicinePriceDto> medicinePrices) {
        this.medicinePrices = medicinePrices;
    }

    public List<AppointmentPriceDto> getAppointmentPrices() {
        return appointmentPrices;
    }

    public void setAppointmentPrices(List<AppointmentPriceDto> appointmentPrices) {
        this.appointmentPrices = appointmentPrices;
    }
}
