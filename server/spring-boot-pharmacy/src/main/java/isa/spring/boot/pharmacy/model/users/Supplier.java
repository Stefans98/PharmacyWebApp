package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.medicines.Offer;
import isa.spring.boot.pharmacy.model.pharmacy.Promotion;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="suppliers")
@DiscriminatorValue("SUPPLIER")
public class Supplier extends User {

    // ***
    @OneToMany(mappedBy = "supplier", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Offer> offers;

    public Supplier() {
    }

    public Supplier(String email, String password, String firstName, String lastName, String phoneNumber, Address address) {
        super(email, password, firstName, lastName, phoneNumber, address);
    }

    public Supplier(User user) {
        super(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(),
                user.getAddress());
    }

    public List<Offer> getOffers() {
        return offers;
    }

    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }
}
