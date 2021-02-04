package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;

@Entity
@Table(name="pharmacy_complaint")
@DiscriminatorValue("PHARMACY_COMPLAINT")
public class PharmacyComplaint extends Complaint {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    public PharmacyComplaint() {
    }

    public PharmacyComplaint(String text, Patient patient, Pharmacy pharmacy) {
        super(text, patient);
        this.pharmacy = pharmacy;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }
}
