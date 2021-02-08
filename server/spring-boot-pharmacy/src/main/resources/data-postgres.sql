insert into address (country, city, street) values ('Srbija', 'Beograd', 'Milosa Obilica 47');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Bulevar Oslobodjenja 30');
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

insert into pharmacies (name, description, average_grade, address_id) values ('Jankovic apoteka', 'Najbolja apoteka u gradu', 9.3, 1);
insert into pharmacies (name, description, average_grade, address_id) values ('Zegin apoteka', 'Najbolja apoteka u gradu', 8.7, 2);

insert into authority (name) values ('PATIENT');
insert into authority (name) values ('PHARMACIST');
insert into authority (name) values ('DERMATOLOGIST');
insert into authority (name) values ('SUPPLIER');
insert into authority (name) values ('PHARMACY_ADMIN');
insert into authority (name) values ('SYSTEM_ADMIN');

-- svakom hešu odgovara šifra: 123
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, user_category) values ('PATIENT', 'patient1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 1, 33, 0, 1);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, user_category) values ('PATIENT', 'patient2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 2, 10, 1, 0);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, user_category) values ('PATIENT', 'patient3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 3, 67, 0, 2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points, penalty, user_category) values ('PATIENT', 'patient4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 4, 9, 4, 0);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 5, 1, 8.7, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milan', 'Milic', '0605955485', 6, 2, 9.8, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 7, 8.7);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 8, 9.2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SUPPLIER', 'supplier1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 9);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SUPPLIER', 'supplier2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 10);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id) values ('PHARMACY_ADMIN', 'pharmacyadmin1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 11, 1);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id) values ('PHARMACY_ADMIN', 'pharmacyadmin2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 12, 2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SYSTEM_ADMIN', 'systemadmin1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 13);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SYSTEM_ADMIN', 'systemadmin2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 14);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 15, 5.3);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Jovan', 'Milosavljevic', '0605955485', 16, 6.7);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist5@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Mitar', 'Jovic', '0605955485', 17, 7.8);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist6@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ivan', 'Pavlovic', '0605955485', 18, 8.4);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, average_grade) values ('DERMATOLOGIST', 'dermatologist7@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milan', 'Todorovic', '0605955485', 19, 9.1);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Luka', 'Marinkovic', '0605955485', 20, 1, 5.6, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ivana', 'Mirkovic', '0605955485', 21, 1, 8.9, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist5@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Aleksandar', 'Jovanovic', '0605955485', 22, 1, 9.3, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist6@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Ana', 'Maric', '0605955485', 23, 1, 6.2, false);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, pharmacy_id, average_grade, deleted) values ('PHARMACIST', 'pharmacist7@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Milica', 'Milic', '0605955485', 24, 2, 7.8, false);

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

insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (500, 0, '2021-01-29', '2021-03-29', 1);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (600, 1, '2021-01-29', '2021-03-29', 1);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (450, 0, '2021-02-22', '2021-05-15', 2);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (550, 1, '2021-02-22', '2021-05-15', 2);

insert into medicine_specifications (contraindication, daily_dose) values ('mucnina', 2);
insert into medicine_specifications (contraindication, daily_dose) values ('neprijatan osećaj ili bol u stomaku', 1);
insert into medicine_specifications (contraindication, daily_dose) values ('alergijske reakcije u vidu svraba i ospe po koži, otoka lica, usana', 3);
insert into medicine_specifications (contraindication, daily_dose) values ('bol u stomaku', 4);
insert into medicine_specifications (contraindication, daily_dose) values ('naglo oticanje šaka, stopala i članaka nogu', 1);
insert into medicine_specifications (contraindication, daily_dose) values ('sedacija(umirenje), umor, pospanost, loša kontrola pokreta, konfuzija', 1);

insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Brufen', 'L123', 0, 1, false, 6, 'Hemofarm', 0.0, 1);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Nimulid', 'L124', 7, 4, false, 1, 'Medik', 0.0, 2);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Amoksicilin', 'L125', 0, 2, true, 7, 'Hemofarm', 0.0, 3);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Diklofenak', 'L126', 1, 2, true, 1, 'Pharmaswis', 0.0, 4);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Bromazepam', 'L127', 6, 1, true, 1, 'Hemofarm', 0.0, 5);
insert into medicines (name, code, medicine_type, medicine_form, on_prescription, points, manufacturer, average_grade, medicine_specification_id) values ('Lorazepam', 'L128', 6, 1, true, 3, 'Hemofarm', 0.0, 6);

insert into allergies (name, patient_id, medicine_id) values ('Brufen', 1, 1);
insert into allergies (name, patient_id, medicine_id) values ('Lorazepam', 1, 6);
insert into allergies (name, patient_id, medicine_id) values ('Nimulid', 2, 2);

insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (2340.24, '2021-03-02', '2021-06-12', 2, 1);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (520.45, '2021-07-12', '2021-08-19', 2, 2);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (620.45, '2021-08-12', '2021-09-19', 1, 3);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (720.45, '2021-09-12', '2021-10-19', 1, 4);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (820.45, '2021-10-12', '2021-11-19', 2, 5);
insert into medicine_prices (price, start_time, end_time, pricelist_id, medicine_id) values (920.45, '2021-11-12', '2021-12-19', 2, 6);

insert into subscriptions (canceled, patient_id, pharmacy_id) values (false, 1, 1);
insert into subscriptions (canceled, patient_id, pharmacy_id) values (false, 2, 1);

insert into promotions (text, start_time, end_time, subscription_id) values ('Popust na kozmeticke preparate.', '2021-03-02', '2021-06-12', 1);

insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-03-02 08:00:00', '2021-03-02 20:00:00', 5, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-03-02 08:00:00', '2021-03-02 20:00:00', 6, 2);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-03-02 08:00:00', '2021-03-02 20:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-03-02 08:00:00', '2021-03-02 20:00:00', 8, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-03-02 08:00:00', '2021-03-02 20:00:00', 20, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-08 08:00:00', '2021-02-08 20:00:00', 7, 1);
insert into work_days (start_time, end_time, employee_id, pharmacy_id) values ('2021-02-08 08:00:00', '2021-02-08 20:00:00', 5, 1);

insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 1, '2021-02-02 17:30:00', '2021-02-02 17:40:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 1, '2021-02-05 04:45:00', '2021-02-05 04:45:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 1, '2021-02-04 04:57:00', '2021-02-04 05:57:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 0, '2021-02-03 14:30:00', '2021-02-03 14:40:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 0, '2021-03-02 14:30:00', '2021-03-02 14:40:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 0, 0, '2021-03-02 14:45:00', '2021-03-02 14:55:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 1, '2021-03-02 15:00:00', '2021-03-02 15:30:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 2, '2021-03-02 15:35:00', '2021-03-02 15:50:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 3, '2021-03-02 15:55:00', '2021-03-02 16:16:00', 3, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (2500, 0, 3, '2021-03-02 16:30:00', '2021-03-02 16:40:00', 3, 2);

insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 1, '2021-03-02 08:00:00', '2021-03-02 08:25:00', 1, 3);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 1, '2021-03-02 08:30:00', '2021-03-02 09:00:00', 1, 1);

insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 1, '2021-03-02 08:00:00', '2021-03-02 08:25:00', 2, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 2, '2021-03-02 10:10:00', '2021-03-02 10:30:00', 2, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 3, '2021-03-02 10:35:00', '2021-03-02 10:45:00', 2, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 3, '2021-03-02 10:55:00', '2021-03-02 11:10:00', 2, 1);

insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 0, 1, '2021-02-08 10:35:00', '2021-02-08 10:45:00', 6, 1);
insert into appointments (price, appointment_type, appointment_state, start_time, end_time, work_day_id, patient_id) values (1500, 1, 1, '2021-02-08 11:35:00', '2021-02-08 11:45:00', 7, 1);

insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id) values ('2021-02-02', 1, 11);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id) values ('2021-03-02', 1, 11);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id) values ('2021-03-02', 1, 11);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id) values ('2021-03-02', 1, 12);
insert into medicine_order_lists (final_offer_date, pharmacy_id, pharmacy_administrator_id) values ('2021-03-02', 2, 12);

insert into order_items (quantity, medicine_id, medicine_order_list_id) values (12, 1, 1);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (6, 2, 1);
insert into order_items (quantity, medicine_id, medicine_order_list_id) values (3, 5, 1);
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

insert into ingredients (name) values ('sastojak 1');

insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-04-12', 0, false, 1, 1, 1,'16123219741');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-03-02', 1, false, 1, 1, 1,'16123218541');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-01-01', 0, false, 1, 1, 1,'16123214391');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-01', 0, false, 1, 1, 1,'16123213631');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-02-02', 0, false, 1, 1, 1,'16123211631');
insert into medicine_reservations (final_purchasing_date, medicine_reservation_state, got_penalty, medicine_id, patient_id, pharmacy_id, unique_reservation_code) values ('2021-03-03', 0, false, 1, 2, 1,'16123213641');

insert into appointment_reports (description ,appointment_id) values ('Na pregledu je sve bilo u redu', 1);

insert into e_prescriptions(code, issuing_date, patient_id) values ('eprscrpt111', '2021-03-02', 1);

insert into e_prescription_items (quantity, e_prescription_id, medicine_id) values (4, 1, 1);

insert into prescriptions (therapy_day_length, medicine_id, patient_id, appointment_report_id) values (28, 1, 1, 1);

insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 7);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 7);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 8);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 15);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 16);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 17);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 18);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 18);
insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (2, 19);

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

insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (1, 1, 10);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (1, 2, 20);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (1, 3, 12);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (1, 4, 0);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (1, 5, 5);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (1, 6, 15);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (2, 1, 10);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (2, 2, 20);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (2, 3, 12);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (2, 4, 0);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (2, 5, 5);
insert into pharmacy_medicines (pharmacy_id, medicine_id, quantity) values (2, 6, 15);

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

insert into loyalty_program (min_points, max_points, silver_points, gold_points, silver_discount, gold_discount, examination_points, counseling_points) values (0, 100, 30, 60, 5, 10, 3, 2)