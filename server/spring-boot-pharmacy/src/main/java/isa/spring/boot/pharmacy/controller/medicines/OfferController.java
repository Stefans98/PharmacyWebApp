package isa.spring.boot.pharmacy.controller.medicines;

import isa.spring.boot.pharmacy.dto.medicines.OfferDto;
import isa.spring.boot.pharmacy.mapper.medicines.OfferMapper;
import isa.spring.boot.pharmacy.model.medicines.Offer;
import isa.spring.boot.pharmacy.service.medicines.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<OfferDto> createNewOffer(@RequestBody OfferDto offerDto) {
        Offer offer = offerService.createNewOffer(OfferMapper.convertToEntity(offerDto, false),
                offerDto.getSupplierId(), offerDto.getMedicineOrderListId());
        return new ResponseEntity<>(OfferMapper.convertToDto(offer), HttpStatus.CREATED);
    }

    @GetMapping(value = "/getOffersForSupplier/{supplierId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<List<OfferDto>> getOffersForSupplier(@PathVariable Long supplierId) {
        List<Offer> offers = offerService.findOffersForSupplier(supplierId);
        List<OfferDto> offerDtos = new ArrayList<>();
        for (Offer offer : offers) {
            offerDtos.add(OfferMapper.convertToDto(offer));
        }
        return new ResponseEntity<>(offerDtos, HttpStatus.OK);
    }

    @PutMapping(value = "/edit/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPPLIER')")
    public ResponseEntity<OfferDto> editOffer(@PathVariable Long id, @RequestBody OfferDto offerDto) {
        Offer offer = offerService.findById(id);
        if (offer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        offer = offerService.editOffer(OfferMapper.convertToEntity(offerDto, true));
        if (offer == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(OfferMapper.convertToDto(offer), HttpStatus.OK);
    }

    @GetMapping(value="getOffersForMedicineOrderList/{medicineOrderListId}",  produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<OfferDto>> getOffersForMedicineOrderList(@PathVariable Long medicineOrderListId){
        List<OfferDto> offersForMedicineOrderList = new ArrayList<>();
        if(offerService.findOffersForMedicineOrderList(medicineOrderListId) == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for(Offer offerForMedicineOrderList : offerService.findOffersForMedicineOrderList(medicineOrderListId)){
            offersForMedicineOrderList.add(OfferMapper.convertToDto(offerForMedicineOrderList));
        }

        if(offersForMedicineOrderList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(offersForMedicineOrderList, HttpStatus.OK);
    }

    @PutMapping(value = "/acceptOffer/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PHARMACY_ADMIN')")
    public ResponseEntity<List<Offer>> acceptOffer(@PathVariable Long id, @RequestBody OfferDto offerDto) {
        Offer offer = offerService.findById(offerDto.getId());
        if (offer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(offer.getMedicineOrderList().getPharmacyAdministrator().getId() != id){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        offer = offerService.acceptOffer(offerDto.getId());
        if (offer == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(offerService.findAll(), HttpStatus.OK);
    }
}
