package isa.spring.boot.pharmacy.service.users;

import isa.spring.boot.pharmacy.model.medicines.Medicine;
import isa.spring.boot.pharmacy.model.pharmacy.Pharmacy;
import isa.spring.boot.pharmacy.model.users.*;
import isa.spring.boot.pharmacy.repository.users.GradeRepository;
import isa.spring.boot.pharmacy.service.medicines.MedicineService;
import isa.spring.boot.pharmacy.service.pharmacy.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PharmacyService pharmacyService;

    @Autowired
    private MedicineService medicineService;

    public List<Grade> findAll() {
        return gradeRepository.findAll();
    }

    public Grade findById(long id) {
        return gradeRepository.findById(id);
    }

    public List<Grade> findByPatientId(long patientId) {
        return gradeRepository.findByPatientId(patientId);
    }
    public Grade saveDermatologistGrade(DermatologistGrade grade, long patientId, long dermatologistId) {
        if(checkIfPatientHasAlreadyGivenGrade("DERMATOLOGIST_GRADE", patientId, dermatologistId)) {
            return null;
        }
        Dermatologist dermatologist = (Dermatologist)userService.findById(dermatologistId);
        grade.setDermatologist(dermatologist);
        grade.setPatient((Patient) userService.findById(patientId));
        calculateNewAverageGradeForDermatologist(dermatologist, grade.getGrade(), false);
        return gradeRepository.save(grade);
    }

    public Grade savePharmacistGrade(PharmacistGrade grade, long patientId, long pharmacistId) {
        if(checkIfPatientHasAlreadyGivenGrade("PHARMACIST_GRADE", patientId, pharmacistId)) {
            return null;
        }
        Pharmacist pharmacist = (Pharmacist)userService.findById(pharmacistId);
        grade.setPharmacist(pharmacist);
        grade.setPatient((Patient) userService.findById(patientId));
        calculateNewAverageGradeForPharmacist(pharmacist, grade.getGrade(), false);
        return gradeRepository.save(grade);
    }

    public Grade savePharmacyGrade(PharmacyGrade grade, long patientId, long pharmacyId) {
        if(checkIfPatientHasAlreadyGivenGrade("PHARMACY_GRADE", patientId, pharmacyId)) {
            return null;
        }
        Pharmacy pharmacy = pharmacyService.findById(pharmacyId);
        grade.setPharmacy(pharmacy);
        grade.setPatient((Patient) userService.findById(patientId));
        calculateNewAverageGradeForPharmacy(pharmacy, grade.getGrade(), false);
        return gradeRepository.save(grade);
    }

    public Grade saveMedicineGrade(MedicineGrade grade, long patientId, long medicineId) {
        if(checkIfPatientHasAlreadyGivenGrade("MEDICINE_GRADE", patientId, medicineId)) {
            return null;
        }
        Medicine medicine = medicineService.findById(medicineId);
        grade.setMedicine(medicine);
        grade.setPatient((Patient) userService.findById(patientId));
        calculateNewAverageGradeForMedicine(medicine, grade.getGrade(), false);
        return gradeRepository.save(grade);
    }

    public Grade updateGrade(Grade grade, int newGrade) {
        grade.setGrade(newGrade);
        Grade updatedGrade = gradeRepository.save(grade);

        switch (grade.getDiscriminatorValue()) {
            case "DERMATOLOGIST_GRADE":
                DermatologistGrade dermatologistGrade = (DermatologistGrade) grade;
                calculateNewAverageGradeForDermatologist(dermatologistGrade.getDermatologist(), newGrade, true);
                break;
            case "PHARMACIST_GRADE":
                PharmacistGrade pharmacistGrade = (PharmacistGrade) grade;
                calculateNewAverageGradeForPharmacist(pharmacistGrade.getPharmacist(), newGrade, true);
                break;
            case "PHARMACY_GRADE":
                PharmacyGrade pharmacyGrade = (PharmacyGrade) grade;
                calculateNewAverageGradeForPharmacy(pharmacyGrade.getPharmacy(), newGrade, true);
                break;
            case "MEDICINE_GRADE":
                MedicineGrade medicineGrade = (MedicineGrade) grade;
                calculateNewAverageGradeForMedicine(medicineGrade.getMedicine(), newGrade, true);
                break;
        }
        return updatedGrade;
    }

    private boolean checkIfPatientHasAlreadyGivenGrade(String gradeType, long patientId, long id) {
        for (Grade oldGrade: findAll()) {
            if (oldGrade.getDiscriminatorValue().equals(gradeType)) {
                switch (gradeType) {
                    case "DERMATOLOGIST_GRADE":
                        DermatologistGrade dermatologistGrade = (DermatologistGrade) oldGrade;
                        if (dermatologistGrade.getDermatologist().getId() == id &&
                                dermatologistGrade.getPatient().getId() == patientId) {
                            return true;
                        }
                        break;
                    case "PHARMACIST_GRADE":
                        PharmacistGrade pharmacistGrade = (PharmacistGrade) oldGrade;
                        if (pharmacistGrade.getPharmacist().getId() == id &&
                                pharmacistGrade.getPatient().getId() == patientId) {
                            return true;
                        }
                        break;
                    case "PHARMACY_GRADE":
                        PharmacyGrade pharmacyGrade = (PharmacyGrade) oldGrade;
                        if (pharmacyGrade.getPharmacy().getId() == id &&
                                pharmacyGrade.getPatient().getId() == patientId) {
                            return true;
                        }
                        break;
                    case "MEDICINE_GRADE":
                        MedicineGrade medicineGrade = (MedicineGrade) oldGrade;
                        if (medicineGrade.getMedicine().getId() == id &&
                                medicineGrade.getPatient().getId() == patientId) {
                            return true;
                        }
                        break;
                }
            }
        }
        return false;
    }

    private void calculateNewAverageGradeForDermatologist(Dermatologist dermatologist, int grade, boolean isGradeUpdated) {
        int gradesSum = 0, numberOfGrades = 0;
        for (Grade oldGrade: findAll()) {
            if (oldGrade.getDiscriminatorValue().equals("DERMATOLOGIST_GRADE")) {
                DermatologistGrade dermatologistGrade = (DermatologistGrade) oldGrade;
                if (dermatologistGrade.getDermatologist().getId().equals(dermatologist.getId())) {
                    gradesSum += oldGrade.getGrade();
                    numberOfGrades += 1;
                }
            }
        }

        if (!isGradeUpdated) {
            dermatologist.setAverageGrade((double)(gradesSum + grade)/(numberOfGrades + 1));
        } else {
            dermatologist.setAverageGrade((double)(gradesSum)/(numberOfGrades));
        }

        userService.saveUpdatedUser(dermatologist);
    }

    private void calculateNewAverageGradeForPharmacist(Pharmacist pharmacist, int grade, boolean isGradeUpdated) {
        int gradesSum = 0, numberOfGrades = 0;
        for (Grade oldGrade: findAll()) {
            if (oldGrade.getDiscriminatorValue().equals("PHARMACIST_GRADE")) {
                PharmacistGrade pharmacistGrade = (PharmacistGrade) oldGrade;
                if (pharmacistGrade.getPharmacist().getId().equals(pharmacist.getId())) {
                    gradesSum += oldGrade.getGrade();
                    numberOfGrades += 1;
                }
            }
        }

        if (!isGradeUpdated) {
            pharmacist.setAverageGrade((double) (gradesSum + grade) / (numberOfGrades + 1));
        } else {
            pharmacist.setAverageGrade((double) (gradesSum) / (numberOfGrades));
        }
        userService.saveUpdatedUser(pharmacist);
    }

    private void calculateNewAverageGradeForPharmacy(Pharmacy pharmacy, int grade, boolean isGradeUpdated) {
        int gradesSum = 0, numberOfGrades = 0;
        for (Grade oldGrade: findAll()) {
            if (oldGrade.getDiscriminatorValue().equals("PHARMACY_GRADE")) {
                PharmacyGrade pharmacyGrade = (PharmacyGrade) oldGrade;
                if (pharmacyGrade.getPharmacy().getId().equals(pharmacy.getId())) {
                    gradesSum += oldGrade.getGrade();
                    numberOfGrades += 1;
                }
            }
        }

        if (!isGradeUpdated) {
            pharmacy.setAverageGrade((double) (gradesSum + grade) / (numberOfGrades + 1));
        } else {
            pharmacy.setAverageGrade((double) (gradesSum) / (numberOfGrades));
        }
        pharmacyService.savePharmacy(pharmacy);
    }

    private void calculateNewAverageGradeForMedicine(Medicine medicine, int grade, boolean isGradeUpdated) {
        int gradesSum = 0, numberOfGrades = 0;
        for (Grade oldGrade: findAll()) {
            if (oldGrade.getDiscriminatorValue().equals("MEDICINE_GRADE")) {
                MedicineGrade medicineGrade = (MedicineGrade) oldGrade;
                if (medicineGrade.getMedicine().getId().equals(medicine.getId())) {
                    gradesSum += oldGrade.getGrade();
                    numberOfGrades += 1;
                }
            }
        }

        if (!isGradeUpdated) {
            medicine.setAverageGrade((double) (gradesSum + grade) / (numberOfGrades + 1));
        } else {
            medicine.setAverageGrade((double) (gradesSum) / (numberOfGrades));
        }
        medicineService.save(medicine);
    }
}
