package isa.spring.boot.pharmacy.mapper.medicines;

import isa.spring.boot.pharmacy.dto.medicines.MedicineDto;
import isa.spring.boot.pharmacy.dto.medicines.MedicineReservationDto;
import isa.spring.boot.pharmacy.dto.pharmacy.PharmacyDto;
import isa.spring.boot.pharmacy.model.medicines.MedicineReservation;

public class MedicineReservationMapper {

    public static MedicineReservation convertToEntity(MedicineReservationDto dto) {
        MedicineReservation medicineReservation = new MedicineReservation();
        medicineReservation.setFinalPurchasingDate(dto.getFinalPurchasingDate());
        medicineReservation.setCanceled(false);
        return medicineReservation;
    }

    public static MedicineReservationDto convertToDto(MedicineReservation medicineReservation, double medicinePrice) {
        MedicineReservationDto medicineReservationDto = new MedicineReservationDto();
        medicineReservationDto.setFinalPurchasingDate(medicineReservation.getFinalPurchasingDate());
        medicineReservationDto.setCanceled(medicineReservation.isCanceled());
        medicineReservationDto.setMedicineId(medicineReservation.getMedicine().getId());
        medicineReservationDto.setPatientId(medicineReservation.getPatient().getId());
        medicineReservationDto.setPharmacyId(medicineReservation.getPharmacy().getId());
        medicineReservationDto.setPharmacy(new PharmacyDto(medicineReservationDto.getId(),
                medicineReservation.getPharmacy().getName(), medicineReservation.getPharmacy().getAddress().getCity()));
        medicineReservationDto.setMedicine(new MedicineDto(medicineReservationDto.getId(),
                medicineReservation.getMedicine().getName(), medicineReservation.getMedicine().getManufacturer()));
        medicineReservationDto.setMedicinePrice(medicinePrice);
        return medicineReservationDto;
    }
}
