package isa.spring.boot.pharmacy.model.users;

import javax.persistence.*;

@Entity
@Table(name="dermatologist_grade")
@DiscriminatorValue("DERMATOLOGIST_GRADE")
public class DermatologistGrade extends Grade {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Dermatologist dermatologist;

    public DermatologistGrade() {
    }

    public DermatologistGrade(int grade, Patient patient, Dermatologist dermatologist) {
        super(grade, patient);
        this.dermatologist = dermatologist;
    }

    public Dermatologist getDermatologist() {
        return dermatologist;
    }

    public void setDermatologist(Dermatologist dermatologist) {
        this.dermatologist = dermatologist;
    }
}
