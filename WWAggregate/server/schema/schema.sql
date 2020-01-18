DROP DATABASE IF EXISTS wwaggregate;
CREATE DATABASE wwaggregate;
\c wwaggregate

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  ID SERIAL PRIMARY KEY,
  barcode VARCHAR(255),
  name VARCHAR(255),
  nutrition VARCHAR(255)
);

USE products;
INSERT INTO products (barcode, name, nutrition) VALUES (1, 'name1', 'nutrition label info 1');
INSERT INTO products (barcode, name, nutrition) VALUES (2, 'name2', 'nutrition label info 2');
INSERT INTO products (barcode, name, nutrition) VALUES (42069, 'weed', 'THC 69%');
INSERT INTO products (barcode, name, nutrition) VALUES ('m1lk', 'milk', 'calcium');
INSERT INTO products (barcode, name, nutrition) VALUES (3995, 'eggs', 'protein');
INSERT INTO products (barcode, name, nutrition) VALUES ('br34d', 'bread', 'sugar');
