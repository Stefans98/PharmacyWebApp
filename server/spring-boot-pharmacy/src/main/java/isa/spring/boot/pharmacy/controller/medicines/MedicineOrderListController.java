package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineOrderListMapper;
import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.service.medicines.MedicineOrderListService;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.medicines.OrderItemService;
import isa.spring.boot.pharmacy.service.users.UserService;
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

    @Autowired
    private UserService userService;

    @PostMapping(value="/createMedicineOrderList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> createMedicineOrderList(@RequestBody MedicineOrderListDto medicineOrderListDto){
        MedicineOrderList medicineOrderList = MedicineOrderListMapper.convertToEntity(medicineOrderListDto,
                orderItemService.findOrderItemsByMedicineOrderItemList(medicineOrderListDto),
                (PharmacyAdministrator)userService.findById(medicineOrderListDto.getPharmacyAdministratorId()));
        medicineOrderListService.createMedicineOrderList(medicineOrderList);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value="/allActive",  produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<List<MedicineOrderListDto>> getAllActiveMedicineOrderLists(){
        List<MedicineOrderList> medicineOrderLists = medicineOrderListService.getAllActive();
        List<MedicineOrderListDto> medicineOrderListDtos = new ArrayList<>();
        for (MedicineOrderList medicineOrderList : medicineOrderLists) {
            medicineOrderListDtos.add(MedicineOrderListMapper.convertToDto(medicineOrderList));
        }
        return new ResponseEntity(medicineOrderListDtos, HttpStatus.OK);
    }

    @GetMapping(value="getMedicineOrderListsForPharmacy/{pharmacyId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<MedicineOrderListDto>> getMedicineOrderListsForPharmacy(@PathVariable Long pharmacyId){
        List<MedicineOrderListDto> medicineOrderListsForPharmacy = new ArrayList<>();
        if(medicineOrderListService.findMedicineOrderListsForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(MedicineOrderList medicineOrderListForPharmacy : medicineOrderListService.findMedicineOrderListsForPharmacy(pharmacyId)){
            medicineOrderListsForPharmacy.add(MedicineOrderListMapper.convertToDto(medicineOrderListForPharmacy));
        }

        if(medicineOrderListsForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(medicineOrderListsForPharmacy, HttpStatus.OK);
    }

    @PutMapping(value="/updateMedicineOrderList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> updateMedicineOrderList(@RequestBody MedicineOrderListDto medicineOrderListDto){
        MedicineOrderList medicineOrderList = MedicineOrderListMapper.convertToEntity(medicineOrderListDto,
                orderItemService.findOrderItemsByMedicineOrderItemList(medicineOrderListDto),
                (PharmacyAdministrator)userService.findById(medicineOrderListDto.getPharmacyAdministratorId()));
        if(medicineOrderListService.updateMedicineOrderList(medicineOrderList) == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @PutMapping(value="/deleteMedicineOrderList", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Void> deleteMedicineOrderList(@RequestBody MedicineOrderListDto medicineOrderListDto){
        MedicineOrderList medicineOrderList = MedicineOrderListMapper.convertToEntity(medicineOrderListDto,
                orderItemService.findOrderItemsByMedicineOrderItemList(medicineOrderListDto),
                (PharmacyAdministrator)userService.findById(medicineOrderListDto.getPharmacyAdministratorId()));
        if(medicineOrderListService.deleteMedicineOrderList(medicineOrderList) == false){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @GetMapping(value="getWaitingOffersMedicineOrderListsForPharmacy/{pharmacyId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<MedicineOrderListDto>> getWaitingOffersMedicineOrderListsForPharmacy(@PathVariable Long pharmacyId){
        List<MedicineOrderListDto> medicineOrderListsForPharmacy = new ArrayList<>();
        if(medicineOrderListService.findWaitingOffersMedicineOrderListsForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(MedicineOrderList medicineOrderListForPharmacy : medicineOrderListService.findWaitingOffersMedicineOrderListsForPharmacy(pharmacyId)){
            medicineOrderListsForPharmacy.add(MedicineOrderListMapper.convertToDto(medicineOrderListForPharmacy));
        }

        if(medicineOrderListsForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(medicineOrderListsForPharmacy, HttpStatus.OK);
    }

    @GetMapping(value="getDoneMedicineOrderListsForPharmacy/{pharmacyId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<MedicineOrderListDto>> getDoneMedicineOrderListsForPharmacy(@PathVariable Long pharmacyId){
        List<MedicineOrderListDto> medicineOrderListsForPharmacy = new ArrayList<>();
        if(medicineOrderListService.findDoneMedicineOrderListsForPharmacy(pharmacyId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(MedicineOrderList medicineOrderListForPharmacy : medicineOrderListService.findDoneMedicineOrderListsForPharmacy(pharmacyId)){
            medicineOrderListsForPharmacy.add(MedicineOrderListMapper.convertToDto(medicineOrderListForPharmacy));
        }

        if(medicineOrderListsForPharmacy.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(medicineOrderListsForPharmacy, HttpStatus.OK);
    }
}
