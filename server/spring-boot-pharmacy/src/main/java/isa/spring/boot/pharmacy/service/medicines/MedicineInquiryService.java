package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineInquiry;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.users.Employee;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.MedicineInquiryRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicineInquiryService {

    @Autowired
    private MedicineInquiryRepository medicineInquiryRepository;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicineService medicineService;

    public MedicineInquiry saveMedicineInquiry(Long pharmacyId, Long employeeId, Long medicineId) {
        MedicineInquiry medicineInquiry = new MedicineInquiry();
        medicineInquiry.setPharmacy(pharmacyService.findById(pharmacyId));
        medicineInquiry.setEmployee((Employee) userService.findById(employeeId));
        medicineInquiry.setMedicine(medicineService.findById(medicineId));
        return medicineInquiryRepository.save(medicineInquiry);
    }
}
