package isa.spring.boot.pharmacy.model.medicines;

import javax.persistence.*;

import java.util.ArrayList;
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

    // ***
    @ManyToMany(mappedBy = "ingredients")
    private List<MedicineSpecification> medicineSpecification = new ArrayList<MedicineSpecification>();

    public Ingredient() {
    }

    public Ingredient(String name) {
        this.name = name;
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

    public List<MedicineSpecification> getMedicineSpecification() {
        return medicineSpecification;
    }

    public void setMedicineSpecification(List<MedicineSpecification> medicineSpecification) {
        this.medicineSpecification = medicineSpecification;
    }
}
