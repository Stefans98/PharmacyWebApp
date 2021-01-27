insert into address (country, city, street) values ('Srbija', 'Beograd', 'Milosa Obilica 47');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Bulevar Oslobodjenja 30');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Danila Kisa 15');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Car Dusana 100');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Josifa Runjanina 17');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Ive Andrica 77');

insert into authority (name) values ('PATIENT');
insert into authority (name) values ('PHARMACIST');
insert into authority (name) values ('DERMATOLOGIST');
insert into authority (name) values ('SUPPLIER');
insert into authority (name) values ('PHARMACY_ADMIN');
insert into authority (name) values ('SYSTEM_ADMIN');

insert into users (user_type, email, password, first_name, last_name, phone_number, address_id, points) values ('PATIENT', 'pera1@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 1, 10);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('PHARMACIST', 'pera2@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('DERMATOLOGIST', 'pera3@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 3);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SUPPLIER', 'pera4@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 4);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('PHARMACY_ADMIN', 'pera5@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SYSTEM_ADMIN', 'pera6@gmail.com', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Petar', 'Petrovic', '0605955485', 6);

insert into user_authority (user_id, authority_id) values (1, 1);
insert into user_authority (user_id, authority_id) values (2, 2);
insert into user_authority (user_id, authority_id) values (3, 3);
insert into user_authority (user_id, authority_id) values (4, 4);
insert into user_authority (user_id, authority_id) values (5, 5);
insert into user_authority (user_id, authority_id) values (6, 6);

insert into allergies (name, patient_id) values ('prasina', 1);
insert into allergies (name, patient_id) values ('ambrozija', 1);

insert into complaints (text, patient_id) values ('Zalba na urednost apoteke', 1);
insert into complaints (text, patient_id) values ('Zalba na ljubaznost dermatologa', 1);

insert into price_lists (id) values (1);
insert into price_lists (id) values (2);

insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (1000, 0, '2021-01-29', '2021-03-29', 1);
insert into appointment_prices (price, appointment_type, start_time, end_time, pricelist_id) values (2500, 1, '2021-02-22', '2021-05-15', 2);

insert into medicine_prices (price, start_time, end_time, pricelist_id) values (2340.24, '2021-03-02', '2021-06-12', 2);
insert into medicine_prices (price, start_time, end_time, pricelist_id) values (520.45, '2021-07-12', '2021-08-19', 2);

insert into medicine_specifications (contraindication, daily_dose) values ('mucnina', 2);

insert into medicines (name, code, medicine_type, points, manufacturer, medicine_specification_id) values ('Brufen', 'brf123', 'lek protiv bolova', 6, 'Hemofarm', 1);

insert into pharmacies (name, description, average_grade, address_id) values ('Jankovic', 'Najbolja apoteka u gradu', 9.3, 1);

insert into subscriptions (patient_id, pharmacy_id) values (1, 1);

insert into promotions (text, start_time, end_time, subscription_id) values ('Popust na kozmeticke preparate.', '2021-03-02', '2021-06-12', 1);

insert into work_days (date, employee_id, pharmacy_id) values ('2021-03-02', 2, 1);

insert into appointments (price, appointment_state, appointment_type, start_time, end_time, work_day_id) values (2500, 0, 1, '2021-01-29 09:30:00', '2021-03-29 10:00:00', 1);

insert into appointment_histories (id) values (1);

insert into appointment_reports (description ,appointment_id, appointment_history_id) values ('Na pregledu je sve bilo u redu', 1, 1);

insert into medicine_order_lists (final_offer_date) values ('2021-03-02');

insert into order_items (quantity, medicine_id, medicine_order_list_id) values (12, 1, 1);

insert into offers (offer_state, price, delivery_deadline, medicine_order_list_id, supplier_id) values (2, 25460, '2021-09-02', 1, 4);

insert into ingredients (name) values ('sastojak 1');

insert into medicine_reservations (final_purchasing_date, is_canceled, medicine_id, patient_id, pharmacy_id) values ('2021-03-02', true, 1, 1, 1);

insert into e_prescriptions(code, issuing_date, patient_id) values ('eprscrpt111', '2021-03-02', 1);

insert into e_prescription_items (quantity, e_prescription_id, medicine_id) values (4, 1, 1);

insert into prescriptions (therapy_day_length, medicine_id, patient_id) values (28, 1, 1);

insert into employee_dermatologists (pharmacy_id, dermatologist_id) values (1, 3);

insert into medicine_ingredients (medicine_specification_id, ingredient_id) values (1, 1);

insert into medicine_substitutions (medicine_specification_id, medicine_id) values (1, 1);

insert into pharmacy_medicines (pharmacy_id, medicine_id) values (1, 1);

