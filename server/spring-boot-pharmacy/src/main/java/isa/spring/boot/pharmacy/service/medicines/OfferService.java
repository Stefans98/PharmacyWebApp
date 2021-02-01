package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.Offer;
import isa.spring.boot.pharmacy.model.users.Supplier;
import isa.spring.boot.pharmacy.repository.medicines.OfferRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicineOrderListService medicineOrderListService;

    public Offer createNewOffer(Offer offer, Long supplierId, Long medicineOrderListId) {
        offer.setSupplier((Supplier) userService.findById(supplierId));
        offer.setMedicineOrderList(medicineOrderListService.findById(medicineOrderListId));
        return offerRepository.save(offer);
    }

}
