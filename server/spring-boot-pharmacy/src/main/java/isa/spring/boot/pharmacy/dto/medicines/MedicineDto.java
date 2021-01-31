package isa.spring.boot.pharmacy.dto.medicines;

public class MedicineDto {
    private String name;
    private String code;
    private Long id;
    private String manufacturer;

    public MedicineDto() {}


    public MedicineDto(Long id, String name, String manufacturer) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }
}
