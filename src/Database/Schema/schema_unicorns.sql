DROP TABLE IF EXISTS unicorns;
CREATE TABLE unicorns (
	unicorn_id integer PRIMARY KEY,
	name text UNIQUE NOT NULL,
	age integer NOT NULL,
	color text  NOT NULL,
	creation_date text NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

-- DELETE FROM unicorns;
-- INSERT INTO unicorns (name, age, color) VALUES 
-- ("One", 1, "Pink"),
-- ("Two", 2, "White"),
-- ("Three", 3, "Zebra");



