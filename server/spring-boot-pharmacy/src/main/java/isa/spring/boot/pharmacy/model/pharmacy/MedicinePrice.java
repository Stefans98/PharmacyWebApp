package isa.spring.boot.pharmacy.model.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.schedule.TimePeriod;

import javax.persistence.*;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="medicine_prices")
public class MedicinePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "price", nullable = false)
    private double price;

    private Medicine medicine;
    private TimePeriod timePeriod;

    public MedicinePrice() {
    }

    public MedicinePrice(double price, Medicine medicine, TimePeriod timePeriod) {
        this.price = price;
        this.medicine = medicine;
        this.timePeriod = timePeriod;
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

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public TimePeriod getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(TimePeriod timePeriod) {
        this.timePeriod = timePeriod;
    }
}
