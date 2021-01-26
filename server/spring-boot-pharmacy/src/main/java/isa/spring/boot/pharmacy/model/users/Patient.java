package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.medicines.EPrescription;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import isa.spring.boot.pharmacy.model.schedule.AppointmentHistory;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="patients")
@DiscriminatorValue("PATIENT")
public class Patient extends User {

    @Column(name = "points")
    private int points;

    @Column(name = "user_category")
    private UserCategory userCategory;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "appointment_history_id", referencedColumnName = "id")
    private AppointmentHistory appointmentHistory;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Allergy> allergies;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subscription> subscriptions;

    // ***
    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Complaint> complaints = new ArrayList<Complaint>();

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Prescription> Prescription;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineReservation> medicineReservations;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<EPrescription> ePrescription;

    public Patient() {
    }

    public Patient(String email, String password, String firstName, String lastName, String phoneNumber, int points,
                   UserCategory userCategory, AppointmentHistory appointmentHistory, List<Allergy> allergies, List<Subscription> subscriptions) {
        super(email, password, firstName, lastName, phoneNumber);
        this.points = points;
        this.userCategory = userCategory;
        this.appointmentHistory = appointmentHistory;
        this.allergies = allergies;
        this.subscriptions = subscriptions;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public UserCategory getUserCategory() {
        return userCategory;
    }

    public void setUserCategory(UserCategory userCategory) {
        this.userCategory = userCategory;
    }

    public AppointmentHistory getAppointmentHistory() {
        return appointmentHistory;
    }

    public void setAppointmentHistory(AppointmentHistory appointmentHistory) {
        this.appointmentHistory = appointmentHistory;
    }

    public List<Allergy> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<Allergy> allergies) {
        this.allergies = allergies;
    }

    public List<Subscription> getSubscriptions() {
        return subscriptions;
    }

    public void setSubscriptions(List<Subscription> subscriptions) {
        this.subscriptions = subscriptions;
    }

    public List<Complaint> getComplaints() {
        return complaints;
    }

    public void setComplaints(List<Complaint> complaints) {
        this.complaints = complaints;
    }

    public List<isa.spring.boot.pharmacy.model.medicines.Prescription> getPrescription() {
        return Prescription;
    }

    public void setPrescription(List<isa.spring.boot.pharmacy.model.medicines.Prescription> prescription) {
        Prescription = prescription;
    }

    public List<MedicineReservation> getMedicineReservations() {
        return medicineReservations;
    }

    public void setMedicineReservations(List<MedicineReservation> medicineReservations) {
        this.medicineReservations = medicineReservations;
    }

    public List<EPrescription> getePrescription() {
        return ePrescription;
    }

    public void setePrescription(List<EPrescription> ePrescription) {
        this.ePrescription = ePrescription;
    }
}
