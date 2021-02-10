package isa.spring.boot.pharmacy.model.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.*;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Pharmacist> pharmacists;

    @ManyToMany
    @JoinTable(name = "employee_dermatologists", joinColumns = @JoinColumn(name = "pharmacy_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "dermatologist_id", referencedColumnName = "id"))
    private List<Dermatologist> dermatologists = new ArrayList<Dermatologist>();

    // ***
    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PharmacyAdministrator> pharmacyAdministrators = new ArrayList<PharmacyAdministrator>();

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WorkDay> workDays = new ArrayList<WorkDay>();

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subscription> subscriptions;

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineReservation> medicineReservations;

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineOrderList> medicineOrderLists;

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<VacationRequest> vacationRequests = new ArrayList<VacationRequest>();

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PharmacyComplaint> complaints;

     @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PharmacyMedicine> pharmacyMedicines;

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineInquiry> medicineInquiries;

    @OneToMany(mappedBy = "pharmacy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<EPrescription> ePrescriptions;

    @OneToOne(mappedBy = "pharmacy")
    private Pricelist pricelist;

    public Pharmacy() {
    }

    public Pharmacy(String name, String description, double averageGrade, Address address, List<Pharmacist> pharmacists, List<Dermatologist> dermatologists) {
        this.name = name;
        this.description = description;
        this.averageGrade = averageGrade;
        this.address = address;
        this.pharmacists = pharmacists;
        this.dermatologists = dermatologists;
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

    public List<PharmacyAdministrator> getPharmacyAdministrators() {
        return pharmacyAdministrators;
    }

    public void setPharmacyAdministrators(List<PharmacyAdministrator> pharmacyAdministrators) {
        this.pharmacyAdministrators = pharmacyAdministrators;
    }

    public List<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<WorkDay> workDays) {
        this.workDays = workDays;
    }

    public List<Subscription> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<Subscription> subscriptions) {
        this.subscriptions = subscriptions;
    }

    public List<MedicineReservation> getMedicineReservations() {
        return medicineReservations;
    }

    public void setMedicineReservations(List<MedicineReservation> medicineReservations) {
        this.medicineReservations = medicineReservations;
    }

    public List<MedicineOrderList> getMedicineOrderLists() {
        return medicineOrderLists;
    }

    public void setMedicineOrderLists(List<MedicineOrderList> medicineOrderLists) {
        this.medicineOrderLists = medicineOrderLists;
    }


    public List<PharmacyComplaint> getComplaints() {
        return complaints;
    }

    public void setComplaints(List<PharmacyComplaint> complaints) {
        this.complaints = complaints;
    }

    public List<VacationRequest> getVacationRequests() {
        return vacationRequests;
    }

    public void setVacationRequests(List<VacationRequest> vacationRequests) {
        this.vacationRequests = vacationRequests;
    }

    public List<PharmacyMedicine> getPharmacyMedicines() {
        return pharmacyMedicines;
    }

    public void setPharmacyMedicines(List<PharmacyMedicine> pharmacyMedicines) {
        this.pharmacyMedicines = pharmacyMedicines;
    }

    public List<MedicineInquiry> getMedicineInquiries() {
        return medicineInquiries;
    }

    public void setMedicineInquiries(List<MedicineInquiry> medicineInquiries) {
        this.medicineInquiries = medicineInquiries;
    }

    public Pricelist getPricelist() {
        return pricelist;
    }

    public void setPricelist(Pricelist pricelist) {
        this.pricelist = pricelist;
    }

    public List<EPrescription> getePrescriptions() {
        return ePrescriptions;
    }

    public void setePrescriptions(List<EPrescription> ePrescriptions) {
        this.ePrescriptions = ePrescriptions;
    }
}
