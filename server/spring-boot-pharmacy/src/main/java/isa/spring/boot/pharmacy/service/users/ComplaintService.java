package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.users.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserService userService;

    public Complaint saveDermatologistComplaint(DermatologistComplaint complaint, Long patientId, Long dermatologistId) {
        complaint.setDermatologist((Dermatologist)userService.findById(dermatologistId));
        complaint.setPatient((Patient) userService.findById(patientId));
        return complaintRepository.save(complaint);
    }

    public Complaint savePharmacistComplaint(PharmacistComplaint complaint, Long patientId, Long pharmacistId) {
        complaint.setPharmacist((Pharmacist)userService.findById(pharmacistId));
        complaint.setPatient((Patient) userService.findById(patientId));
        return complaintRepository.save(complaint);
    }
}
