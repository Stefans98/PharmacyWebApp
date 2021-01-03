package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Pharmacist")
public class Pharmacist extends Employee {

    public Pharmacist() {
    }
}
