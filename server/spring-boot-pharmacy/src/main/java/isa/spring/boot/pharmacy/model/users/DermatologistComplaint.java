package isa.spring.boot.pharmacy.model.users;

import javax.persistence.*;

@Entity
@Table(name="dermatologist_complaint")
@DiscriminatorValue("DERMATOLOGIST_COMPLAINT")
public class DermatologistComplaint extends Complaint {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Dermatologist dermatologist;

    public DermatologistComplaint() {
    }

    public DermatologistComplaint(String text, Patient patient, Dermatologist dermatologist) {
        super(text, patient);
        this.dermatologist = dermatologist;
    }

    public Dermatologist getDermatologist() {
        return dermatologist;
    }

    public void setDermatologist(Dermatologist dermatologist) {
        this.dermatologist = dermatologist;
    }
}
