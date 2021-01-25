package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("PharmacyAdministrator")
public class PharmacyAdministrator extends User {

    public PharmacyAdministrator() {
    }
}
