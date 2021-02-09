package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="pharmacy_administrators")
@DiscriminatorValue("PHARMACY_ADMIN")
public class PharmacyAdministrator extends User {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    @OneToMany(mappedBy = "pharmacyAdministrator", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineOrderList> medicineOrderLists;

    public PharmacyAdministrator() {
    }

    public PharmacyAdministrator(String email, String password, String firstName, String lastName, String phoneNumber,
                                 Address address,Pharmacy pharmacy, List<MedicineOrderList> medicineOrderLists) {
        super(email, password, firstName, lastName, phoneNumber, address);
        this.pharmacy = pharmacy;
        this.medicineOrderLists = medicineOrderLists;
    }

    public PharmacyAdministrator(User user) {
        super(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(),
                user.getAddress());
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }

    public List<MedicineOrderList> getMedicineOrderLists() {
        return medicineOrderLists;
    }

    public void setMedicineOrderLists(List<MedicineOrderList> medicineOrderLists) {
        this.medicineOrderLists = medicineOrderLists;
    }
}
