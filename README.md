# Internet software architecture

This web application represents a centralized pharmacy information system of pharmacies through which users will be able to book preparations (drugs) and schedule a consultation with a pharmacist or dermatologist. Both pharmacists and doctors have access to the system, who can enter reports on performed examinations, as well as schedule them for registered users. The system manages a large number of pharmacies that are registered within the information system. The main purpose of the application is to keep records of employees, registered pharmacies, drug reservations, appointments, users and their profiles.

* You can download this project from develop branch.

## Team 16 

| Student  | Name  | Surname |
| :---: | :---:  | :---:  | 
| 1  | Stefan | Savic  | 
| 2  | Aleksa | Ivanic  |
| 3  | Stefan | Beljic  |
| 4  | Matija | Mijalkovic  |

## Build Maven Project

1. Install IntelliJ IDEA from [IntelliJ IDEA Official Page](https://www.jetbrains.com/idea/download/#section=windows).
2. Open IntelliJ IDEA  
3. Import project from ..\PharmacyWebApp\server\spring-boot-pharmacy 
4. Right click on pom.xml -> Add as Maven Project
5. Wait for all dependencies to be reloaded
6. Right click on SpringBootPharmacyApplication.java -> Run
* NOTE: This project requires JDK 1.8

## Build Angular Project 

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to file project ..\PharmacyWebApp\client\angular-pharmacy
4. Run in terminal: ```npm install -g @angular/cli```
5. Then: ```npm install```
6. And: ```ng serve```
7. Navigate to: [http://localhost:4200/](http://localhost:4200/)

## Notes
* Path for QR Codes -> ..\PharmacyWebApp\server\spring-boot-pharmacy\src\main\resources\static\qr-codes
* For testing purposes we advice you to use accounts with following emails:
  * patient1@gmail.com
  * pharmacist1@gmail.com
  * dermatologist1@gmail.com
  * pharmacyadmin1@gmail.com
  * systemadmin1@gmail.com
  * supplier1@gmail.com
