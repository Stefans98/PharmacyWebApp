package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.*;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Promotion;
import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import isa.spring.boot.pharmacy.model.users.Supplier;
import isa.spring.boot.pharmacy.repository.medicines.OfferRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.text.SimpleDateFormat;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

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
            updateMedicineQuantity(offerToAccept);
            return offerRepository.save(offerToAccept);
        }else {
            return null;
        }
    }

    public void updateMedicineQuantity(Offer offer){
        List<PharmacyMedicine> pharmacyMedicines = pharmacyMedicineService.getMedicinesForPharmacy(offer.getMedicineOrderList().getPharmacy().getId());
        for(OrderItem orderItem : offer.getMedicineOrderList().getOrderItems()){
            if(orderItem.getQuantity() == 0){
                continue;
            }
            boolean found = false;
            for(PharmacyMedicine pharmacyMedicine : pharmacyMedicines){
                if(orderItem.getMedicine().getId() == pharmacyMedicine.getMedicine().getId()){
                    pharmacyMedicine.setQuantity(pharmacyMedicine.getQuantity() + orderItem.getQuantity());
                    pharmacyMedicineService.addPharmacyMedicine(pharmacyMedicine);
                    found = true;
                }
            }
            if(!found){
                PharmacyMedicine newPharmacyMedicine = new PharmacyMedicine();
                newPharmacyMedicine.setMedicine(orderItem.getMedicine());
                newPharmacyMedicine.setPharmacy(offer.getMedicineOrderList().getPharmacy());
                newPharmacyMedicine.setQuantity(orderItem.getQuantity());
                newPharmacyMedicine.setDeleted(false);
                pharmacyMedicineService.addPharmacyMedicine(newPharmacyMedicine);
            }
        }
    }

    public void sendEmailForAcceptedOffer(Offer offer){
        emailService.sendEmailAsync(offer.getSupplier(), "Ponuda za narudžbenicu",
                "Poštovani\\-a " + offer.getSupplier().getFirstName() + " " + offer.getSupplier().getLastName() +
                        ", <br> vaša ponuda za narudžbenicu u apoteci: " + offer.getMedicineOrderList().getPharmacy().getName() + " je prihvaćena. " +
                        "<br> Krajnji rok isporuke je: " + convertToDateStr(offer.getDeliveryDeadline(), "dd.MM.yyyy.") +
                        "<br><br>S poštovanjem, <br>Vaša ISA");
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
                sendEmailForRejectedOffer(offerToDecline);
            }
        }
    }

    public void sendEmailForRejectedOffer(Offer offer){
        emailService.sendEmailAsync(offer.getSupplier(), "Ponuda za narudžbenicu",
                "Poštovani\\-a " + offer.getSupplier().getFirstName() + " " + offer.getSupplier().getLastName() +
                        ", <br> vaša ponuda za narudžbenicu u apoteci: " + offer.getMedicineOrderList().getPharmacy().getName() + " je odbijena. " +
                        "<br><br>S poštovanjem, <br>Vaša ISA");
    }

    public List<Offer> findAll(){
        return offerRepository.findAll();
    }

    public static String convertToDateStr(Date date, String dateFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        return sdf.format(date);
    }
}
