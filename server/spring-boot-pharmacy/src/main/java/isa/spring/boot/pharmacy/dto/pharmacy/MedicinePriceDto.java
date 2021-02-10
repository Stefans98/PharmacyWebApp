package isa.spring.boot.pharmacy.dto.pharmacy;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;

import javax.persistence.*;
import java.util.Date;

public class MedicinePriceDto {

    private Long id;
    private double price;
    private Date startTime;
    private Date endTime;
        private MedicineDto medicine;

    public MedicinePriceDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public MedicineDto getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineDto medicine) {
        this.medicine = medicine;
    }
}
