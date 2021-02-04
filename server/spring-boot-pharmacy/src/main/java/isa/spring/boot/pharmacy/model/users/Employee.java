package isa.spring.boot.pharmacy.model.users;

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

    public Employee() {
    }

    public Employee(String email, String password, String firstName, String lastName, String phoneNumber, Address address, double averageGrade) {
        super(email, password, firstName, lastName, phoneNumber, address);
        this.averageGrade = averageGrade;
    }

    public Employee(String email, String password, String firstName, String lastName, String phoneNumber, Address address) {
        super(email, password, firstName, lastName, phoneNumber, address);
    }

    public List<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<WorkDay> workDays) {
        this.workDays = workDays;
    }

    public double getAverageGrade() {
        return averageGrade;
    }

    public List<VacationRequest> getVacationRequests() {
        return vacationRequests;
    }

    public void setVacationRequests(List<VacationRequest> vacationRequests) {
        this.vacationRequests = vacationRequests;
    }

    public void setAverageGrade(double averageGrade) {
        this.averageGrade = averageGrade;
    }
}
