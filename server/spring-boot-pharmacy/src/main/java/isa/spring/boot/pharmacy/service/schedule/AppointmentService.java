package isa.spring.boot.pharmacy.service.schedule;

import isa.spring.boot.pharmacy.repository.schedule.AppointmentRepository;
import isa.spring.boot.pharmacy.repository.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

}
