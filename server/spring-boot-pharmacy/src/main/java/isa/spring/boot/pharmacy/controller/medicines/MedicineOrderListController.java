package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineOrderListMapper;
import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.service.medicines.MedicineOrderListService;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.medicines.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value="api/medicineOrderLists", produces = MediaType.APPLICATION_JSON_VALUE)
public class MedicineOrderListController {

    @Autowired
    private MedicineOrderListService medicineOrderListService;

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping(value="/createMedicineOrderList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> createMedicineOrderList(@RequestBody MedicineOrderListDto medicineOrderListDto){
        MedicineOrderList medicineOrderList = MedicineOrderListMapper.convertToEntity(medicineOrderListDto, orderItemService.findOrderItemsByMedicineOrderItemList(medicineOrderListDto));
        medicineOrderListService.createMedicineOrderList(medicineOrderList);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value="/all",  produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<List<MedicineOrderListDto>> getAllMedicineOrderLists(){
        List<MedicineOrderList> medicineOrderLists = medicineOrderListService.getAll();
        List<MedicineOrderListDto> medicineOrderListDtos = new ArrayList<>();
        for (MedicineOrderList medicineOrderList : medicineOrderLists) {
            medicineOrderListDtos.add(MedicineOrderListMapper.convertToDto(medicineOrderList));
        }
        return new ResponseEntity(medicineOrderListDtos, HttpStatus.OK);
    }
}
