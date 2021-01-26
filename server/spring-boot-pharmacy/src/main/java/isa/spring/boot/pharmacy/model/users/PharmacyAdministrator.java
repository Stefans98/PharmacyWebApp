package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("PharmacyAdministrator")
public class PharmacyAdministrator extends User {

    private Pharmacy pharmacy;

    public PharmacyAdministrator() {
    }
}
