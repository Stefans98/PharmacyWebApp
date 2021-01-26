package isa.spring.boot.pharmacy.model.medicines;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@Entity
@Table(name="medicine_specifications")
public class MedicineSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name = "contraindication", nullable = false)
    private String contraindication;

    @Column(name = "dailyDose")
    private int dailyDose;

    private List<Ingredient> ingredients;

    private List<Medicine> medicineSubstitutions;

    public MedicineSpecification() {
    }

    public MedicineSpecification(String contraindication, int dailyDose, List<Ingredient> ingredients, List<Medicine> medicineSubstitutions) {
        this.contraindication = contraindication;
        this.dailyDose = dailyDose;
        this.ingredients = ingredients;
        this.medicineSubstitutions = medicineSubstitutions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContraindication() {
        return contraindication;
    }

    public void setContraindication(String contraindication) {
        this.contraindication = contraindication;
    }

    public int getDailyDose() {
        return dailyDose;
    }

    public void setDailyDose(int dailyDose) {
        this.dailyDose = dailyDose;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<Medicine> getMedicineSubstitutions() {
        return medicineSubstitutions;
    }

    public void setMedicineSubstitutions(List<Medicine> medicineSubstitutions) {
        this.medicineSubstitutions = medicineSubstitutions;
    }
}
