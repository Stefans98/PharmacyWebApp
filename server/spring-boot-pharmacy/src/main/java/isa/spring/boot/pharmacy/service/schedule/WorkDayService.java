package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.repository.schedule.WorkDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class WorkDayService {

    @Autowired
    WorkDayRepository workDayRepository;

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
}
