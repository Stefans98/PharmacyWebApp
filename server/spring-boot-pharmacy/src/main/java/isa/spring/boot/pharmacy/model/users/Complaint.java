package isa.spring.boot.pharmacy.model.users;

import javax.persistence.*;

import static javax.persistence.DiscriminatorType.STRING;
import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="complaints")
@Inheritance(strategy=SINGLE_TABLE)
@DiscriminatorColumn(name="complaint_type", discriminatorType=STRING)
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Patient patient;

    public Complaint() {
    }

    public Complaint(String text, Patient patient) {
        this.text = text;
        this.patient = patient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Transient
    public String getDiscriminatorValue() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}
