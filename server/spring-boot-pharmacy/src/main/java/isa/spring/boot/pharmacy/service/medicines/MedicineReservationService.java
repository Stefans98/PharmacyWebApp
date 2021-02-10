package isa.spring.boot.pharmacy.service.medicines;

import isa.spring.boot.pharmacy.dto.schedule.AnnualStatistics;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservationState;
import isa.spring.boot.pharmacy.model.pharmacy.MedicinePrice;
import isa.spring.boot.pharmacy.model.pharmacy.Pricelist;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.schedule.AppointmentState;
import isa.spring.boot.pharmacy.model.users.Patient;
import isa.spring.boot.pharmacy.repository.medicines.MedicineReservationRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.pharmacy.PricelistService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PricelistService pricelistService;

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
        if (pharmacyMedicineService.isMedicineAvailable(medicineId, pharmacyId) == null || userService.getPenaltiesByPatientId(patientId) > 2) {
            return null;
        }
        pharmacyMedicineService.decrementMedicineQuantity(medicineId, pharmacyId);
        medicineReservation.setMedicine(medicineService.findById(medicineId));
        medicineReservation.setPharmacy(pharmacyService.findById(pharmacyId));
        medicineReservation.setPatient((Patient)userService.findById(patientId));

        String uniqueCode = ((new Date().getTime() / 1000L) % Integer.MAX_VALUE) + medicineReservation.getPatient().getId().toString();
        medicineReservation.setUniqueReservationCode(uniqueCode);

        return medicineReservationRepository.save(medicineReservation);
    }

    public List<MedicineReservation> getAllReservedMedicinesByPatientId(long patientId) {
        List<MedicineReservation> medicineReservations = new ArrayList<>();
        for (MedicineReservation medicineReservation : findByPatientId(patientId)) {
            if (medicineReservation.getMedicineReservationState() == MedicineReservationState.CREATED) {
                medicineReservations.add(medicineReservation);
            }
        }
        return medicineReservations;
    }

    public List<MedicineReservation> getAllCompletedMedicineReservationByPatientId(long patientId) {
        List<MedicineReservation> medicineReservations = new ArrayList<>();
        for (MedicineReservation medicineReservation : findByPatientId(patientId)) {
            if (medicineReservation.getMedicineReservationState() == MedicineReservationState.COMPLETED) {
                medicineReservations.add(medicineReservation);
            }
        }
        return medicineReservations;
    }

    public void checkIfPatientGotPenaltyForMedicineReservationsThisMonth(long patientId) {
        for (MedicineReservation medicineReservation : findByPatientId(patientId)) {
            if (isMedicineReservationInThePastOrCurrentDateInCurrentMonth(medicineReservation)
                    && isPatientDeservesPenalty(medicineReservation)) {
                givePenaltyToPatient(medicineReservation);
            }
        }
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

    private void givePenaltyToPatient(MedicineReservation medicineReservation) {
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
        return false;
    }

    public List<MedicineReservation> getALlMedicineReservationsForPharmacy(Long pharmacyId) {
        List<MedicineReservation> medicineReservationsForPharmacy = new ArrayList<MedicineReservation>();
        for(MedicineReservation medicineReservation : medicineReservationRepository.findAll()) {
            if(medicineReservation.getPharmacy().getId() == pharmacyId) {
                medicineReservationsForPharmacy.add(medicineReservation);
            }
        }
        return  medicineReservationsForPharmacy;
    }

    public MedicineReservation findMedicineReservationByUniqueCode(String uniqueCode, Long pharmacyId) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, 1);

        for(MedicineReservation medicineReservation : getALlMedicineReservationsForPharmacy(pharmacyId)) {
            if(medicineReservation.getUniqueReservationCode().equals(uniqueCode) &&
                calendar.getTime().before(medicineReservation.getFinalPurchasingDate()) &&
                    medicineReservation.getMedicineReservationState() == MedicineReservationState.CREATED) {
                return medicineReservation;
            }
        }
        return null;
    }

    public MedicineReservation issueMedicineReservation(Long medicineReservationId) {
        MedicineReservation medicineReservation = findById(medicineReservationId);
        medicineReservation.setMedicineReservationState(MedicineReservationState.COMPLETED);
        return medicineReservationRepository.save(medicineReservation);
    }

    public void sendEmailForMedicineReservation(MedicineReservation medicineReservation) {
        try {
            emailService.sendEmailAsync(medicineReservation.getPatient(), "Rezervacija leka",
            "Poštovani, <br><br>Uspešno ste rezervisali lek. <br> Šifra za preuzimanje je: " + medicineReservation.getUniqueReservationCode() +
                    "<br><br>Napomena: Ukoliko ne otkažete rezervaciju leka 24h ranije ili ne preuzmete lek do datuma preuzimanja,<br>" +
                    " broj penala na Vašem nalogu će se povećati za 1. Ako dobijete više od 2 penala u trenutnom mesecu, gubite pravo<br>" +
                    " rezervacije leka, kao i zakazivanja savetovanja i pregleda za taj mesec!" +
                    "<br><br>S poštovanjem, <br>Health Pharmacy");
        } catch( Exception ignored ){}
    }

    public void sendEmailForIssuingMedicineReservation(MedicineReservation medicineReservation) {
        try {
            emailService.sendEmailAsync(medicineReservation.getPatient(), "Izdavanje rezervisanog leka",
                    "Poštovani, <br><br>Uspešno ste preuzeli lek " + medicineReservation.getMedicine().getName() +
                            "<br>koji ste rezervisali u apoteci: " + medicineReservation.getPharmacy().getName() +
                            "<br><br>S poštovanjem, <br>Health Pharmacy");
        } catch( Exception ignored ){}
    }

    public AnnualStatistics medicineStatistic(Long pharmacyId){
        AnnualStatistics annualStatistics = new AnnualStatistics();
        for(MedicineReservation medicineReservation : getALlMedicineReservationsForPharmacy(pharmacyId)){
            if(medicineReservation.getMedicineReservationState() != MedicineReservationState.COMPLETED){
                continue;
            }
            if(medicineReservation.getFinalPurchasingDate().getMonth() == 0){
                annualStatistics.setJanuary(annualStatistics.getJanuary() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 1){
                annualStatistics.setFebruary(annualStatistics.getFebruary() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 2){
                annualStatistics.setMarch(annualStatistics.getMarch() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 3){
                annualStatistics.setApril(annualStatistics.getApril() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 4){
                annualStatistics.setMay(annualStatistics.getMay() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 5){
                annualStatistics.setJun(annualStatistics.getJun() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 6){
                annualStatistics.setJuly(annualStatistics.getJuly() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 7){
                annualStatistics.setAugust(annualStatistics.getAugust() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 8){
                annualStatistics.setSeptember(annualStatistics.getSeptember() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 9){
                annualStatistics.setOctober(annualStatistics.getOctober() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 10){
                annualStatistics.setNovember(annualStatistics.getNovember() + 1);
            }else if(medicineReservation.getFinalPurchasingDate().getMonth() == 11){
                annualStatistics.setDecember(annualStatistics.getDecember() + 1);
            }
        }
        return annualStatistics;
    }

    public AnnualStatistics calculatePharmacyProfit(Long pharmacyId, Date startDate, Date endDate){
        AnnualStatistics annualStatistics = new AnnualStatistics();

        for(Appointment appointment : appointmentService.getAppointmentsForPharmacy(pharmacyId)) {
            if (appointment.getAppointmentState() != AppointmentState.FINISHED || appointment.getStartTime().before(startDate) || appointment.getStartTime().after(endDate)) {
                continue;
            }
            annualStatistics.setJanuary(annualStatistics.getJanuary() + appointment.getPrice());
        }

        for(MedicineReservation medicineReservation : getALlMedicineReservationsForPharmacy(pharmacyId)) {
            if (medicineReservation.getMedicineReservationState() != MedicineReservationState.COMPLETED || medicineReservation.getFinalPurchasingDate().before(startDate) || medicineReservation.getFinalPurchasingDate().after(endDate)) {
                continue;
            }
            Pricelist pricelist = pricelistService.findPricelistForPharmacy(pharmacyId);
            for(MedicinePrice medicinePrice : pricelist.getMedicinePrices()){
                if(medicinePrice.getMedicine().getId() == medicineReservation.getMedicine().getId()){
                    annualStatistics.setJanuary(annualStatistics.getJanuary() + medicinePrice.getPrice());
                }
            }
        }
        return annualStatistics;
    }

}
