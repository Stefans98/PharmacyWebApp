package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.mapper.users.LoyaltyProgramMapper;
import isa.spring.boot.pharmacy.model.users.LoyaltyProgram;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.UserCategory;
import isa.spring.boot.pharmacy.repository.users.LoyaltyProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;

    @Autowired
    private UserService userService;

    public LoyaltyProgram save(LoyaltyProgram loyaltyProgram) {
        loyaltyProgram.setId(1L);
        loyaltyProgram.setMaxPointsLimit(100);
        return loyaltyProgramRepository.save(loyaltyProgram);
    }

    public LoyaltyProgram get() {
        return loyaltyProgramRepository.getOne(1L);
    }

    public int getDiscountByPatientCategory(long patientId) {
        Patient patient = (Patient)userService.findById(patientId);
        LoyaltyProgram loyaltyProgram = get();
        if (patient.getUserCategory() == UserCategory.SILVER) {
            return loyaltyProgram.getSilverCategoryDiscount();
        } else if (patient.getUserCategory() == UserCategory.GOLD) {
            return loyaltyProgram.getGoldCategoryDiscount();
        } else {
            return 0;
        }
    }

    public double calculatePriceBasedOnUserCategory(Long patientId, double price) {
        return price * (double) (100.0 - getDiscountByPatientCategory(patientId)) / 100.0;
    }
}
