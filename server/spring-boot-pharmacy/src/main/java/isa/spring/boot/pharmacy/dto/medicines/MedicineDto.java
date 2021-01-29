package isa.spring.boot.pharmacy.dto.medicines;

public class MedicineDto {
    private String name;
    private String code;

    public MedicineDto() {}

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
}
