package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservationState;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.MedicineReservationRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.Calendar;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private PharmacyMedicineService pharmacyMedicineService;

    public List<MedicineReservation> findAll() {
        return medicineReservationRepository.findAll();
    }

    public MedicineReservation findById(long id) {
        return medicineReservationRepository.findById(id);
    }

    public List<MedicineReservation> findByPatientId(long patientId) {
        return medicineReservationRepository.findByPatientId(patientId);
    }

    public MedicineReservation reserveMedicine(MedicineReservation medicineReservation, Long medicineId, Long pharmacyId, Long patientId) {
        if (!pharmacyMedicineService.isMedicineAvailable(medicineId, pharmacyId)) {
            return null;
        }
        pharmacyMedicineService.decrementMedicineQuantity(medicineId, pharmacyId);
        medicineReservation.setMedicine(medicineService.findById(medicineId));
        medicineReservation.setPharmacy(pharmacyService.findById(pharmacyId));
        medicineReservation.setPatient((Patient)userService.findById(patientId));

        String uniqueCode = ((new Date().getTime() / 1000L) % Integer.MAX_VALUE) + medicineReservation.getPatient().getId().toString();
        medicineReservation.setUniqueReservationCode(uniqueCode);

        try {
            emailService.sendEmailAsync(medicineReservation.getPatient(), "Rezervacija leka",
                    "Poštovani, <br><br>Uspešno ste rezervisali lek. <br> Šifra za preuzimanje je: " + uniqueCode +
                            "<br><br>S poštovanjem, <br>Vaša apoteka ISA");
        } catch( Exception ignored ){}

        return medicineReservationRepository.save(medicineReservation);
    }

    public List<MedicineReservation> getAllReservedMedicinesByPatientId(long patientId) {
        List<MedicineReservation> medicineReservations = new ArrayList<>();
        for (MedicineReservation medicineReservation : findByPatientId(patientId)) {
            if (isMedicineReservationInThePastOrCurrentDateInCurrentMonth(medicineReservation) && isPatientDeservesPenalty(medicineReservation)) {
                givePenaltyToPatient(medicineReservation);
            }
            if (medicineReservation.getMedicineReservationState() == MedicineReservationState.CREATED) {
                medicineReservations.add(medicineReservation);
            }
        }
        return medicineReservations;
    }

    public boolean isMedicineReservationInThePastOrCurrentDateInCurrentMonth(MedicineReservation medicineReservation) {
        if (medicineReservation.getFinalPurchasingDate().before(new Date()) ) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            if (!sdf.format(medicineReservation.getFinalPurchasingDate()).equals(sdf.format(new Date()))) {
                return medicineReservation.getFinalPurchasingDate().compareTo(getFirstDateInCurrentMonth()) >= 0;
            } else {
                return true;
            }
        }
        return false;
    }

    public Date getFirstDateInCurrentMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        calendar.set(Calendar.MILLISECOND,0);
        return calendar.getTime();
    }

    public boolean isPatientDeservesPenalty(MedicineReservation medicineReservation) {
        return !medicineReservation.isGotPenalty() && medicineReservation.getMedicineReservationState() == MedicineReservationState.CREATED;
    }

    public void givePenaltyToPatient(MedicineReservation medicineReservation) {
        medicineReservation.setGotPenalty(true);
        medicineReservationRepository.save(medicineReservation);
        userService.givePenaltyToPatient(medicineReservation.getPatient().getId());
    }

    public boolean cancelMedicineReservation(MedicineReservation medicineReservation) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, 1);

        if(calendar.getTime().before(medicineReservation.getFinalPurchasingDate())) {
            medicineReservation.setMedicineReservationState(MedicineReservationState.CANCELED);
            medicineReservationRepository.save(medicineReservation);
            return true;
        }
        return  false;
    }
}
