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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return new ResponseEntity<>(OfferMapper.convertToDto(offer), HttpStatus.OK);
    }
}
