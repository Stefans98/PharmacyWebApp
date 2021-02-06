package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.mapper.users.LoyaltyProgramMapper;
import isa.spring.boot.pharmacy.model.users.LoyaltyProgram;
import isa.spring.boot.pharmacy.repository.users.LoyaltyProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;

    public LoyaltyProgram save(LoyaltyProgram loyaltyProgram) {
        loyaltyProgram.setId(1L);
        loyaltyProgram.setMaxPointsLimit(100);
        return loyaltyProgramRepository.save(loyaltyProgram);
    }

    public LoyaltyProgram get() {
        return loyaltyProgramRepository.getOne(1L);
    }
}
