package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.ComplaintDto;
import isa.spring.boot.pharmacy.mapper.pharmacy.PharmacyMapper;
import isa.spring.boot.pharmacy.model.users.Complaint;
import isa.spring.boot.pharmacy.model.users.DermatologistComplaint;
import isa.spring.boot.pharmacy.model.users.PharmacistComplaint;
import isa.spring.boot.pharmacy.model.users.PharmacyComplaint;

public class ComplaintMapper {

    public static ComplaintDto convertToDto(Complaint complaint) {
        ComplaintDto dto = new ComplaintDto();

        if (complaint.getDiscriminatorValue().equals("PHARMACY_COMPLAINT")) {
            PharmacyComplaint pharmacyComplaint = (PharmacyComplaint) complaint;
            dto.setPharmacy(PharmacyMapper.convertToDto(pharmacyComplaint.getPharmacy()));
            dto.setPharmacyId(pharmacyComplaint.getPharmacy().getId());
        } else if (complaint.getDiscriminatorValue().equals("PHARMACIST_COMPLAINT")) {
            PharmacistComplaint pharmacistComplaint = (PharmacistComplaint) complaint;
            dto.setPharmacist(PharmacistMapper.convertToDto(pharmacistComplaint.getPharmacist()));
            dto.setPharmacyId(pharmacistComplaint.getPharmacist().getId());
        } else if (complaint.getDiscriminatorValue().equals("DERMATOLOGIST_COMPLAINT")) {
            DermatologistComplaint dermatologistComplaint = (DermatologistComplaint) complaint;
            dto.setDermatologist(DermatologistMapper.convertToDto(dermatologistComplaint.getDermatologist()));
            dto.setDermatologistId(dermatologistComplaint.getDermatologist().getId());
        }
        dto.setId(complaint.getId());
        dto.setText(complaint.getText());
        dto.setComplaintType(complaint.getDiscriminatorValue());

        return dto;
    }

    public static Complaint convertToEntity(ComplaintDto dto) {
        Complaint complaint = null;
        if (dto.getComplaintType().equals("PHARMACY_COMPLAINT")) {
            complaint = new PharmacyComplaint();
        } else if (dto.getComplaintType().equals("PHARMACIST_COMPLAINT")) {
            complaint = new PharmacistComplaint();
        } else if (dto.getComplaintType().equals("DERMATOLOGIST_COMPLAINT")) {
            complaint = new DermatologistComplaint();
        }

        complaint.setText(dto.getText());

        return complaint;
    }
}
