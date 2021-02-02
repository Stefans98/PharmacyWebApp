package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.Prescription;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.PrescriptionRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

    public Prescription savePrescription(Prescription prescription, Long medicineId, Long patientId, Long pharmacyId) {
        if(userService.isPatientAllergicToMedicine(prescription.getPatient().getId(), prescription.getMedicine().getId())) {
            return null;
        }
        pharmacyMedicineService.decrementMedicineQuantity(prescription.getMedicine().getId(), pharmacyId);
        prescription.setMedicine(medicineService.findById(medicineId));
        prescription.setPatient((Patient)userService.findById(patientId));
        return prescriptionRepository.save(prescription);
    }
}
