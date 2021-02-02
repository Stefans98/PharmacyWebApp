package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.dto.medicines.OrderItemDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
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

    public static MedicineOrderListDto convertToDto(MedicineOrderList medicineOrderList) {
        MedicineOrderListDto dto = new MedicineOrderListDto();
        dto.setId(medicineOrderList.getId());
        dto.setFinalOfferDate(medicineOrderList.getFinalOfferDate());
        dto.setPharmacy(PharmacyMapper.convertToDto(medicineOrderList.getPharmacy()));
        List<OrderItemDto> orderItemDtos = new ArrayList<OrderItemDto>();
        for(OrderItem orderItem : medicineOrderList.getOrderItems()) {
            OrderItemDto orderItemDto = new OrderItemDto();
            orderItemDto.setQuantity(orderItem.getQuantity());
            orderItemDto.setMedicine(MedicineMapper.convertToDto(orderItem.getMedicine()));
            orderItemDtos.add(orderItemDto);
        }
        dto.setOrderItems(orderItemDtos);
        return dto;
    }

}
