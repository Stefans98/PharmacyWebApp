package isa.spring.boot.pharmacy.model.pharmacy;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    private Pharmacy pharmacy;
    private List<Promotion> promotions;

    public Subscription() {
    }

    public Subscription(Pharmacy pharmacy, List<Promotion> promotions) {
        this.pharmacy = pharmacy;
        this.promotions = promotions;
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

    public List<Promotion> getPromotions() {
        return promotions;
    }

    public void setPromotions(List<Promotion> promotions) {
        this.promotions = promotions;
    }
}
