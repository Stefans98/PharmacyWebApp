package isa.spring.boot.pharmacy.model.medicines;

import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Promotion;
import isa.spring.boot.pharmacy.model.users.Allergy;
import isa.spring.boot.pharmacy.model.users.User;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "medicine_type")
    private String medicineType;

    @Column(name = "points")
    private int points;

    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "medicine_specification_id", referencedColumnName = "id")
    private MedicineSpecification medicineSpecification;

    // ***
    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicinePrice> medicinePrices;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Prescription> prescriptions;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineReservation> medicineReservations;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<EPrescriptionItem> ePrescriptionItem;

    @ManyToMany(mappedBy = "medicineSubstitutions")
    private List<MedicineSpecification> medicineSpecifications = new ArrayList<MedicineSpecification>();

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PharmacyMedicine> pharmacyMedicines;

    @OneToMany(mappedBy = "medicine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineInquiry> medicineInquiries;

    @OneToOne(mappedBy = "medicine")
    private Allergy allergy;

    public Medicine() {
    }

    public Medicine(String name, String code, String medicineType, int points, String manufacturer, MedicineSpecification medicineSpecification) {
        this.name = name;
        this.code = code;
        this.medicineType = medicineType;
        this.points = points;
        this.manufacturer = manufacturer;
        this.medicineSpecification = medicineSpecification;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMedicineType() {
        return medicineType;
    }

    public void setMedicineType(String medicineType) {
        this.medicineType = medicineType;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public MedicineSpecification getMedicineSpecification() {
        return medicineSpecification;
    }

    public void setMedicineSpecification(MedicineSpecification medicineSpecification) {
        this.medicineSpecification = medicineSpecification;
    }

    public List<MedicinePrice> getMedicinePrices() {
        return medicinePrices;
    }

    public void setMedicinePrices(List<MedicinePrice> medicinePrices) {
        this.medicinePrices = medicinePrices;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public List<MedicineReservation> getMedicineReservations() {
        return medicineReservations;
    }

    public void setMedicineReservations(List<MedicineReservation> medicineReservations) {
        this.medicineReservations = medicineReservations;
    }

    public List<EPrescriptionItem> getePrescriptionItem() {
        return ePrescriptionItem;
    }

    public void setePrescriptionItem(List<EPrescriptionItem> ePrescriptionItem) {
        this.ePrescriptionItem = ePrescriptionItem;
    }

    public List<MedicineSpecification> getMedicineSpecifications() {
        return medicineSpecifications;
    }

    public void setMedicineSpecifications(List<MedicineSpecification> medicineSpecifications) {
        this.medicineSpecifications = medicineSpecifications;
    }

    public Allergy getAllergy() {
        return allergy;
    }

    public void setAllergy(Allergy allergy) {
        this.allergy = allergy;
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
}
