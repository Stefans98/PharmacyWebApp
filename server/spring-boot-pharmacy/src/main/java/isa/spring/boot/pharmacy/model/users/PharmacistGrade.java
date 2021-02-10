package isa.spring.boot.pharmacy.model.users;

import javax.persistence.*;

@Entity
@Table(name="pharmacist_grade")
@DiscriminatorValue("PHARMACIST_GRADE")
public class PharmacistGrade extends Grade {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacist pharmacist;

    public PharmacistGrade() {
    }

    public PharmacistGrade(int grade, Patient patient, Pharmacist pharmacist) {
        super(grade, patient);
        this.pharmacist = pharmacist;
    }

    public Pharmacist getPharmacist() {
        return pharmacist;
    }

    public void setPharmacist(Pharmacist pharmacist) {
        this.pharmacist = pharmacist;
    }
}
