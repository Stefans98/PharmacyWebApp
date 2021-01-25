package isa.spring.boot.pharmacy.model.users;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("SystemAdministrator")
public class SystemAdministrator extends User  {

    public SystemAdministrator() {
    }
}
