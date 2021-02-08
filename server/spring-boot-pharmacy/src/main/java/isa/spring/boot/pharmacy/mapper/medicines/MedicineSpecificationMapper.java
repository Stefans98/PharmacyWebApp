package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineSpecificationDto;
import isa.spring.boot.pharmacy.model.medicines.Ingredient;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineSpecification;

import java.util.ArrayList;
import java.util.List;

public class MedicineSpecificationMapper {

    public static MedicineSpecificationDto convertToDto(MedicineSpecification medicineSpecification) {
        MedicineSpecificationDto dto = new MedicineSpecificationDto();

        dto.setContraindication(medicineSpecification.getContraindication());
        dto.setDailyDose(medicineSpecification.getDailyDose());

        List<String> ingredients = new ArrayList<>();
        for (Ingredient ingredient : medicineSpecification.getIngredients()) {
            ingredients.add(ingredient.getName());
        }
        dto.setIngredients(ingredients);

        List<MedicineDto> substitutions = new ArrayList<>();
        for (Medicine medicine : medicineSpecification.getMedicineSubstitutions()) {
            substitutions.add(new MedicineDto(medicine.getName(), medicine.getCode()));
        }

        dto.setSubstitutions(substitutions);

        return dto;
    }

    public static MedicineSpecification convertToEntity(MedicineSpecificationDto medicineSpecificationDto) {
        MedicineSpecification medicineSpecification = new MedicineSpecification();

        medicineSpecification.setContraindication(medicineSpecificationDto.getContraindication());
        medicineSpecification.setDailyDose(medicineSpecificationDto.getDailyDose());

        List<Ingredient> ingredients = new ArrayList<>();
        for (String i: medicineSpecificationDto.getIngredients()) {
            Ingredient ingredient = new Ingredient();
            ingredient.setName(i);
            ingredients.add(ingredient);
        }

        medicineSpecification.setIngredients(ingredients);

        return medicineSpecification;
    }
}
