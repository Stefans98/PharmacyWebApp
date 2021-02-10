package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.medicines.EPrescription;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import isa.spring.boot.pharmacy.model.schedule.Appointment;

import javax.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="patients")
@DiscriminatorValue("PATIENT")
public class Patient extends User {

    @Column(name = "points")
    private int points;

    @Column(name = "penalty")
    private int penalty;

    @Column(name = "penalties_reset_date")
    private Date penaltiesResetDate;

    @Column(name = "user_category")
    private UserCategory userCategory;

    @Column(name = "account_activated")
    private boolean accountActivated;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Allergy> allergies;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subscription> subscriptions;

    // ***
    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Complaint> complaints = new ArrayList<Complaint>();

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Prescription> prescriptions;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineReservation> medicineReservations;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<EPrescription> ePrescriptions;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    public Patient() {
    }

    public Patient(String email, String password, String firstName, String lastName, String phoneNumber, Address address, int points, int penalty, UserCategory userCategory, List<Allergy> allergies, List<Subscription> subscriptions, List<Complaint> complaints, List<Prescription> prescriptions, List<MedicineReservation> medicineReservations, List<EPrescription> ePrescriptions, List<Appointment> appointments) {
        super(email, password, firstName, lastName, phoneNumber, address);
        this.points = points;
        this.penalty = penalty;
        this.userCategory = userCategory;
        this.allergies = allergies;
        this.subscriptions = subscriptions;
        this.complaints = complaints;
        this.prescriptions = prescriptions;
        this.medicineReservations = medicineReservations;
        this.ePrescriptions = ePrescriptions;
        this.appointments = appointments;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public boolean isAccountActivated() {
        return accountActivated;
    }

    public void setAccountActivated(boolean accountActivated) {
        this.accountActivated = accountActivated;
    }

    public UserCategory getUserCategory() {
        return userCategory;
    }

    public void setUserCategory(UserCategory userCategory) {
        this.userCategory = userCategory;
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

    public List<MedicineReservation> getMedicineReservations() {
        return medicineReservations;
    }

    public void setMedicineReservations(List<MedicineReservation> medicineReservations) {
        this.medicineReservations = medicineReservations;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public List<EPrescription> getePrescriptions() {
        return ePrescriptions;
    }

    public void setePrescriptions(List<EPrescription> ePrescriptions) {
        this.ePrescriptions = ePrescriptions;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public int getPenalty() {
        return penalty;
    }

    public void setPenalty(int penalty) {
        this.penalty = penalty;
    }

    public Date getPenaltiesResetDate() {
        return penaltiesResetDate;
    }

    public void setPenaltiesResetDate(Date penaltiesResetDate) {
        this.penaltiesResetDate = penaltiesResetDate;
    }
}
