package isa.spring.boot.pharmacy.model.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.Medicine;

import javax.persistence.*;

import java.util.Date;

@Entity
@Table(name="medicine_prices")
public class MedicinePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    private Date endTime;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Medicine medicine;

    // ***
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pricelist pricelist;

    public MedicinePrice() {
    }

    public MedicinePrice(double price, Medicine medicine, Date startTime, Date endTime) {
        this.price = price;
        this.medicine = medicine;
        this.startTime = startTime;
        this.endTime = endTime;
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

    public Pricelist getPricelist() {
        return pricelist;
    }

    public void setPricelist(Pricelist pricelist) {
        this.pricelist = pricelist;
    }
}
