import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'protractor';
import { EPrescriptionItem } from '../../../models/e-prescription-item.model';
import { EPrescriptionPharmacy } from '../../../models/e-prescription-pharmacy.model';
import { EPrescription } from '../../../models/e-prescription.model';
import { ImageSnippet } from '../../../models/image-snipet.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { EPrescriptionService } from '../../../services/medicines/e-prescription.service';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-new-e-prescription',
  templateUrl: './new-e-prescription.component.html',
  styleUrls: ['./new-e-prescription.component.scss']
})
export class NewEPrescriptionComponent implements OnInit {

  pharmacies : EPrescriptionPharmacy[] = [];
  displayedColumns: string[] = ['name', 'averageGrade', 'address', 'price', 'reservation'];
  dataSource = new MatTableDataSource(this.pharmacies);

  medicines : EPrescriptionItem[];

  selectedFile : ImageSnippet;

  constructor(private pharmacyService : PharmacyService, private eprescriptionService : EPrescriptionService, 
              private snackBar : MatSnackBar, private authService : AuthenticationService) {

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
    } else {
      this.snackBar.open('Morate selektovati fajl za obradu!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
    }
  }

  searchPharmaciesClick() : void {
    this.pharmacyService.getAllPharmaciesWithEPrescriptionItems(this.medicines).subscribe(data => {
      this.pharmacies = data;
      this.dataSource.data = this.pharmacies;
    })
  }

  medicineReservationClick(element : EPrescriptionPharmacy) : void {
    this.eprescriptionService.createNewEPrescription(new EPrescription(0, this.authService.getLoggedUserId(), new Date(),
      this.medicines, element.pharmacy.id, null, element.price)).subscribe(data => {
        this.snackBar.open('ERecept je uspešno kreiran!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
         this.pharmacies = [];
         this.dataSource.data = this.pharmacies;
         this.medicines = [];
         this.selectedFile = null
      }, error => {
        if (error.status == 406) {
          this.snackBar.open('Nemate pravo kreiranja eRecepta, jer imate više od 2 penala ovog meseca!', null, { 
            duration : 3000, 
            verticalPosition: 'top'
           });
        }
      });
  }
}
