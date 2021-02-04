package isa.spring.boot.pharmacy.model.users;

import javax.persistence.*;

@Entity
@Table(name="pharmacist_complaint")
@DiscriminatorValue("PHARMACIST_COMPLAINT")
public class PharmacistComplaint extends Complaint {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacist pharmacist;

    public PharmacistComplaint() {
    }

    public PharmacistComplaint(String text, Patient patient, Pharmacist pharmacist) {
        super(text, patient);
        this.pharmacist = pharmacist;
    }

    public Pharmacist getPharmacist() {
        return pharmacist;
    }

    public void setPharmacist(Pharmacist pharmacist) {
        this.pharmacist = pharmacist;
    }
}
