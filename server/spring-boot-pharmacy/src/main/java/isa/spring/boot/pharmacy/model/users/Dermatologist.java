package isa.spring.boot.pharmacy.model.users;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Dermatologist")
public class Dermatologist extends Employee {

    public Dermatologist() {
    }
}
