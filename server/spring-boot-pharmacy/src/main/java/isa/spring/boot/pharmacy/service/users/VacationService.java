package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Authority;
import isa.spring.boot.pharmacy.model.users.Employee;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.model.users.VacationRequest;
import isa.spring.boot.pharmacy.repository.users.AuthorityRepository;
import isa.spring.boot.pharmacy.repository.users.VacationRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VacationService {

    @Autowired
    private VacationRepository vacationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    public VacationRequest saveVacation(VacationRequest vacationRequest, Long employeeId, Long pharmacyId) {
        Employee employee = (Employee)userService.findById(employeeId);
        Pharmacy pharmacy = pharmacyService.findById(pharmacyId);
        vacationRequest.setEmployee(employee);
        vacationRequest.setPharmacy(pharmacy);
        return  vacationRepository.save(vacationRequest);
    }

}
