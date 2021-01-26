package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.users.Supplier;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "offer_state")
    private OfferState offerState;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "delivery_deadline", nullable = false)
    private Date deliveryDeadline;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Supplier supplier;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private MedicineOrderList medicineOrderList;

    public Offer() {
    }

    public Offer(OfferState offerState, double price, Date deliveryDeadline, Supplier supplier, MedicineOrderList medicineOrderList) {
        this.offerState = offerState;
        this.price = price;
        this.deliveryDeadline = deliveryDeadline;
        this.supplier = supplier;
        this.medicineOrderList = medicineOrderList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OfferState getOfferState() {
        return offerState;
    }

    public void setOfferState(OfferState offerState) {
        this.offerState = offerState;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getDeliveryDeadline() {
        return deliveryDeadline;
    }

    public void setDeliveryDeadline(Date deliveryDeadline) {
        this.deliveryDeadline = deliveryDeadline;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public MedicineOrderList getMedicineOrderLists() {
        return medicineOrderList;
    }

    public void setMedicineOrderLists(MedicineOrderList medicineOrderLists) {
        this.medicineOrderList = medicineOrderLists;
    }

    public MedicineOrderList getMedicineOrderList() {
        return medicineOrderList;
    }

    public void setMedicineOrderList(MedicineOrderList medicineOrderList) {
        this.medicineOrderList = medicineOrderList;
    }
}
