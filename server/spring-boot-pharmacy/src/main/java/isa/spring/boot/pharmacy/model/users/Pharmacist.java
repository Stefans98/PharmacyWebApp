package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="pharmacists")
@DiscriminatorValue("PHARMACIST")
public class Pharmacist extends Employee {

    // ***
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    @OneToMany(mappedBy = "pharmacist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PharmacistComplaint> complaints;

    public Pharmacist() {
    }

    public Pharmacist(String email, String password, String firstName, String lastName, String phoneNumber, Address address) {
        super(email, password, firstName, lastName, phoneNumber, address);
    }

    public Pharmacist(User user) {
        super(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(),
                user.getAddress());
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public List<PharmacistComplaint> getComplaints() {
        return complaints;
    }

    public void setComplaints(List<PharmacistComplaint> complaints) {
        this.complaints = complaints;
    }

}
