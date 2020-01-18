-- DROP DATABASE IF EXISTS wwaggregates;

-- CREATE DATABASE wwaggregates;

-- USE products;

/*    Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *    to create the database and the tables.*/

    -- from package.json
    -- "react-native": "https://github.com/expo/react-native/archive/sdk-36.0.0.tar.gz",


--------------------------------------------------------------------


CREATE TABLE products (
  ID SERIAL PRIMARY KEY,
  barcode VARCHAR(55),
  name VARCHAR(55),
  nutritionlabel VARCHAR(55)
);

INSERT INTO products (barcode, name, nutritionLabel) VALUES (42069, 'blaze it', 'THC 69%');
INSERT INTO products (barcode, name, nutritionLabel) VALUES ('m1lk', 'milk', 'nutrition label info 1');
INSERT INTO products (barcode, name, nutritionLabel) VALUES (3995, 'eggs', 'nutrition label info 2');
INSERT INTO products (barcode, name, nutritionLabel) VALUES ('br34d', 'bread', 'nutrition label info 3');
INSERT INTO products (barcode, name, nutritionLabel) VALUES (1, 'name1', 'nutrition label info 1');
INSERT INTO products (barcode, name, nutritionLabel) VALUES (2, 'name2', 'nutrition label info 2');
