package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.MedicineReservationRepository;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineReservationService {

    @Autowired
    private MedicineReservationRepository medicineReservationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private MedicineService medicineService;

    public List<MedicineReservation> findAll() {
        return medicineReservationRepository.findAll();
    }

    public MedicineReservation reserveMedicine(MedicineReservation medicineReservation, Long medicineId, Long pharmacyId, Long patientId) {
        medicineReservation.setMedicine(medicineService.findById(medicineId));
        medicineReservation.setPharmacy(pharmacyService.findById(pharmacyId));
        medicineReservation.setPatient((Patient)userService.findById(patientId));
        return medicineReservationRepository.save(medicineReservation);
    }

    public List<MedicineReservation> getAllReservedMedicinesByPatientId(long patientId) {
        List<MedicineReservation> medicineReservations = new ArrayList<>();
        for (MedicineReservation medicineReservation : findAll()) {
            if (medicineReservation.getPatient().getId() == patientId) {
                medicineReservations.add(medicineReservation);
            }
        }
        return medicineReservations;
    }
}
