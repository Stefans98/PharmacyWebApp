import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EPrescriptionItem } from '../../../models/e-prescription-item.model';
import { ImageSnippet } from '../../../models/image-snipet.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { EPrescriptionService } from '../../../services/medicines/e-prescription.service';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-new-e-prescription',
  templateUrl: './new-e-prescription.component.html',
  styleUrls: ['./new-e-prescription.component.scss']
})
export class NewEPrescriptionComponent implements OnInit {

  pharmacies : Pharmacy[] = [];
  displayedColumns: string[] = ['name', 'averageGrade', 'address'];
  dataSource = new MatTableDataSource(this.pharmacies);

  medicines : EPrescriptionItem[];

  selectedFile : ImageSnippet;

  constructor(private pharmacyService : PharmacyService, private eprescriptionService : EPrescriptionService, 
              private snackBar : MatSnackBar) {

   }

  ngOnInit(): void {
  }

  processFile(imageInput : any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  convertClick() : void {
    if (this.selectedFile) {
      this.eprescriptionService.decodeQrCode(this.selectedFile.file).subscribe( data => {
          this.medicines = data;
        },
        err => {
          this.snackBar.open('Došlo je do greške prilikom obrade fajla!', null, { 
            duration : 3000, 
            verticalPosition: 'top'
           });
        })
    }
    
  }
}
