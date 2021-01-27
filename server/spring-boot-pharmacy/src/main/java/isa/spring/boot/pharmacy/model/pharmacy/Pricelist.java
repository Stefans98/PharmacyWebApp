package isa.spring.boot.pharmacy.model.pharmacy;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="price_lists")
public class Pricelist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @OneToMany(mappedBy = "pricelist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicinePrice> medicinePrices;

    @OneToMany(mappedBy = "pricelist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AppointmentPrice> appointmentPrices;

    public Pricelist() {
    }

    public Pricelist(List<MedicinePrice> medicinePrices, List<AppointmentPrice> appointmentPrices) {
        this.medicinePrices = medicinePrices;
        this.appointmentPrices = appointmentPrices;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<MedicinePrice> getMedicinePrices() {
        return medicinePrices;
    }

    public void setMedicinePrices(List<MedicinePrice> medicinePrices) {
        this.medicinePrices = medicinePrices;
    }

    public List<AppointmentPrice> getAppointmentPrices() {
        return appointmentPrices;
    }

    public void setAppointmentPrices(List<AppointmentPrice> appointmentPrices) {
        this.appointmentPrices = appointmentPrices;
    }
}
