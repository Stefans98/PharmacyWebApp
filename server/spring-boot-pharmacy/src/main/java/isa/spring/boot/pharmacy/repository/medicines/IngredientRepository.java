package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
