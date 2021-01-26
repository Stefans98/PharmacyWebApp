package isa.spring.boot.pharmacy.model.medicines;

import javax.persistence.*;

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

    @Column(name = "medicine_type", nullable = false)
    private String medicineType;

    @Column(name = "points")
    private int points;

    @Column(name = "manufacturer", nullable = false)
    private String manufacturer;

    private MedicineSpecification medicineSpecification;

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
}
