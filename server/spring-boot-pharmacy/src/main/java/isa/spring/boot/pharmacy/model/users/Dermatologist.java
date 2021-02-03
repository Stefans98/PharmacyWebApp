package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="dermatologists")
@DiscriminatorValue("DERMATOLOGIST")
public class Dermatologist extends Employee {

    @Column(name = "average_grade")
    private double averageGrade;

    // ***
    @ManyToMany(mappedBy = "dermatologists")
    private List<Pharmacy> pharmacies = new ArrayList<Pharmacy>();

    @OneToMany(mappedBy = "dermatologist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DermatologistComplaint> complaints;

    public Dermatologist() {
    }

    public Dermatologist(String email, String password, String firstName, String lastName, String phoneNumber, Address address, double averageGrade) {
        super(email, password, firstName, lastName, phoneNumber, address);
        this.averageGrade = averageGrade;
    }

    public Dermatologist(User user) {
        super(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getPhoneNumber(),
                user.getAddress());
    }

    public double getAverageGrade() {
        return averageGrade;
    }

    public void setAverageGrade(double averageGrade) {
        this.averageGrade = averageGrade;
    }

    public List<Pharmacy> getPharmacies() {
        return pharmacies;
    }

    public void setPharmacies(List<Pharmacy> pharmacies) {
        this.pharmacies = pharmacies;
    }

    public List<DermatologistComplaint> getComplaints() {
        return complaints;
    }

    public void setComplaints(List<DermatologistComplaint> complaints) {
        this.complaints = complaints;
    }
}
