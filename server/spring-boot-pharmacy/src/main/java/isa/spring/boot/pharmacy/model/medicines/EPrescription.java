package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Patient;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="e_prescriptions")
public class EPrescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "issuing_date", nullable = false)
    private Date issuingDate;

    @Column(name = "price", nullable = false)
    private double price;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pharmacy pharmacy;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Patient patient;

    @OneToMany(mappedBy = "ePrescription", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<EPrescriptionItem> ePrescriptionItems;

    public EPrescription() {
    }

    public EPrescription(String code, Date issuingDate, Patient patient, List<EPrescriptionItem> ePrescriptionItems) {
        this.code = code;
        this.issuingDate = issuingDate;
        this.patient = patient;
        this.ePrescriptionItems = ePrescriptionItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getIssuingDate() {
        return issuingDate;
    }

    public void setIssuingDate(Date issuingDate) {
        this.issuingDate = issuingDate;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public List<EPrescriptionItem> getePrescriptionItems() {
        return ePrescriptionItems;
    }

    public void setePrescriptionItems(List<EPrescriptionItem> ePrescriptionItems) {
        this.ePrescriptionItems = ePrescriptionItems;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(Pharmacy pharmacy) {
        this.pharmacy = pharmacy;
    }
}
