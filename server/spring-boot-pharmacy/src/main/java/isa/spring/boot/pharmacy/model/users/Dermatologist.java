package isa.spring.boot.pharmacy.model.users;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="dermatologists")
@DiscriminatorValue("Dermatologist")
public class Dermatologist extends Employee {

    public Dermatologist() {
    }

    public Dermatologist(String email, String password, String firstName, String lastName, String phoneNumber) {
        super(email, password, firstName, lastName, phoneNumber);
    }
}
