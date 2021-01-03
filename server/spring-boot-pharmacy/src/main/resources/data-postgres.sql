insert into address (country, city, street) values ('Srbija', 'Beograd', 'Milosa Obilica 47');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Bulevar Oslobodjenja 30');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Danila Kisa 15');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Car Dusana 100');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Josifa Runjanina 17');
insert into address (country, city, street) values ('Srbija', 'Novi Sad', 'Ive Andrica 77');

insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('Patient', 'pera1@gmail.com', '123', 'Petar', 'Petrovic', '0605955485', 1);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('Dermatologist', 'pera2@gmail.com', '123', 'Petar', 'Petrovic', '0605955485', 2);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('Pharmacist', 'pera3@gmail.com', '123', 'Petar', 'Petrovic', '0605955485', 3);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('Supplier', 'pera4@gmail.com', '123', 'Petar', 'Petrovic', '0605955485', 4);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('PharmacyAdministrator', 'pera5@gmail.com', '123', 'Petar', 'Petrovic', '0605955485', 5);
insert into users (user_type, email, password, first_name, last_name, phone_number, address_id) values ('SystemAdministrator', 'pera6@gmail.com', '123', 'Petar', 'Petrovic', '0605955485', 6);
