package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.users.ComplaintAnswerRepository;
import isa.spring.boot.pharmacy.repository.users.ComplaintRepository;
import isa.spring.boot.pharmacy.service.email.EmailService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private ComplaintAnswerRepository complaintAnswerRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private EmailService emailService;

    public List<Complaint> findAll() {
        return complaintRepository.findAll();
    }

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

    public Complaint savePharmacyComplaint(PharmacyComplaint complaint, Long patientId, Long pharmacyId) {
        complaint.setPharmacy(pharmacyService.findById(pharmacyId));
        complaint.setPatient((Patient) userService.findById(patientId));
        return complaintRepository.save(complaint);
    }

    public ComplaintAnswer saveComplaintAnswer(ComplaintAnswer complaintAnswer, Long complaintId) {
        complaintAnswer.setComplaint(complaintRepository.getOne(complaintId));
        changeComplaintStatusToAnswered(complaintId);
        return complaintAnswerRepository.save(complaintAnswer);
    }

    public void changeComplaintStatusToAnswered(Long complaintId) {
        Complaint complaint = complaintRepository.getOne(complaintId);
        complaint.setAnswered(true);
        complaintRepository.save(complaint);
    }

    public void sendComplaintAnswerMail(ComplaintAnswer complaintAnswer) {
        emailService.sendEmailAsync(complaintAnswer.getComplaint().getPatient(), "Odgovor na žalbu",
                "Poštovani\\-a " + complaintAnswer.getComplaint().getPatient().getFirstName() + " " +
                        complaintAnswer.getComplaint().getPatient().getLastName() + ", primili ste odgovor na vašu žalbu:" +
                        "<br>Tekst žalbe: " +
                        "<br>" + complaintAnswer.getComplaint().getText() +
                        "<br><br>Odgovor: " +
                        "<br>" + complaintAnswer.getText() +
                        "<br><br>S poštovanjem, <br>Vaša ISA");
    }
}
