package isa.spring.boot.pharmacy.service.pharmacy;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservationState;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.Appointment;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.Pharmacist;
import isa.spring.boot.pharmacy.model.users.PharmacyAdministrator;
import isa.spring.boot.pharmacy.model.users.User;
import isa.spring.boot.pharmacy.repository.pharmacy.PharmacyRepository;
import isa.spring.boot.pharmacy.service.medicines.MedicineReservationService;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.schedule.AppointmentService;
import isa.spring.boot.pharmacy.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    public Pharmacy savePharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public List<Pharmacy> getPharmaciesByMedicineId(Long medicineId){
        Medicine medicine = medicineService.findById(medicineId);
        return medicine.getPharmacies();
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
        for (Medicine medicine : pharmacy.getMedicines()) {
            if (medicine.getId() == medicineId) {
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

    public List<Pharmacy> mergePharmacyMapsToList(HashMap<Long, Pharmacy> first, HashMap<Long, Pharmacy> second) {
        for (Pharmacy pharmacy : second.values()) {
            if (first.containsKey(pharmacy.getId())) {
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
        return mergePharmacyMapsToList(pharmaciesByAppointments, pharmaciesByMedicineReservations);
    }
}
