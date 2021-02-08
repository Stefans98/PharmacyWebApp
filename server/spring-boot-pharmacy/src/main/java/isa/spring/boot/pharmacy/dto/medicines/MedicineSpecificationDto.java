package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.model.medicines.Ingredient;
import isa.spring.boot.pharmacy.model.medicines.Medicine;

import java.util.ArrayList;
import java.util.List;

public class MedicineSpecificationDto {

    private Long id;
    private String contraindication;
    private int dailyDose;
    private List<String> ingredients;
    private List<MedicineDto> substitutions;

    public MedicineSpecificationDto() {
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


    public List<MedicineDto> getSubstitutions() {
        return substitutions;
    }

    public void setSubstitutions(List<MedicineDto> substitutions) {
        this.substitutions = substitutions;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getSubstitutionsCodes() {
        List<String> codes = new ArrayList<>();
        for (MedicineDto medicineDto : this.substitutions) {
            codes.add(medicineDto.getCode());
        }
        return codes;
    }
}
