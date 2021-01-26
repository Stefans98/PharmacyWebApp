package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="pharmacy_administrators")
@DiscriminatorValue("PharmacyAdministrator")
public class PharmacyAdministrator extends User {

    private Pharmacy pharmacy;

    public PharmacyAdministrator() {
    }

    public PharmacyAdministrator(String email, String password, String firstName, String lastName, String phoneNumber, Pharmacy pharmacy) {
        super(email, password, firstName, lastName, phoneNumber);
        this.pharmacy = pharmacy;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }
}
