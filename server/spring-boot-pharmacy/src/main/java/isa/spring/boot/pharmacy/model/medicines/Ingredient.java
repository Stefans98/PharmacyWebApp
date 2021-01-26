package isa.spring.boot.pharmacy.model.medicines;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    private List<MedicineSpecification> medicineSpecifications;

    public Ingredient() {
    }

    public Ingredient(String name, List<MedicineSpecification> medicineSpecifications) {
        this.name = name;
        this.medicineSpecifications = medicineSpecifications;
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

    public List<MedicineSpecification> getMedicineSpecifications() {
        return medicineSpecifications;
    }

    public void setMedicineSpecifications(List<MedicineSpecification> medicineSpecifications) {
        this.medicineSpecifications = medicineSpecifications;
    }
}
