insert into users(id, username, email, confirmed, first_name, last_name, password, status, version)
values
    (1, 'admin', 'admin@admin.com' ,true , 'Michał', 'Tęgi', '$2y$12$v7crIdFxWNZrheOzJ5pvLOOKkhGGqXTjYrJwr1AfWVpkfm8t6T3cy', 'ACTIVE', 0),
    (2, 'user', 'user@admin.com' ,true , 'Jan', 'Pudzianowski', '$2y$12$v7crIdFxWNZrheOzJ5pvLOOKkhGGqXTjYrJwr1AfWVpkfm8t6T3cy', 'ACTIVE', 0)
;