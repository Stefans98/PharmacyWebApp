package isa.spring.boot.pharmacy.model.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="pharmacies")
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "average_grade")
    private double averageGrade;

    private Address address;
    private List<Pharmacist> pharmacists;
    private List<Dermatologist> dermatologists;
    private List<Medicine> medicines;

    public Pharmacy() {
    }

    public Pharmacy(String name, String description, double averageGrade, Address address, List<Pharmacist> pharmacists, List<Dermatologist> dermatologists, List<Medicine> medicines) {
        this.name = name;
        this.description = description;
        this.averageGrade = averageGrade;
        this.address = address;
        this.pharmacists = pharmacists;
        this.dermatologists = dermatologists;
        this.medicines = medicines;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAverageGrade() {
        return averageGrade;
    }

    public void setAverageGrade(double averageGrade) {
        this.averageGrade = averageGrade;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Pharmacist> getPharmacists() {
        return pharmacists;
    }

    public void setPharmacists(List<Pharmacist> pharmacists) {
        this.pharmacists = pharmacists;
    }

    public List<Dermatologist> getDermatologists() {
        return dermatologists;
    }

    public void setDermatologists(List<Dermatologist> dermatologists) {
        this.dermatologists = dermatologists;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }
}
