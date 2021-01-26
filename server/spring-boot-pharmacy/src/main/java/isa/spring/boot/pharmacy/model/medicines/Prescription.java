package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.users.Patient;

import javax.persistence.*;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "therapy_day_length", nullable = false)
    private int therapyDayLength;

    private Medicine medicine;
    private Patient patient;

    public Prescription() {
    }

    public Prescription(int therapyDayLength, Medicine medicine, Patient patient) {
        this.therapyDayLength = therapyDayLength;
        this.medicine = medicine;
        this.patient = patient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTherapyDayLength() {
        return therapyDayLength;
    }

    public void setTherapyDayLength(int therapyDayLength) {
        this.therapyDayLength = therapyDayLength;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
