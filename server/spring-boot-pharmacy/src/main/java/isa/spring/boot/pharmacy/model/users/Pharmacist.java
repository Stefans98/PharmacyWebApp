package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="pharmacists")
@DiscriminatorValue("Pharmacist")
public class Pharmacist extends Employee {

    public Pharmacist() {
    }

    public Pharmacist(String email, String password, String firstName, String lastName, String phoneNumber) {
        super(email, password, firstName, lastName, phoneNumber);
    }
}
