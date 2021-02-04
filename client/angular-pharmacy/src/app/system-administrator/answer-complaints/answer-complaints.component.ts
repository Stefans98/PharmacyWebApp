import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Complaint } from '../../models/complaint.model';
import { ComplaintService } from '../../services/users/complaint.service';
import { AnswerComplaintModalDialogComponent } from './answer-complaint-modal-dialog/answer-complaint-modal-dialog.component';

@Component({
  selector: 'app-answer-complaints',
  templateUrl: './answer-complaints.component.html',
  styleUrls: ['./answer-complaints.component.scss']
})
export class AnswerComplaintsComponent implements OnInit {

  complaints : Complaint[];

  constructor(private complaintService: ComplaintService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.complaintService.getAllComplaints().subscribe(data => this.complaints = data);
   }

  ngOnInit(): void {
  }

  parseComplaintType(type : string): string {
    if (type === 'PHARMACY_COMPLAINT') {
      return 'Apoteka';
    } else if (type === 'PHARMACIST_COMPLAINT') {
      return 'Farmaceut';
    } else if (type === 'DERMATOLOGIST_COMPLAINT') {
      return 'Dermatolog';
    }
  }
  
  answerComplaintClick(complaint): void {
    const dialogRef = this.dialog.open(AnswerComplaintModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '650px',
      height: '550px',
      data: complaint
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.snackBar.open('Vaš odgovor na žalbu je poslat!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      }
    })
  }

}
