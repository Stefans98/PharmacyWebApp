package isa.spring.boot.pharmacy.model.users;

import javax.persistence.Column;

public class Employee extends User {

    public Employee() {
    }

    public Employee(String email, String password, String firstName, String lastName, String phoneNumber) {
        super(email, password, firstName, lastName, phoneNumber);
    }
}
