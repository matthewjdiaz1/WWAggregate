DROP DATABASE IF EXISTS wwaggregate;
CREATE DATABASE wwaggregate;
\c wwaggregate

DROP TABLE IF EXISTS item;
CREATE TABLE item (
  id SERIAL PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  barcode VARCHAR(255),
  barcode_type VARCHAR(255)
);
DROP TABLE IF EXISTS nutrition;
CREATE TABLE nutrition (
  id SERIAL PRIMARY KEY,
  units VARCHAR(255),
  calories INTEGER,
  fat INTEGER,
  cholesterol INTEGER,
  sodium INTEGER,
  carbohydrate INTEGER,
  sugar INTEGER,
  protein INTEGER
);
DROP TABLE IF EXISTS item_nutrition;
CREATE TABLE item_nutrition (
  id SERIAL PRIMARY KEY,
  item_id INTEGER,
  nutrition_id INTEGER,
  vitamins_id INTEGER
);

INSERT INTO item (id, name, barcode, barcode_type) VALUES (100, 'fritos', 'fritos_barcode', 'fritos_barcode_type');
INSERT INTO item (id, name, barcode, barcode_type) VALUES (101, 'oreos', 'oreos_barcode', 'oreos_barcode_type');
INSERT INTO item (id, name, barcode, barcode_type) VALUES (420, 'weed', 'weed_barcode', 'weed_barcode_type');

INSERT INTO nutrition (id, calories, protein, sugar) VALUES (100, 100, 5, 40);
INSERT INTO nutrition (id, calories, protein, sugar) VALUES (101, 300, 2, 100);
INSERT INTO nutrition (id, calories, protein, sugar) VALUES (420, 420, 420, 420);

INSERT INTO item_nutrition (item_id, nutrition_id) VALUES (100, 100);
INSERT INTO item_nutrition (item_id, nutrition_id) VALUES (101, 101);
INSERT INTO item_nutrition (item_id, nutrition_id) VALUES (420, 420);
