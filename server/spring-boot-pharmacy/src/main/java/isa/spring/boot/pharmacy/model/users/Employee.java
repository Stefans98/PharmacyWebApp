package isa.spring.boot.pharmacy.model.users;

import isa.spring.boot.pharmacy.model.schedule.WorkDay;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Employee extends User {

    // ***
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WorkDay> workDays = new ArrayList<WorkDay>();

    public Employee() {
    }

    public Employee(String email, String password, String firstName, String lastName, String phoneNumber) {
        super(email, password, firstName, lastName, phoneNumber);
    }

    public List<WorkDay> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<WorkDay> workDays) {
        this.workDays = workDays;
    }
}
