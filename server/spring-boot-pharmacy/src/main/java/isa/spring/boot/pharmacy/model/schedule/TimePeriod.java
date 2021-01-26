package isa.spring.boot.pharmacy.model.schedule;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

public class TimePeriod {

    private Date startTime;
    private Date endTime;

    public TimePeriod() {
    }

    public TimePeriod(Date startTime, Date endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
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
}
