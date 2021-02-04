package isa.spring.boot.pharmacy.dto.users;

public class ComplaintAnswerDto {

    private Long id;
    private String text;
    private Long complaintId;
    private ComplaintDto complaint;

    public ComplaintAnswerDto() {
    }

    public ComplaintAnswerDto(Long id, String text, Long complaintId, ComplaintDto complaint) {
        this.id = id;
        this.text = text;
        this.complaintId = complaintId;
        this.complaint = complaint;
    }

    public ComplaintAnswerDto(String text) {
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public ComplaintDto getComplaint() {
        return complaint;
    }

    public void setComplaint(ComplaintDto complaint) {
        this.complaint = complaint;
    }
}
