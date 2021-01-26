package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="suppliers")
@DiscriminatorValue("Supplier")
public class Supplier extends User {

    public Supplier() {
    }

    public Supplier(String email, String password, String firstName, String lastName, String phoneNumber) {
        super(email, password, firstName, lastName, phoneNumber);
    }
}
