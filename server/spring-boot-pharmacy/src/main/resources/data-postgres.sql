insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Danila Kisa 10');
insert into address (country, city, street) values ('Srbija', 'Beograd', 'Kralja Milutina 28');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Danila Kisa 15');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Car Dusana 100');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Josifa Runjanina 17');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Ive Andrica 77');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Milosa Obilica 47');
insert into address (country, city, street) values ('Srbija', 'Beograd', 'Bulevar Oslobodjenja 30');
insert into address (country, city, street) values ('Srbija', 'Beograd', 'Danila Kisa 15');
insert into address (country, city, street) values ('Srbija', 'Beograd', 'Car Dusana 100');
insert into address (country, city, street) values ('Srbija', 'Beograd', 'Josifa Runjanina 17');
insert into address (country, city, street) values ('Srbija', 'Beograd', 'Ive Andrica 77');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Dositejeva 20');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Mise Dimitrijevica 20');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Mise Dimitrijevica 29');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Bulevar Oslobodjenja 2');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Ive Andrica 1');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Josifa Runjanina 109');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Cirpanova 12');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Mise Dimitrijevica 35');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Bulevar Oslobodjenja 64');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Ive Andrica 27');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Josifa Runjanina 44');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Cirpanova 9');

insert into pharmacies (name, description, average_grade, address_id, longitude, latitude) values ('Jankovic apoteka', 'Najbolja apoteka u gradu', 9, 1, 19.837220, 45.249360);
insert into pharmacies (name, description, average_grade, address_id, longitude, latitude) values ('Zegin apoteka', 'Najbolja apoteka u gradu', 8.7, 2, 20.464496, 44.802587);

insert into authority (name) values ('PATIENT');
insert into authority (name) values ('PHARMACIST');
insert into authority (name) values ('DERMATOLOGIST');
insert into authority (name) values ('SUPPLIER');
insert into authority (name) values ('PHARMACY_ADMIN');
insert into authority (name) values ('SYSTEM_ADMIN');

-- svakom hešu odgovara šifra: 123
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, penalties_reset_date, user_category, account_activated) values ('PATIENT', 'patient1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 1, 33, 1, '2021-01-22 08:00:00', 1, true);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, penalties_reset_date, user_category, account_activated) values ('PATIENT', 'patient2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Tamara', 'Simic', '0605955485', 2, 10, 1, '2021-01-22 08:00:00', 0, true);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, penalties_reset_date, user_category, account_activated) values ('PATIENT', 'patient3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Dragan', 'Stefanovic', '0605955485', 3, 67, 0, '2021-01-22 08:00:00', 2, true);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, penalties_reset_date, user_category, account_activated) values ('PATIENT', 'patient4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milica', 'Jovic', '0605955485', 4, 9, 4, '2021-01-22 08:00:00', 0, true);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Jovan', 'Stevic', '0605955485', 5, 1, 7, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milan', 'Mitrovic', '0605955485', 6, 2, 5, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Nemanja', 'Milanovic', '0605955485', 7, 8);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Dragutin', 'Simic', '0605955485', 8, 9.2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SUPPLIER', 'supplier1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milos', 'Jovin', '0605955485', 9);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SUPPLIER', 'supplier2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Aleksandar', 'Milic', '0605955485', 10);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id) values ('PHARMACY_ADMIN', 'pharmacyadmin1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Predrag', 'Savanovic', '0605955485', 11, 1);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id) values ('PHARMACY_ADMIN', 'pharmacyadmin2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 12, 2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SYSTEM_ADMIN', 'systemadmin1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Sinisa', 'Mirkovic', '0605955485', 13);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SYSTEM_ADMIN', 'systemadmin2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milan', 'Jovanovic', '0605955485', 14);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 15, 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Jovan', 'Milosavljevic', '0605955485', 16, 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist5@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Mitar', 'Jovic', '0605955485', 17, 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist6@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ivan', 'Pavlovic', '0605955485', 18, 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist7@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milan', 'Todorovic', '0605955485', 19, 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Luka', 'Marinkovic', '0605955485', 20, 1, 6.2, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ivana', 'Mirkovic', '0605955485', 21, 1, 6.3, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist5@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Aleksandar', 'Jovanovic', '0605955485', 22, 1, 5.2, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist6@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ana', 'Maric', '0605955485', 23, 1, 5, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist7@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milica', 'Milic', '0605955485', 24, 2, 5, false);

insert into user_authority (user_id, authority_id) values (1, 1);
insert into user_authority (user_id, authority_id) values (2, 1);
insert into user_authority (user_id, authority_id) values (3, 1);
insert into user_authority (user_id, authority_id) values (4, 1);
insert into user_authority (user_id, authority_id) values (5, 2);
insert into user_authority (user_id, authority_id) values (6, 2);
insert into user_authority (user_id, authority_id) values (7, 3);
insert into user_authority (user_id, authority_id) values (8, 3);
insert into user_authority (user_id, authority_id) values (9, 4);
insert into user_authority (user_id, authority_id) values (10, 4);
insert into user_authority (user_id, authority_id) values (11, 5);
insert into user_authority (user_id, authority_id) values (12, 5);
insert into user_authority (user_id, authority_id) values (13, 6);
insert into user_authority (user_id, authority_id) values (14, 6);
insert into user_authority (user_id, authority_id) values (15, 3);
insert into user_authority (user_id, authority_id) values (16, 3);
insert into user_authority (user_id, authority_id) values (17, 3);
insert into user_authority (user_id, authority_id) values (18, 3);
insert into user_authority (user_id, authority_id) values (19, 3);
insert into user_authority (user_id, authority_id) values (20, 2);
insert into user_authority (user_id, authority_id) values (21, 2);
insert into user_authority (user_id, authority_id) values (22, 2);
insert into user_authority (user_id, authority_id) values (23, 2);
insert into user_authority (user_id, authority_id) values (24, 2);

insert into complaints (text, answered, complaint_type, patient_id, pharmacy_id) values ('Zalba na urednost apoteke', false, 'PHARMACY_COMPLAINT', 1, 1);
insert into complaints (text, answered, complaint_type, patient_id, dermatologist_id) values ('Zalba na ljubaznost dermatologa', false, 'DERMATOLOGIST_COMPLAINT', 1, 7);

insert into price_lists (id, pharmacy_id) values (1, 1);
insert into price_lists (id, pharmacy_id) values (2, 2);

insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (500, 0, '2021-02-8', '2021-05-19', 1);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (600, 1, '2021-02-8', '2021-05-19', 1);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (450, 0, '2021-02-8', '2021-05-19', 2);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (550, 1, '2021-02-8', '2021-05-19', 2);

insert into medicine_specifications (contraindication, daily_dose) values ('mucnina', 2);
insert into medicine_specifications (contraindication, daily_dose) values ('neprijatan osećaj ili bol u stomaku', 1);
insert into medicine_specifications (contraindication, daily_dose) values ('alergijske reakcije u vidu svraba i ospe po koži, otoka lica, usana', 3);
insert into medicine_specifications (contraindication, daily_dose) values ('bol u stomaku', 4);
insert into medicine_specifications (contraindication, daily_dose) values ('naglo oticanje šaka, stopala i članaka nogu', 1);
insert into medicine_specifications (contraindication, daily_dose) values ('sedacija(umirenje), umor, pospanost, loša kontrola pokreta, konfuzija', 1);

insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Brufen', 'L123', 0, 1, false, 6, 'Hemofarm', 5, 1);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Nimulid', 'L124', 7, 4, false, 1, 'Medik', 5, 2);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Amoksicilin', 'L125', 0, 2, true, 7, 'Hemofarm', 5, 3);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Diklofenak', 'L126', 1, 2, true, 1, 'Pharmaswis', 10, 4);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Bromazepam', 'L127', 6, 1, true, 1, 'Hemofarm', 5, 5);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Lorazepam', 'L128', 6, 1, true, 3, 'Hemofarm', 5, 6);

insert into grades (grade, grade_type, patient_id, pharmacist_id) values (7, 'PHARMACIST_GRADE', 1, 5);
insert into grades (grade, grade_type, patient_id, dermatologist_id) values (8, 'DERMATOLOGIST_GRADE', 1, 7);
insert into grades (grade, grade_type, patient_id, pharmacy_id) values (9, 'PHARMACY_GRADE', 1, 1);
insert into grades (grade, grade_type, patient_id, medicine_id) values (10, 'MEDICINE_GRADE', 1, 4);

insert into allergies (name, patient_id, medicine_id) values ('Nimulid', 1, 2);
insert into allergies (name, patient_id, medicine_id) values ('Nimulid', 2, 2);
insert into allergies (name, patient_id, medicine_id) values ('Nimulid', 3, 2);
insert into allergies (name, patient_id, medicine_id) values ('Nimulid', 4, 2);

insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (2340.24, '2021-02-8', '2021-05-19', 1, 1);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (520.45, '2021-02-8', '2021-05-19', 1, 2);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (620.45, '2021-02-8', '2021-05-19', 1, 3);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (720.45, '2021-02-8', '2021-05-19', 1, 4);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (820.45, '2021-02-8', '2021-05-19', 1, 5);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (920.45, '2021-02-8', '2021-05-19', 1, 6);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (2140.24, '2021-02-8', '2021-05-19', 2, 1);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (420.45, '2021-02-8', '2021-05-19', 2, 2);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (520.45, '2021-02-8', '2021-05-19', 2, 3);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (620.45, '2021-02-8', '2021-05-19', 2, 4);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (720.45, '2021-02-8', '2021-05-19', 2, 5);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (820.45, '2021-02-8', '2021-05-19', 2, 6);

insert into subscriptions (canceled, patient_id, pharmacy_id) values (false, 1, 1);
insert into subscriptions (canceled, patient_id, pharmacy_id) values (false, 2, 1);

insert into promotions (text, start_time, end_time, subscription_id) values ('Popust na kozmeticke preparate.', '2021-02-02', '2021-06-12', 1);

-- (1) radno vreme za pharmacist1@gmail.com
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-11 08:00:00', '2021-02-11 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-12 08:00:00', '2021-02-12 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-13 08:00:00', '2021-02-13 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-14 08:00:00', '2021-02-14 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-15 08:00:00', '2021-02-15 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-16 08:00:00', '2021-02-16 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-17 08:00:00', '2021-02-17 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-18 08:00:00', '2021-02-18 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-19 08:00:00', '2021-02-19 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-20 08:00:00', '2021-02-20 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 5, 1);

-- (12) radno vreme za pharmacist2@gmail.com
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-11 08:00:00', '2021-02-11 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-12 08:00:00', '2021-02-12 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-13 08:00:00', '2021-02-13 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-14 08:00:00', '2021-02-14 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-15 08:00:00', '2021-02-15 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-16 08:00:00', '2021-02-16 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-17 08:00:00', '2021-02-17 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-18 08:00:00', '2021-02-18 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-19 08:00:00', '2021-02-19 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-20 08:00:00', '2021-02-20 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 6, 2);

-- (23) radno vreme za ostale farmaceute
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 21, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 22, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 23, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 24, 2);

-- (28) radno vreme za dermatologist1@gmail.com (apoteka 1)
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-11 08:00:00', '2021-02-11 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-12 08:00:00', '2021-02-12 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-13 08:00:00', '2021-02-13 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-14 08:00:00', '2021-02-14 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-15 08:00:00', '2021-02-15 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-16 08:00:00', '2021-02-16 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-17 08:00:00', '2021-02-17 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-18 08:00:00', '2021-02-18 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-19 08:00:00', '2021-02-19 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-20 08:00:00', '2021-02-20 14:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 14:00:00', 7, 1);

-- (39) radno vreme za dermatologist1@gmail.com (apoteka 2)
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-11 14:00:00', '2021-02-11 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-12 14:00:00', '2021-02-12 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-13 14:00:00', '2021-02-13 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-14 14:00:00', '2021-02-14 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-15 14:00:00', '2021-02-15 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-16 14:00:00', '2021-02-16 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-17 14:00:00', '2021-02-17 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-18 14:00:00', '2021-02-18 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-19 14:00:00', '2021-02-19 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-20 14:00:00', '2021-02-20 20:00:00', 7, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 14:00:00', '2021-02-21 20:00:00', 7, 2);

-- (50) radno vreme za dermatologist2@gmail.com (apoteka 2)
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-11 08:00:00', '2021-02-11 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-12 08:00:00', '2021-02-12 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-13 08:00:00', '2021-02-13 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-14 08:00:00', '2021-02-14 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-15 08:00:00', '2021-02-15 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-16 08:00:00', '2021-02-16 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-17 08:00:00', '2021-02-17 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-18 08:00:00', '2021-02-18 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-19 08:00:00', '2021-02-19 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-20 08:00:00', '2021-02-20 20:00:00', 8, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 8, 2);

-- (61) radno vreme za ostale dermatologe
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 15, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 16, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 17, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 14:00:00', 18, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 14:00:00', '2021-02-21 20:00:00', 18, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 19, 2);

-- (67) radno vreme za pharmacist3@gmail.com
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-11 08:00:00', '2021-02-11 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-12 08:00:00', '2021-02-12 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-13 08:00:00', '2021-02-13 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-14 08:00:00', '2021-02-14 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-15 08:00:00', '2021-02-15 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-16 08:00:00', '2021-02-16 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-17 08:00:00', '2021-02-17 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-18 08:00:00', '2021-02-18 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-19 08:00:00', '2021-02-19 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-20 08:00:00', '2021-02-20 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-21 08:00:00', '2021-02-21 20:00:00', 20, 1);

-- SLOBODNI TERMINI - DERMATOLOZI
-- dermatologist1@gmail.com (apoteka 1)
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1000, 0, 0, '2021-02-18 12:00:00', '2021-02-18 13:00:00', 35, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 0, '2021-02-18 13:00:00', '2021-02-18 13:20:00', 35, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 0, '2021-02-19 12:45:00', '2021-02-19 13:00:00', 36, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 0, '2021-02-19 13:00:00', '2021-02-19 13:20:00', 36, 1, false);
-- dermatologist1@gmail.com (apoteka 2)
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1000, 0, 0, '2021-02-18 14:00:00', '2021-02-18 15:00:00', 46, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 0, 0, '2021-02-18 15:00:00', '2021-02-18 16:20:00', 46, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 0, '2021-02-19 14:45:00', '2021-02-19 15:00:00', 47, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 0, 0, '2021-02-19 15:00:00', '2021-02-19 16:20:00', 47, 1, false);
-- dermatologist2@gmail.com (apoteka 2)
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 0, '2021-02-18 14:45:00', '2021-02-18 15:00:00', 57, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 0, 0, '2021-02-18 15:00:00', '2021-02-18 16:20:00', 57, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 0, '2021-02-19 14:45:00', '2021-02-19 15:00:00', 58, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 0, 0, '2021-02-19 15:00:00', '2021-02-19 16:20:00', 58, 1, false);

-- ZAVRSENI TERMINI - DERMATOLOZI
-- dermatologist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 0, 2, '2021-02-11 08:45:00', '2021-02-11 10:00:00', 28, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-11 10:00:00', '2021-02-11 10:30:00', 28, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-11 10:30:00', '2021-02-11 11:00:00', 28, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-12 09:45:00', '2021-02-12 10:00:00', 29, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-12 10:00:00', '2021-02-12 10:30:00', 29, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-12 10:30:00', '2021-02-12 11:00:00', 29, 3, false);
-- dermatologist2@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-11 15:45:00', '2021-02-11 16:00:00', 50, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-11 16:00:00', '2021-02-11 16:30:00', 50, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 2, '2021-02-11 17:30:00', '2021-02-11 18:00:00', 50, 3, false);

-- PACIJENT SE NIJE POJAVIO - DERMATOLOZI
-- dermatologist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 3, '2021-02-11 10:20:00', '2021-02-11 10:40:00', 28, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 3, '2021-02-11 11:00:00', '2021-02-11 11:20:00', 28, 4, false);

-- OTKAZANI TERMINI - DERMATOLOZI
-- dermatologist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 4, '2021-02-15 10:45:00', '2021-02-15 11:00:00', 32, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 4, '2021-02-15 11:30:00', '2021-02-15 11:50:00', 32, 2, false);

-- ZAVRSENI TERMINI - FARMACEUTI
-- pharmacist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 1, 2, '2021-02-11 14:45:00', '2021-02-11 16:00:00', 1, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (1500, 1, 2, '2021-02-11 16:00:00', '2021-02-11 17:30:00', 1, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-11 17:30:00', '2021-02-11 18:00:00', 1, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-12 09:45:00', '2021-02-12 10:00:00', 2, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-12 10:00:00', '2021-02-12 10:30:00', 2, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-12 10:30:00', '2021-02-12 11:00:00', 2, 3, false);
-- pharmacist2@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-11 16:45:00', '2021-02-11 17:00:00', 12, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-11 17:00:00', '2021-02-11 17:30:00', 12, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 2, '2021-02-11 18:30:00', '2021-02-11 19:00:00', 12, 3, false);

-- PACIJENT SE NIJE POJAVIO - FARMACEUTI
-- pharmacist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 3, '2021-02-11 10:20:00', '2021-02-11 10:40:00', 1, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 3, '2021-02-11 11:00:00', '2021-02-11 11:20:00', 1, 4, false);

-- OTKAZANI TERMINI - FARMACEUTI
-- pharmacist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 4, '2021-02-15 10:45:00', '2021-02-15 11:00:00', 5, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 4, '2021-02-15 11:30:00', '2021-02-15 11:50:00', 5, 2, false);

-- ZAUZETI TERMINI - DERMATOLOZI
-- dermatologist1@gmail.com (apoteka 1)
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-11 08:00:00', '2021-02-11 08:20:00', 28, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-12 08:30:00', '2021-02-12 08:50:00', 29, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-13 09:00:00', '2021-02-13 09:20:00', 30, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-14 09:30:00', '2021-02-14 09:50:00', 31, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-15 10:00:00', '2021-02-15 10:20:00', 32, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-16 10:30:00', '2021-02-16 10:50:00', 33, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-17 11:00:00', '2021-02-17 11:20:00', 34, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-18 11:30:00', '2021-02-18 11:50:00', 35, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-19 12:00:00', '2021-02-19 12:20:00', 36, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-20 12:30:00', '2021-02-20 12:50:00', 37, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-21 13:00:00', '2021-02-21 13:20:00', 38, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-15 10:00:00', '2021-02-15 10:20:00', 32, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-16 10:30:00', '2021-02-16 10:50:00', 33, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-17 11:00:00', '2021-02-17 11:20:00', 34, 4, false);
-- dermatologist1@gmail.com (apoteka 2)
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-11 14:00:00', '2021-02-11 14:20:00', 39, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-12 14:30:00', '2021-02-12 14:50:00', 40, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-13 15:00:00', '2021-02-13 15:20:00', 41, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-14 15:30:00', '2021-02-14 15:50:00', 42, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-15 16:00:00', '2021-02-15 16:20:00', 43, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-16 16:30:00', '2021-02-16 16:50:00', 44, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-17 17:00:00', '2021-02-17 17:20:00', 45, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-18 17:30:00', '2021-02-18 17:50:00', 46, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-19 18:00:00', '2021-02-19 18:20:00', 47, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-20 18:30:00', '2021-02-20 18:50:00', 48, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-21 19:00:00', '2021-02-21 19:20:00', 49, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-15 16:00:00', '2021-02-15 16:20:00', 43, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-16 19:20:00', '2021-02-16 19:40:00', 44, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 0, 1, '2021-02-17 19:20:00', '2021-02-17 19:40:00', 45, 4, false);

-- ZAUZETI TERMINI - FARMACEUTI
-- pharmacist1@gmail.com
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-11 08:00:00', '2021-02-11 08:20:00', 1, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-12 08:30:00', '2021-02-12 08:50:00', 2, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-13 09:00:00', '2021-02-13 09:20:00', 3, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-14 09:30:00', '2021-02-14 09:50:00', 4, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-15 10:00:00', '2021-02-15 10:20:00', 5, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-16 10:30:00', '2021-02-16 10:50:00', 6, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-17 11:00:00', '2021-02-17 11:20:00', 7, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-18 11:30:00', '2021-02-18 11:50:00', 8, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-19 12:00:00', '2021-02-19 12:20:00', 9, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-20 12:30:00', '2021-02-20 12:50:00', 10, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-21 13:00:00', '2021-02-21 13:20:00', 11, 1, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-15 10:00:00', '2021-02-15 10:20:00', 5, 2, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-16 10:30:00', '2021-02-16 10:50:00', 6, 3, false);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id, got_penalty) values (500, 1, 1, '2021-02-17 11:00:00', '2021-02-17 11:20:00', 7, 4, false);

insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id, deleted) values ('2021-02-02', 1, 11, false);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id, deleted) values ('2021-03-02', 1, 11, false);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id, deleted) values ('2021-03-02', 1, 11, false);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id, deleted) values ('2021-03-02', 1, 12, false);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id, deleted) values ('2021-03-02', 2, 12, false);

insert into order_items (quantity, medicine_id, medicine_order_list_id) values (12, 1, 1);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (6, 2, 1);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (0, 5, 1);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (9, 6, 1);

insert into order_items (quantity, medicine_id, medicine_order_list_id) values (2, 1, 2);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (62, 2, 2);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (30, 3, 2);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (6, 4, 2);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (18, 5, 2);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (26, 6, 2);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (20, 1, 3);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (10, 4, 3);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (30, 6, 3);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (2, 1, 4);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (12, 2, 4);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (7, 6, 4);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (35, 3, 4);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (18, 5, 4);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (46, 1, 5);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (62, 3, 5);

insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 25460, '2021-09-02', 1, 9);
insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 30460, '2021-09-02', 2, 9);
insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 2060, '2021-09-02', 3, 10);
insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 105460, '2021-09-02', 4, 10);
insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 1460, '2021-09-02', 1, 9);
insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 44000, '2021-09-02', 2, 10);

insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-11', 0, false, 2, 3, 2,'16123219730');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-20', 0, false, 2, 1, 2,'16123219742');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-21', 0, false, 3, 1, 2,'16123219743');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-22', 0, false, 4, 1, 2,'16123219744');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-23', 0, false, 5, 1, 2,'16123219745');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-24', 0, false, 6, 1, 2,'16123219746');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-26', 0, false, 2, 1, 1,'16123219748');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-27', 0, false, 3, 1, 1,'16123219749');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-28', 2, false, 4, 1, 1,'16123219740');

insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 13);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 14);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 15);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 16);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 17);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 18);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 19);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 20);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 21);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 26);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 27);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 28);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 29);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 30);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 31);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 32);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 33);
insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 34);

insert into e_prescriptions(code, issuing_date, patient_id, pharmacy_id, price, e_prescription_state) values ('EPR12', '2021-11-02', 1, 1, 8000, 0);
insert into e_prescriptions(code, issuing_date, patient_id, pharmacy_id, price, e_prescription_state) values ('EPR13', '2021-10-02', 1, 1, 8000, 1);

insert into e_prescription_items (quantity, e_prescription_id, medicine_id) values (4, 1, 3);
insert into e_prescription_items (quantity, e_prescription_id, medicine_id) values (3, 2, 1);
insert into e_prescription_items (quantity, e_prescription_id, medicine_id) values (3, 1, 2);

insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (7, 1, 1, 1);
insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (5, 2, 1, 2);
insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (10, 1, 1, 3);
insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (2, 3, 1, 4);
insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (5, 1, 1, 5);
insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (7, 4, 1, 6);

insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 7);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 7);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 8);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 15);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 16);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 17);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 18);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 18);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 19);

insert into ingredients (name) values ('sastojak 1');

insert into medicine_ingredients (medicine_specification_id, ingredient_id) values (1, 1);

insert into medicine_substitutions (medicine_specification_id, medicine_id) values (1, 2);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (1, 3);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (2, 3);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (2, 4);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (3, 4);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (3, 5);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (4, 5);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (4, 6);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (5, 1);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (5, 2);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (6, 3);
insert into medicine_substitutions (medicine_specification_id, medicine_id) values (6, 4);

insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (1, 1, 10, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (1, 2, 20, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (1, 3, 12, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (1, 4, 0, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (2, 1, 8, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (2, 2, 20, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (2, 3, 12, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (2, 4, 0, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (2, 5, 5, false);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity, deleted) values (2, 6, 15, false);

insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-05', '2021-03-08', 7, 1, true);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-11', '2021-03-15', 7, 1, false);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-19', '2021-03-22', 7, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 15, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 15, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 16, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 17, 1, null);

insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-05', '2021-03-08', 5, 1, true);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-11', '2021-03-15', 5, 1, false);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-19', '2021-03-22', 5, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 20, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 21, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 21, 1, null);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (0, '2021-03-02', '2021-03-04', 22, 1, null);

insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (1, '2021-03-02', '2021-03-04', 7, 2, false);
insert into vacation_requests (vacation_type, start_time, end_time, employee_id, pharmacy_id, processed) values (1, '2021-03-02', '2021-03-04', 9, 2, false);

insert into loyalty_program (min_points, max_points, silver_points, gold_points, silver_discount, gold_discount, examination_points, counseling_points) values (0, 100, 30, 60, 5, 10, 3, 2);

insert into medicine_inquiries (employee_id, medicine_id, pharmacy_id) values (19, 1, 1);
insert into medicine_inquiries (employee_id, medicine_id, pharmacy_id) values (20, 2, 1);
insert into medicine_inquiries (employee_id, medicine_id, pharmacy_id) values (20, 3, 1);
insert into medicine_inquiries (employee_id, medicine_id, pharmacy_id) values (21, 2, 1);
insert into medicine_inquiries (employee_id, medicine_id, pharmacy_id) values (21, 6, 1);
insert into medicine_inquiries (employee_id, medicine_id, pharmacy_id) values (22, 5, 1);