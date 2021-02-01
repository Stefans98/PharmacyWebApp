package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Medicine medicine;

    // ***
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private MedicineOrderList medicineOrderList;

    public OrderItem() {
    }

    public OrderItem(int quantity, Medicine medicine) {
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

    public MedicineOrderList getMedicineOrderList() {
        return medicineOrderList;
    }

    public void setMedicineOrderList(MedicineOrderList medicineOrderList) {
        this.medicineOrderList = medicineOrderList;
    }
}
