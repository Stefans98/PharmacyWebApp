package isa.spring.boot.pharmacy.dto.users;

import java.util.Date;

public class VacationDto {

    private Long id;
    private int vacationType;
    private Date startTime;
    private Date endTime;
    private boolean processed;
    private Long employeeId;
    private Long pharmacyId;

    public VacationDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getVacationType() {
        return vacationType;
    }

    public void setVacationType(int vacationType) {
        this.vacationType = vacationType;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public boolean getProcessed() {
        return processed;
    }

    public void setProcessed(boolean processed) {
        this.processed = processed;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getPharmacyId() {
        return pharmacyId;
    }

    public void setPharmacyId(Long pharmacyId) {
        this.pharmacyId = pharmacyId;
    }
}
