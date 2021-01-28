package isa.spring.boot.pharmacy.dto.users;


import isa.spring.boot.pharmacy.model.users.UserCategory;

public class PatientDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String city;
    private String country;
    private String street;
    private String email;
    private String phoneNumber;
    private String password;
    private int points;
    private int userCategory;


    public PatientDto() {
    }


    public PatientDto(String firstName, String lastName, String city, String country, String street,
                      String email, String phoneNumber, String password, int points, int userCategory) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.country = country;
        this.street = street;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.points = points;
        this.userCategory = userCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getUserCategory() {
        return userCategory;
    }

    public void setUserCategory(int userCategory) {
        this.userCategory = userCategory;
    }
}
