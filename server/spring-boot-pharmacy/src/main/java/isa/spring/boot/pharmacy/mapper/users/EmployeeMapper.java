package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.EmployeeDto;
import isa.spring.boot.pharmacy.model.users.Employee;

public class EmployeeMapper {

    public static EmployeeDto convertToDto(Employee employee) {
        EmployeeDto employeeDto = new EmployeeDto();

        employeeDto.setId(employee.getId());
        employeeDto.setFirstName(employee.getFirstName());
        employeeDto.setLastName(employee.getLastName());
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setPhoneNumber(employee.getPhoneNumber());
        employeeDto.setCity(employee.getAddress().getCity());
        employeeDto.setCountry(employee.getAddress().getCountry());
        employeeDto.setStreet(employee.getAddress().getStreet());
        employeeDto.setPassword(null);

        return employeeDto;
    }
}
