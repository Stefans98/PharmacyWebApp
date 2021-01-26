package isa.spring.boot.pharmacy.model.medicines;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="medicine_order_lists")
public class MedicineOrderList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "final_offer_date", nullable = false)
    private Date finalOfferDate;

    private List<OrderItem> orderItems;

    public MedicineOrderList() {
    }

    public MedicineOrderList(Date finalOfferDate, List<OrderItem> orderItems) {
        this.finalOfferDate = finalOfferDate;
        this.orderItems = orderItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFinalOfferDate() {
        return finalOfferDate;
    }

    public void setFinalOfferDate(Date finalOfferDate) {
        this.finalOfferDate = finalOfferDate;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
