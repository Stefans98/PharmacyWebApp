package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.medicines.MedicineInquiry;
import isa.spring.boot.pharmacy.model.schedule.WorkDay;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Employee extends User {

    @Column(name = "average_grade")
    private double averageGrade;

    // ***
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WorkDay> workDays = new ArrayList<WorkDay>();

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<VacationRequest> vacationRequests = new ArrayList<VacationRequest>();

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicineInquiry> medicineInquiries;

    public Employee() {
    }

    public Employee(String email, String password, String firstName, String lastName, String phoneNumber, Address address, double averageGrade) {
        super(email, password, firstName, lastName, phoneNumber, address);
        this.averageGrade = averageGrade;
    }

    public Employee(String email, String password, String firstName, String lastName, String phoneNumber, Address address) {
        super(email, password, firstName, lastName, phoneNumber, address);
    }

    public double getAverageGrade() {
        return averageGrade;
    }

    public void setAverageGrade(double averageGrade) {
        this.averageGrade = averageGrade;
    }

    public List<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<WorkDay> workDays) {
        this.workDays = workDays;
    }

    public List<VacationRequest> getVacationRequests() {
        return vacationRequests;
    }

    public void setVacationRequests(List<VacationRequest> vacationRequests) {
        this.vacationRequests = vacationRequests;
    }

    public List<MedicineInquiry> getMedicineInquiries() {
        return medicineInquiries;
    }

    public void setMedicineInquiries(List<MedicineInquiry> medicineInquiries) {
        this.medicineInquiries = medicineInquiries;
    }
}
