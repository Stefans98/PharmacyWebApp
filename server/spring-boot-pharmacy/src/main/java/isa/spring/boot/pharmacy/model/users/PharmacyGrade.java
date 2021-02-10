package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;

@Entity
@Table(name="pharmacy_grade")
@DiscriminatorValue("PHARMACY_GRADE")
public class PharmacyGrade extends Grade {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    public PharmacyGrade() {
    }

    public PharmacyGrade(int grade, Patient patient, Pharmacy pharmacy) {
        super(grade, patient);
        this.pharmacy = pharmacy;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }
}
