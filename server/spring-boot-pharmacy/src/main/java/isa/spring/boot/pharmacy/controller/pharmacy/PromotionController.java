package isa.spring.boot.pharmacy.controller.pharmacy;

import isa.spring.boot.pharmacy.dto.medicines.MedicineOrderListDto;
import isa.spring.boot.pharmacy.mapper.medicines.MedicineOrderListMapper;
import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Promotion;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.pharmacy.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/promotions", produces = MediaType.APPLICATION_JSON_VALUE)
public class PromotionController {

    @Autowired
    PromotionService promotionService;

    @Autowired
    PharmacyService pharmacyService;

    @PostMapping(value="/definePromotion/{pharmacyId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Promotion> definePromotion(@PathVariable Long pharmacyId, @RequestBody Promotion promotion){
        Pharmacy pharmacy = pharmacyService.getPharmacyById(pharmacyId);
        if(pharmacy == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Promotion definedPromotion = promotionService.savePromotion(promotion, pharmacy);
        if(definedPromotion == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(definedPromotion, HttpStatus.OK);
    }
}
