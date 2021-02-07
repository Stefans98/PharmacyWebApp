package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.users.AuthorityRepository;
import isa.spring.boot.pharmacy.repository.users.VacationRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import isa.spring.boot.pharmacy.service.schedule.WorkDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class VacationService {

    @Autowired
    private VacationRepository vacationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WorkDayService workDayService;

    public VacationRequest saveVacation(VacationRequest vacationRequest, Long employeeId, Long pharmacyId) {
        Employee employee = (Employee)userService.findById(employeeId);
        Pharmacy pharmacy = pharmacyService.findById(pharmacyId);
        vacationRequest.setEmployee(employee);
        vacationRequest.setPharmacy(pharmacy);
        return vacationRepository.save(vacationRequest);
    }

    public List<VacationRequest> getVacationRequestByPharmacyAndPharmacists(Long pharmacyId){
        List<VacationRequest> vacationRequests = new ArrayList<>();
        for(Pharmacist pharmacist : userService.getAllPharmacists()){
            if(pharmacist.getPharmacy().getId() == pharmacyId){
                for(VacationRequest vacationRequest : pharmacist.getVacationRequests()) {
                    vacationRequests.add(vacationRequest);
                }
            }
        }
        return vacationRequests;
    }

    public List<VacationRequest> getVacationRequestsBtPharmacyAndOnePharmacist(Pharmacist pharmacist, Long pharmacyId){
        List<VacationRequest> vacationRequests = new ArrayList<>();
        for(VacationRequest vacationRequest : pharmacist.getVacationRequests()){
            if(vacationRequest.getPharmacy().getId() == pharmacyId){
                vacationRequests.add(vacationRequest);
            }
        }
        return vacationRequests;
    }

    public List<VacationRequest> getVacationRequestByPharmacyAndDermatologists(Long pharmacyId){
        List<VacationRequest> vacationRequests = new ArrayList<>();
        for(Dermatologist dermatologist : userService.getAllDermatologists()){
            vacationRequests.addAll(getVacationRequestsBtPharmacyAndOneDermatologists(dermatologist, pharmacyId));
        }
        return vacationRequests;
    }

    public List<VacationRequest> getVacationRequestsBtPharmacyAndOneDermatologists(Dermatologist dermatologist, Long pharmacyId){
        List<VacationRequest> vacationRequests = new ArrayList<>();
        for(VacationRequest vacationRequest : dermatologist.getVacationRequests()){
            if(vacationRequest.getPharmacy().getId() == pharmacyId){
                vacationRequests.add(vacationRequest);
            }
        }
        return vacationRequests;
    }

    public VacationRequest acceptVacationRequest(VacationRequest vacationRequest, long employeeId, long pharmacyId){
        VacationRequest savedVacationRequest;
        Employee employee = (Employee)userService.findById(employeeId);
        Pharmacy pharmacy = pharmacyService.findById(pharmacyId);
        if(vacationRequest.getProcessed() == null){
            vacationRequest.setEmployee(employee);
            vacationRequest.setPharmacy(pharmacy);
            vacationRequest.setProcessed(true);
            savedVacationRequest = vacationRepository.save(vacationRequest);
            emailService.sendEmailAsync(vacationRequest.getEmployee(), "Zahtev za godišnjim odmorom/odsustvom",
                    "Poštovani\\-a " + vacationRequest.getEmployee().getFirstName() + " " + vacationRequest.getEmployee().getLastName() + ", vaš zahtev za godišnjim odmorom/odsustvom je prihvaćen!" +
                            "<br>Trajanje: od " + convertToDateStr(vacationRequest.getStartTime(), "dd.MM.yyyy.")+ " do " + convertToDateStr(vacationRequest.getEndTime(), "dd.MM.yyyy.") +
                            "<br><br>S poštovanjem, <br>Vaša ISA");
            return savedVacationRequest;

        }
        return null;
    }

    public VacationRequest rejectVacationRequest(VacationRequest vacationRequest, String text, long employeeId, long pharmacyId){
        VacationRequest oldVacationRequest = findById(vacationRequest.getId());
        if(vacationRequest.getProcessed() == null){
            oldVacationRequest.setProcessed(false);
            VacationRequest savedVacationRequest = vacationRepository.save(oldVacationRequest);
            emailService.sendEmailAsync(oldVacationRequest.getEmployee(), "Zahtev za godišnjim odmorom/odsustvom",
                    "Poštovani\\-a " + oldVacationRequest.getEmployee().getFirstName() + " " + oldVacationRequest.getEmployee().getLastName() + ", vaš zahtev za godišnjim odmorom/odsustvom" +
                            " u trajanju od: " + convertToDateStr(oldVacationRequest.getStartTime(), "dd.MM.yyyy.")+ " do " + convertToDateStr(oldVacationRequest.getEndTime(), "dd.MM.yyyy.") + " je odbijen!" +
                            "<br>Razlog: " + text +
                            "<br><br>S poštovanjem, <br>Vaša ISA");
            return savedVacationRequest;
        }
        return null;
    }

    public static String convertToDateStr(Date date, String dateFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        return sdf.format(date);
    }

    public VacationRequest findById(long id){
        for(VacationRequest vacationRequest : vacationRepository.findAll()){
            if(vacationRequest.getId() == id){
                return vacationRequest;
            }
        }
        return null;
    }
}
