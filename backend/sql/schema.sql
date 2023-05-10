--
-- All SQL statements must be on a single line and end in a semicolon.
--

-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);


DROP TABLE IF EXISTS person;
CREATE TABLE person(userID UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), shoppingCart text[] DEFAULT '{}', created TIMESTAMP WITH TIME ZONE);

DROP TABLE IF EXISTS item;
CREATE TABLE item(itemID UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), userID UUID NOT NULL, data jsonb, created TIMESTAMP WITH TIME ZONE, FOREIGN KEY (userID) REFERENCES person(userID));


-- Your database schema goes here --
