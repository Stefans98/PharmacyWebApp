package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineReservationDto;
import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.Patient;

public class MedicineReservationMapper {

    public static MedicineReservation convertToEntity(MedicineReservationDto dto) {
        MedicineReservation medicineReservation = new MedicineReservation();
        medicineReservation.setFinalPurchasingDate(dto.getFinalPurchasingDate());
        medicineReservation.setCanceled(false);
        return medicineReservation;
    }

    public static MedicineReservationDto convertToDto(MedicineReservation medicineReservation) {
        MedicineReservationDto medicineReservationDto = new MedicineReservationDto();
        medicineReservationDto.setFinalPurchasingDate(medicineReservation.getFinalPurchasingDate());
        medicineReservationDto.setCanceled(medicineReservation.isCanceled());
        medicineReservationDto.setMedicineId(medicineReservation.getMedicine().getId());
        medicineReservationDto.setPatientId(medicineReservation.getPatient().getId());
        medicineReservationDto.setPharmacyId(medicineReservation.getPharmacy().getId());
        return medicineReservationDto;
    }
}
