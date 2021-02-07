package isa.spring.boot.pharmacy.dto.medicines;

import isa.spring.boot.pharmacy.model.medicines.MedicineForm;
import isa.spring.boot.pharmacy.model.medicines.MedicineType;

public class MedicineDto {
    private Long id;
    private String name;
    private String code;
    private String manufacturer;
    private MedicineType medicineType;
    private MedicineForm medicineForm;
    private boolean onPrescription;
    private String additionalInformation;
    private MedicineSpecificationDto medicineSpecification;

    public MedicineDto() {}


    public MedicineDto(Long id, String name, String manufacturer) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
    }

    public MedicineDto(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public MedicineType getMedicineType() {
        return medicineType;
    }

    public void setMedicineType(MedicineType medicineType) {
        this.medicineType = medicineType;
    }

    public MedicineForm getMedicineForm() {
        return medicineForm;
    }

    public void setMedicineForm(MedicineForm medicineForm) {
        this.medicineForm = medicineForm;
    }

    public boolean isOnPrescription() {
        return onPrescription;
    }

    public void setOnPrescription(boolean onPrescription) {
        this.onPrescription = onPrescription;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public MedicineSpecificationDto getMedicineSpecification() {
        return medicineSpecification;
    }

    public void setMedicineSpecification(MedicineSpecificationDto medicineSpecificationDto) {
        this.medicineSpecification = medicineSpecificationDto;
    }
}
