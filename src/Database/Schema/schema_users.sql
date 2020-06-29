DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id integer PRIMARY KEY,
	first_name text NOT NULL,
	last_name text NOT NULL,
	email text UNIQUE NOT NULL,
	creation_date text NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

-- DELETE FROM users;
-- INSERT INTO users (first_name, last_name, email) VALUES 
-- ("Person", "One", "P1@mail.com"),
-- ("Person", "Two", "P2@mail.com"),
-- ("Person", "Three", "P3@mail.com"),
-- ("Person", "Four", "P4@mail.com"),
-- ("Person", "Five", "P5@mail.com"),
-- ("Person", "Six", "P6@mail.com"),
-- ("Person", "Seven", "P7@mail.com"),
-- ("Person", "Eight", "P8@mail.com"),
-- ("Person", "Nine", "P9@mail.com"),
-- ("Person", "Ten", "P10@mail.com");