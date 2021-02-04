package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineOrderList;
import isa.spring.boot.pharmacy.model.medicines.Offer;
import isa.spring.boot.pharmacy.model.medicines.OfferState;
import isa.spring.boot.pharmacy.model.users.Supplier;
import isa.spring.boot.pharmacy.repository.medicines.OfferRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    public Offer editOffer(Offer offer) {
        offer.setSupplier(offerRepository.getOne(offer.getId()).getSupplier());
        offer.setMedicineOrderList(offerRepository.getOne(offer.getId()).getMedicineOrderList());
        if (!offer.getMedicineOrderList().getFinalOfferDate().after(new Date())) {
            return null;
        }
        return offerRepository.save(offer);
    }

    public List<Offer> findOffersForSupplier(Long supplierId) {
        return  offerRepository.getBySupplierId(supplierId);
    }

    public Offer findById(Long id) {
        return offerRepository.getOne(id);
    }

    public List<Offer> findOffersForMedicineOrderList(Long medicineOrderListId){
        List<Offer> offersForMedicineOrderList = new ArrayList<>();
        for(Offer offer : offerRepository.findAll()){
            if(offer.getMedicineOrderList().getId() == medicineOrderListId){
                offersForMedicineOrderList.add(offer);
            }
        }
        return offersForMedicineOrderList;
    }

    public Offer acceptOffer(long offerId){
        Offer offerToAccept = findById(offerId);
        MedicineOrderList medicineOrderListForOffer = offerToAccept.getMedicineOrderList();
        if(checkMedicineOrderList(medicineOrderListForOffer)) {
            offerToAccept.setOfferState(OfferState.CONFIRMED);
            declineOffersForMedicineOrderList(offerToAccept.getMedicineOrderList().getId(), offerId);
            return offerRepository.save(offerToAccept);
        }else {
            return null;
        }
    }

    public boolean checkMedicineOrderList(MedicineOrderList medicineOrderList){
        if(medicineOrderList.getFinalOfferDate().after(new Date())){
            return false;
        }
        for(Offer offer : medicineOrderList.getOffers()){
            if(offer.getOfferState() == OfferState.CONFIRMED){
                return false;
            }
        }
        return true;
    }

    public void declineOffersForMedicineOrderList(long medicineOrderListId, long offerToAcceptId){
        for(Offer offerToDecline : findOffersForMedicineOrderList(medicineOrderListId)){
            if(offerToDecline.getId() != offerToAcceptId) {
                offerToDecline.setOfferState(OfferState.REJECTED);
                offerRepository.save(offerToDecline);
            }
        }
    }

    public List<Offer> findAll(){
        return offerRepository.findAll();
    }

}
