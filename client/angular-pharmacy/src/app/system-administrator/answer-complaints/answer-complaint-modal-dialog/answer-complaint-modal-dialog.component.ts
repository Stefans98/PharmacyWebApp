import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplaintAnswer } from '../../../models/complaint-answer.model';
import { Complaint } from '../../../models/complaint.model';
import { ComplaintService } from '../../../services/users/complaint.service';

@Component({
  selector: 'app-answer-complaint-modal-dialog',
  templateUrl: './answer-complaint-modal-dialog.component.html',
  styleUrls: ['./answer-complaint-modal-dialog.component.scss']
})
export class AnswerComplaintModalDialogComponent implements OnInit {

  answerText : string;
  complaintText: string;

  constructor(@Inject(MAT_DIALOG_DATA) private complaint: Complaint, private complaintService: ComplaintService, 
          private dialogRef: MatDialogRef<AnswerComplaintModalDialogComponent>) {
    this.complaintText = complaint.text;
   }

  ngOnInit(): void {
  }

  sendComplaintAnswerClick() : void {
    console.log(this.complaint);
    this.complaintService.sendComplaintAnswer(new ComplaintAnswer(0, this.answerText, this.complaint.id, null)).subscribe(data => {
      this.dialogRef.close({successfull : true});
    })
  }

}
