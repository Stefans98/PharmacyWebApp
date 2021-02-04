package isa.spring.boot.pharmacy.mapper.users;

import isa.spring.boot.pharmacy.dto.users.ComplaintAnswerDto;
import isa.spring.boot.pharmacy.model.users.*;

public class ComplaintAnswerMapper {

    public static ComplaintAnswerDto convertToDto(ComplaintAnswer complaintAnswer) {
        ComplaintAnswerDto dto = new ComplaintAnswerDto();

        dto.setId(complaintAnswer.getId());
        dto.setText(complaintAnswer.getText());

        return dto;
    }

    public static ComplaintAnswer convertToEntity(ComplaintAnswerDto dto) {
        ComplaintAnswer complaintAnswer = new ComplaintAnswer();

        complaintAnswer.setText(dto.getText());

        return complaintAnswer;
    }
}
