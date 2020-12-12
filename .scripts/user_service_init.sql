insert into users(id, username, email, confirmed, first_name, last_name, password, status, version)
/*pass = qwerty123 */
values
    (1, 'admin', 'admin@admin.com' ,true , 'Michał', 'Tęgi', '$2y$12$ffY2QmJ7q2yZcEG1dfG.Z.Z9jKE1SqRzLGwRWONY9BnoSvNhzJrxi' , 'ACTIVE', 0),
    (2, 'user', 'user@admin.com' ,true , 'Jan', 'Pudzianowski', '$2y$12$ffY2QmJ7q2yZcEG1dfG.Z.Z9jKE1SqRzLGwRWONY9BnoSvNhzJrxi', 'ACTIVE', 0)
;