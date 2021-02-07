package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.dto.schedule.WorkDayDto;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.model.users.Dermatologist;
import isa.spring.boot.pharmacy.model.users.VacationRequest;
import isa.spring.boot.pharmacy.repository.schedule.WorkDayRepository;
import isa.spring.boot.pharmacy.service.users.UserService;
import isa.spring.boot.pharmacy.service.users.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class WorkDayService {

    @Autowired
    WorkDayRepository workDayRepository;

    @Autowired
    VacationService vacationService;

    @Autowired
    UserService userService;

    public WorkDay findById(long id) {
        return workDayRepository.findById(id);
    }

    public List<WorkDay> findByEmployeeId(long employeeId) {
        return workDayRepository.findByEmployeeId(employeeId);
    }

    public WorkDay getWorkDayInPharmacyByDateAndEmployeeId(String date, String employeeId, String pharmacyId) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (WorkDay workDay: findByEmployeeId(Long.parseLong(employeeId))) {
            if (sdf.format(workDay.getStartTime()).equals(date)
                    && workDay.getPharmacy().getId() == Long.parseLong(pharmacyId)) {
                return workDay;
            }
        }
        return null;
    }

    public WorkDay definingWorkDayForDermatologist(WorkDay workDayToSave, WorkDayDto workDayDto, Dermatologist dermatologist, Pharmacy pharmacy) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for(VacationRequest vacationRequest : vacationService.getVacationRequestsBtPharmacyAndOneDermatologists(dermatologist, pharmacy.getId())){
            if(vacationRequest.getProcessed() == null){
                continue;
            }
            if(vacationRequest.getProcessed() == true) {
                if (vacationRequest.getStartTime().before(workDayToSave.getStartTime()) && vacationRequest.getEndTime().after(workDayToSave.getEntTime())) {
                    return null;
                }
            }
        }

        for (WorkDay workDay: findByEmployeeId(dermatologist.getId())) {
            if (sdf.format(workDay.getStartTime()).equals(sdf.format(workDayToSave.getStartTime()))) {
                return null;
            }
        }
        return workDayRepository.save(workDayToSave);
    }

}
