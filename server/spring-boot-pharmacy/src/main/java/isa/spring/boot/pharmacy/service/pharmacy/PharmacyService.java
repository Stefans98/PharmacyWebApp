package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.model.medicines.*;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.users.Address;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.repository.pharmacy.PharmacyRepository;
import isa.spring.boot.pharmacy.service.medicines.EPrescriptionService;
import isa.spring.boot.pharmacy.service.medicines.MedicineReservationService;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private MedicinePriceService medicinePriceService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private MedicineReservationService medicineReservationService;

    @Autowired
    private EPrescriptionService ePrescriptionService;

    public List<Pharmacy> getAllPharmacies(){
        return pharmacyRepository.findAll();
    }

    public Pharmacy findById(long id) {
        return pharmacyRepository.findById(id);
    }

    public Pharmacy getPharmacyByPharmacyAdmin(Long pharmacyAdministratorId) {
        PharmacyAdministrator pharmacyAdministrator = (PharmacyAdministrator) userService.findById(pharmacyAdministratorId);
        return pharmacyAdministrator.getPharmacy();
    }

    public Pharmacy getPharmacyByPharmacist(Long pharmacistId) {
        Pharmacist pharmacist = (Pharmacist) userService.findById(pharmacistId);
        return pharmacist.getPharmacy();
    }

    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy updatePharmacy(PharmacyDto pharmacyDto) {
        Pharmacy oldPharmacy = findById(pharmacyDto.getId());
        oldPharmacy.setName(pharmacyDto.getName());
        oldPharmacy.setAddress(new Address(pharmacyDto.getCountry(), pharmacyDto.getCity(), pharmacyDto.getStreet()));
        oldPharmacy.setLatitude(pharmacyDto.getLatitude());
        oldPharmacy.setLongitude(pharmacyDto.getLongitude());
        oldPharmacy.setDescription(pharmacyDto.getDescription());
        return pharmacyRepository.save(oldPharmacy);
    }

    public List<Pharmacy> getPharmaciesWithAvailablePharmacistsByDateTime(String reservationDate, String startTime, String endTime) {
        List<Pharmacy> pharmacies = new ArrayList<>();
        for (Pharmacy pharmacy : findAll()) {
            Appointment newAppointment = new Appointment();
            newAppointment.setStartTime(convertDateStrToDate(startTime, "yyyy-MM-dd HH:mm"));
            newAppointment.setEndTime(convertDateStrToDate(endTime, "yyyy-MM-dd HH:mm"));
            if (appointmentService.isAppointmentFreeToSchedule(newAppointment,
                    appointmentService.getOccupiedCounselingTermsForPharmacyByDate(pharmacy.getId(), convertDateStrToDate(reservationDate, "yyyy-MM-dd HH:mm")))) {
                for (Pharmacist pharmacist : userService.getPharmacistsForPharmacy(pharmacy.getId())) {
                    if (appointmentService.isEmployeeWorkDayValid(newAppointment, pharmacist.getId())){
                        pharmacies.add(pharmacy);
                    }
                }
            }
        }
        return pharmacies;
    }

    public List<Pharmacy> getPharmaciesByMedicineId(Long medicineId){
        Medicine medicine = medicineService.findById(medicineId);
        List<Pharmacy> pharmacies = new ArrayList<Pharmacy>();
        for(PharmacyMedicine pharmacyMedicine : medicine.getPharmacyMedicines()) {
            if(pharmacyMedicine.getMedicine().getId() == medicineId) {
                pharmacies.add(pharmacyMedicine.getPharmacy());
            }
        }
        return pharmacies;
    }

    public Pharmacy getPharmacyForPharmacist(Long pharmacistId) {
        for(Pharmacist pharmacist : userService.getAllPharmacists()) {
            if(pharmacist.getId() == pharmacistId) {
                return pharmacist.getPharmacy();
            }
        }
        return null;
    }

    public List<Pharmacy> getPharmaciesForDermatologist(Long dermatologistId) {
        for(Dermatologist dermatologist : userService.getAllDermatologists()) {
            if(dermatologist.getId() == dermatologistId) {
                return dermatologist.getPharmacies();
            }
        }
        return null;
    }

    public double getMedicinePriceFromPharmacy(Long medicineId, Long pharmacyId) {
        Pharmacy pharmacy = findById(pharmacyId);
        for(PharmacyMedicine pharmacyMedicine : pharmacy.getPharmacyMedicines()) {
            if(pharmacyMedicine.getMedicine().getId() == medicineId) {
                return medicinePriceService.getMedicinePriceByMedicineId(medicineId);
            }
        }
        return 0.0;
    }

    public HashMap<Long, Pharmacy> getPharmaciesForAppointments(List<Appointment> appointments) {
        HashMap<Long, Pharmacy> pharmacies = new HashMap<>();
        for (Appointment appointment : appointments) {
            Long pharmacyId = appointment.getWorkDay().getPharmacy().getId();
            pharmacies.put(pharmacyId, findById(pharmacyId));
        }
        return pharmacies;
    }

    public HashMap<Long, Pharmacy> getPharmaciesForMedicineReservations(List<MedicineReservation> reservations) {
        HashMap<Long, Pharmacy> pharmacies = new HashMap<>();
        for (MedicineReservation medicineReservation : reservations) {
            if (medicineReservation.getMedicineReservationState() == MedicineReservationState.COMPLETED) {
                Long pharmacyId = medicineReservation.getPharmacy().getId();
                pharmacies.put(pharmacyId, findById(pharmacyId));
            }
        }
        return pharmacies;
    }

    public HashMap<Long, Pharmacy> getPharmaciesForEPrescription(List<EPrescription> prescriptions) {
        HashMap<Long, Pharmacy> pharmacies = new HashMap<>();
        for (EPrescription ePrescription : prescriptions) {
            if (ePrescription.getePrescriptionState() == EPrescriptionState.CONFIRMED) {
                Long pharmacyId = ePrescription.getPharmacy().getId();
                pharmacies.put(pharmacyId, findById(pharmacyId));
            }
        }
        return pharmacies;
    }

    public List<Pharmacy> mergePharmacyMapsToList(HashMap<Long, Pharmacy> first, HashMap<Long, Pharmacy> second, HashMap<Long, Pharmacy> third) {
        for (Pharmacy pharmacy : second.values()) {
            if (!first.containsKey(pharmacy.getId())) {
                first.put(pharmacy.getId(), pharmacy);
            }
        }
        for (Pharmacy pharmacy : third.values()) {
            if (!first.containsKey(pharmacy.getId())) {
                first.put(pharmacy.getId(), pharmacy);
            }
        }
        return new ArrayList<Pharmacy>(first.values());
    }

    public List<Pharmacy> getPharmaciesForPatientAppointmentsAndReservations(Long patientId) {
        HashMap<Long, Pharmacy> pharmaciesByAppointments =
                getPharmaciesForAppointments(appointmentService.getAllCompletedAppointmentsForPatient(patientId));
        HashMap<Long, Pharmacy> pharmaciesByMedicineReservations =
                getPharmaciesForMedicineReservations(medicineReservationService.getAllReservedMedicinesByPatientId(patientId));
        HashMap<Long, Pharmacy> pharmaciesByEPrescriptions =
                getPharmaciesForEPrescription(ePrescriptionService.getEPrescriptionsForPatient(patientId));
        return mergePharmacyMapsToList(pharmaciesByAppointments, pharmaciesByMedicineReservations, pharmaciesByEPrescriptions);
    }

    public List<Pharmacy> findAll(){
        return pharmacyRepository.findAll();
    }

    public Pharmacy getPharmacyById(Long id){
        for(Pharmacy pharmacy : findAll()){
            if(pharmacy.getId() == id){
                return pharmacy;
            }
        }
        return null;
    }

    public List<PharmacyDto> removePharmaciesDuplicates(List<PharmacyDto> pharmaciesDto){
        Map<Long, PharmacyDto> map = new HashMap<>();
        List<PharmacyDto> pharmaciesDtoWithoutDuplicates = new ArrayList<>();
        for(PharmacyDto p: pharmaciesDto){
            map.put(p.getId(), p);
        }
        for (Long id: map.keySet()) {
            pharmaciesDtoWithoutDuplicates.add(map.get(id));
        }
        return pharmaciesDtoWithoutDuplicates;
    }

    public Date convertDateStrToDate(String dateStr, String format) {
        SimpleDateFormat df = new SimpleDateFormat(format);
        Date date = new Date();
        try {
            date = df.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }


}
