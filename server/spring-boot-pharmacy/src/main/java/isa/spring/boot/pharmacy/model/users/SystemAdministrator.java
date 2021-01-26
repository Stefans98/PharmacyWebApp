package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="system_administrators")
@DiscriminatorValue("SYSTEM_ADMIN")
public class SystemAdministrator extends User  {

    public SystemAdministrator() {
    }

    public SystemAdministrator(String email, String password, String firstName, String lastName, String phoneNumber) {
        super(email, password, firstName, lastName, phoneNumber);
    }
}
