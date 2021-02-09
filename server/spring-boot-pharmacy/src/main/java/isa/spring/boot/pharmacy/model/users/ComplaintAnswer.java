package isa.spring.boot.pharmacy.model.users;

import javax.persistence.*;

@Entity
@Table(name = "complaint_answers")
public class ComplaintAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique=true, nullable=false)
    private Long id;

    @Column(name="text", nullable = false)
    private String text;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "complaint_id", referencedColumnName = "id")
    private Complaint complaint;

    public ComplaintAnswer() {
    }

    public ComplaintAnswer(Long id, String text, Complaint complaint) {
        this.id = id;
        this.text = text;
        this.complaint = complaint;
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

    public Complaint getComplaint() {
        return complaint;
    }

    public void setComplaint(Complaint complaint) {
        this.complaint = complaint;
    }
}
