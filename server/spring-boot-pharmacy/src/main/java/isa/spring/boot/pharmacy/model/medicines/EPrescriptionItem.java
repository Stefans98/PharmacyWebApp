package isa.spring.boot.pharmacy.model.medicines;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="e_prescription_items")
public class EPrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    private Medicine medicine;

    public EPrescriptionItem() {
    }

    public EPrescriptionItem(int quantity, Medicine medicine) {
        this.quantity = quantity;
        this.medicine = medicine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }
}
