insert into users(id, username, email, confirmed, first_name, last_name, password, status, version)
values (1,'admin', 'admin@admin.com' ,true , 'Test', 'Testowy', '$2y$12$J1upwVOgZ9cJcE7VewBiOuYhtTaMhgXlk5rUqvazW15PV14KGbAci', 'ACTIVE', 1);

insert into roles(id, name, project_id, user_id)
values (1, 'DEVELOPER', 1, 1);

insert into permission_codes(id, value)
values (1, 'PROJECT_READ'), (2, 'PROJECT_WRITE');

insert into permissions(id, code_id, role_id)
values (1, 1, 1), (2, 2, 1);