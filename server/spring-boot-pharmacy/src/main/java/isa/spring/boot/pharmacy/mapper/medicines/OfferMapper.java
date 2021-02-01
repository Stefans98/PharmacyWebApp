package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.OfferDto;
import isa.spring.boot.pharmacy.mapper.users.SupplierMapper;
import isa.spring.boot.pharmacy.model.medicines.Offer;
import isa.spring.boot.pharmacy.model.medicines.OfferState;
import isa.spring.boot.pharmacy.model.users.Address;

public class OfferMapper {

    public static OfferDto convertToDto(Offer offer) {
        OfferDto dto = new OfferDto();

        dto.setId(offer.getId());
        dto.setPrice(offer.getPrice());
        dto.setOfferState(offer.getOfferState());
        dto.setDeliveryDeadline(offer.getDeliveryDeadline());
        dto.setMedicineOrderListId(offer.getMedicineOrderList().getId());
        dto.setMedicineOrderListDto(MedicineOrderListMapper.convertToDto(offer.getMedicineOrderList()));

        return dto;
    }

    public static Offer convertToEntity(OfferDto dto, boolean alreadyExist) {
        Offer offer = new Offer();

        if (alreadyExist) {
            offer.setId(dto.getId());
        }
        offer.setOfferState(OfferState.ON_HOLD);
        offer.setPrice(dto.getPrice());
        offer.setDeliveryDeadline(dto.getDeliveryDeadline());

        return offer;
    }
}
