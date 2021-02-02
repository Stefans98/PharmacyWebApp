package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.model.schedule.WorkDay;
import isa.spring.boot.pharmacy.repository.schedule.WorkDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkDayService {

    @Autowired
    WorkDayRepository workDayRepository;

    public WorkDay findById(long id) {
        return workDayRepository.findById(id);
    }
}
