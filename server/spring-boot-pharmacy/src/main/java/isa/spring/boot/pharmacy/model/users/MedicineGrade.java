package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.medicines.Medicine;

import javax.persistence.*;

@Entity
@Table(name="medicine_grade")
@DiscriminatorValue("MEDICINE_GRADE")
public class MedicineGrade extends Grade {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Medicine medicine;

    public MedicineGrade() {
    }

    public MedicineGrade(int grade, Patient patient, Medicine medicine) {
        super(grade, patient);
        this.medicine = medicine;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }
}
