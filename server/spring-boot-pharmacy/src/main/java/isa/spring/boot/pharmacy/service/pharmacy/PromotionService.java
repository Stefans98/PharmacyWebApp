package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.pharmacy.Promotion;
import isa.spring.boot.pharmacy.model.pharmacy.Subscription;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.pharmacy.PromotionRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PromotionService {

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    EmailService emailService;

    public Promotion savePromotion(Promotion promotion, Pharmacy pharmacy){
        Promotion savedPromotion = promotionRepository.save(promotion);
        sendEmailToSubscribedPatients(pharmacy, savedPromotion);
        return savedPromotion;
    }

    public void sendEmailToSubscribedPatients(Pharmacy pharmacy, Promotion promotion){
        for(Subscription subscription : pharmacy.getSubscriptions()){
            emailService.sendEmailAsync(subscription.getPatient(), "Nova promocija",
                    "Poštovani\\-a " + subscription.getPatient().getFirstName() + " " + subscription.getPatient().getLastName() + ", <br> u toku je nova promocija u apoteci " + pharmacy.getName() + "." +
                            "<br>Datum važenja promocije od " + convertToDateStr(promotion.getStartTime(), "dd.MM.yyyy.")+ " do " + convertToDateStr(promotion.getEndTime(), "dd.MM.yyyy.") +
                            "<br><br>" + promotion.getText() +
                            "<br><br>S poštovanjem, <br>Vaša ISA");
        }
    }

    public static String convertToTimeStr(Date date, String dateFormat) {
        DateFormat timeFormat = new SimpleDateFormat(dateFormat);
        return timeFormat.format(date);
    }

    public static String convertToDateStr(Date date, String dateFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        return sdf.format(date);
    }
}
