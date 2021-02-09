package isa.spring.boot.pharmacy.repository.medicines;

import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
