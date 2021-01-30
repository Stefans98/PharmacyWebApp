package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="dermatologists")
@DiscriminatorValue("DERMATOLOGIST")
public class Dermatologist extends Employee {

    // ***
    @ManyToMany(mappedBy = "dermatologists")
    private List<Pharmacy> pharmacies = new ArrayList<Pharmacy>();

    public Dermatologist() {
    }

    public Dermatologist(String email, String password, String firstName, String lastName, String phoneNumber, Address address) {
        super(email, password, firstName, lastName, phoneNumber, address);
    }

    public Dermatologist(User user) {
        super(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(),
                user.getAddress());
    }

    public List<Pharmacy> getPharmacies() {
        return pharmacies;
    }

    public void setPharmacies(List<Pharmacy> pharmacies) {
        this.pharmacies = pharmacies;
    }
}
