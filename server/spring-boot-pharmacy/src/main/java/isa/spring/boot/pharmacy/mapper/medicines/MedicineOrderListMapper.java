package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.dto.medicines.OrderItemDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.medicines.OrderItem;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

public class MedicineOrderListMapper {

    public static MedicineOrderList convertToEntity(MedicineOrderListDto medicineOrderListDto, List<OrderItem> orderItemList){
        MedicineOrderList medicineOrderList = new MedicineOrderList();

        medicineOrderList.setFinalOfferDate(medicineOrderListDto.getFinalOfferDate());
        medicineOrderList.setOrderItems(orderItemList);
        for(OrderItem orderItem : medicineOrderList.getOrderItems()){
            orderItem.setMedicineOrderList(medicineOrderList);
        }

        return medicineOrderList;
    }

}
