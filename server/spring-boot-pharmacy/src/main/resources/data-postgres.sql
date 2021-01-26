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