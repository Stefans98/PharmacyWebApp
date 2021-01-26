package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Patient;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="medicine_reservation")
public class MedicineReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "final_purchasing_date", nullable = false)
    private Date finalPurchasingDate;

    @Column(name = "is_canceled", nullable = false)
    private boolean isCanceled;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Medicine medicine;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Patient patient;

    public MedicineReservation() {
    }

    public MedicineReservation(Date finalPurchasingDate, boolean isCanceled, Medicine medicine, Pharmacy pharmacy, Patient patient) {
        this.finalPurchasingDate = finalPurchasingDate;
        this.isCanceled = isCanceled;
        this.medicine = medicine;
        this.pharmacy = pharmacy;
        this.patient = patient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFinalPurchasingDate() {
        return finalPurchasingDate;
    }

    public void setFinalPurchasingDate(Date finalPurchasingDate) {
        this.finalPurchasingDate = finalPurchasingDate;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
