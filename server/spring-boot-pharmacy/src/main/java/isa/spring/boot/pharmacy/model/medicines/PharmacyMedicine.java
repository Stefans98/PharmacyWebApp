package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;

@Entity
@Table(name="pharmacy_medicines")
public class PharmacyMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private Medicine medicine;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "deleted")
    private Boolean deleted;

    public PharmacyMedicine() {
    }

    public PharmacyMedicine(Pharmacy pharmacy, Medicine medicine, int quantity, Boolean deleted) {
        this.pharmacy = pharmacy;
        this.medicine = medicine;
        this.quantity = quantity;
        this.deleted = deleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
