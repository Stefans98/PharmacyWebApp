package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.dto.medicines.OrderItemDto;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import isa.spring.boot.pharmacy.repository.medicines.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    MedicineService medicineService;

    public List<OrderItem> findOrderItemsByMedicineOrderItemList(MedicineOrderListDto medicineOrderListDto){
        List<OrderItem> orderItems = new ArrayList<>();
        for(OrderItemDto orderItemDto : medicineOrderListDto.getOrderItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setMedicine(medicineService.findById(orderItemDto.getMedicine().getId()));
            orderItem.setQuantity(orderItemDto.getQuantity());
            orderItems.add(orderItem);
        }
        return orderItems;
    }
}
