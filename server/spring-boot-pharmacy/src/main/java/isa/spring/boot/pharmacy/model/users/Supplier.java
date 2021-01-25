package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Supplier")
public class Supplier extends User {

    public Supplier() {
    }
}
