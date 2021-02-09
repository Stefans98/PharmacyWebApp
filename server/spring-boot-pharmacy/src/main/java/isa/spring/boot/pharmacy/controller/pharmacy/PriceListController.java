package isa.spring.boot.pharmacy.controller.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PricelistDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.mapper.pharmacy.PricelistMapper;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;
import isa.spring.boot.pharmacy.service.pharmacy.PricelistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/pricelists", produces = MediaType.APPLICATION_JSON_VALUE)
public class PriceListController {

    @Autowired
    PricelistService pricelistService;


    @GetMapping(value="/getPricelistForPharmacy/{pharmacyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<PricelistDto> getPricelistForPharmacy(@PathVariable Long pharmacyId){
        Pricelist pricelist = pricelistService.findPricelistForPharmacy(pharmacyId);
        if(pricelist == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(PricelistMapper.convertToDto(pricelist), HttpStatus.OK);
    }

    @PostMapping(value="/update", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<Pricelist> updatePricelist(@RequestBody PricelistDto pricelistDto){
        Pricelist pricelist = pricelistService.save(PricelistMapper.convertToEntity(pricelistDto));
        if(pricelist == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(pricelist, HttpStatus.OK);
    }
}
