package isa.spring.boot.pharmacy.model.users;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Patient")
public class Patient extends User {

    public Patient() {
    }
}
