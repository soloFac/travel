BEGIN;

-- CREATE TYPE ROLL AS ENUM('admin', 'user');

CREATE TABLE "user"(
    id_user SERIAL PRIMARY KEY,
    "username" VARCHAR(15) NOT NULL,
    "password" VARCHAR(15) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    -- "rol" ROLL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
)

CREATE TABLE address(
    id_address SERIAL PRIMARY KEY,
    address VARCHAR(50) NOT NULL,
    number VARCHAR(6) NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
)

CREATE TABLE order(
    id_order BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    total INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES "user"(id_user)
)

CREATE TYPE PAYMENT_TYPE AS ENUM('CASH', 'TRANSFER');

CREATE TYPE DELIVERY_TYPE AS ENUM('DELIVERY', 'PICKUP');

CREATE TABLE order_detail(
    id_order_detail SERIAL PRIMARY KEY,
    payment_type PAYMENT_TYPE NOT NULL,
    delivery_type DELIVERY_TYPE NOT NULL,
    comments VARCHAR(100),        
    quantity INTEGER NOT NULL, -- MUST BE LESS THAN THE STOCK
    price INTEGER NOT NULL,
    id_variant INTEGER NOT NULL,
    id_zone INTEGER NOT NULL,
    id_order BIGSERIAL NOT NULL,
    FOREIGN KEY (id_variant) REFERENCES variant(id_variant),
    FOREIGN KEY (id_zone) REFERENCES zone(id_zone),
    FOREIGN KEY (id_order) REFERENCES order(id_order),
)

CREATE TABLE variant(
    id_variant SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    active BOOLEAN NOT NULL,
    stock INTEGER NOT NULL,
    id_product INTEGER NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id_product)
)

CREATE TYPE UNIT_MEASURE AS ENUM('KG', 'GRAM', 'MILIGRAM', 'UNIT', 'LITRE', 'MILILITRE', 'METER', 'CENTIMETER');

CREATE TABLE category(
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)

CREATE TABLE product(
    id_product SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    -- price INTEGER NOT NULL,
    unit_measure UNIT_MEASURE NOT NULL,
    description VARCHAR(500) NOT NULL,
    image VARCHAR(80) NOT NULL,
    id_category INTEGER NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id_category)
)

CREATE TABLE dressing(
    id_dressing SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL,
    id_category INTEGER NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id_category)
)

CREATE TABLE dressing_detail(
    id_dressing INTEGER NOT NULL,
    id_order_detail INTEGER NOT NULL,
    FOREIGN KEY (id_dressing) REFERENCES dressing(id_dressing),
    FOREIGN KEY (id_order_detail) REFERENCES order_detail(id_order_detail)
)

CREATE TABLE extra(
    id_extra SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    active BOOLEAN NOT NULL,
    id_category INTEGER NOT NULL,
    FOREIGN KEY (id_category) REFERENCES category(id_category)
)

CREATE TABLE extra_detail(
    id_extra INTEGER NOT NULL,
    id_order_detail INTEGER NOT NULL,
    FOREIGN KEY (id_extra) REFERENCES extra(id_extra),
    id_order_detail INTEGER NOT NULL,
    FOREIGN KEY (id_order_detail) REFERENCES order_detail(id_order_detail)
)


-- - LOCAL - --

CREATE TABLE transfer(
    id_transfer SERIAL PRIMARY KEY,
    cbu VARCHAR(22) NOT NULL,
    alias VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
)

CREATE TABLE local(
    id_local SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(10) NOT NULL,
    instagram VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    active VARCHAR(50) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    id_transfer INTEGER NOT NULL,
    FOREIGN KEY (id_transfer) REFERENCES transfer(id_transfer)
)

CREATE TABLE zone(
    id_zone SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    id_local INTEGER NOT NULL,
    FOREIGN KEY (id_local) REFERENCES local(id_local)
)

CREATE TABLE zone_address(
    id_zone_address SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    id_zone INTEGER NOT NULL,
    FOREIGN KEY (id_zone) REFERENCES zone(id_zone)
)

CREATE TABLE first_time(
    id_first_time SERIAL PRIMARY KEY,
    start TIME NOT NULL,
    end TIME NOT NULL,
)

CREATE TABLE second_time(
    id_second_time SERIAL PRIMARY KEY,
    start TIME NOT NULL,
    end TIME NOT NULL
)

CREATE TYPE DAY_ENUM AS ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

CREATE TABLE schedules(
    id_schedules SERIAL PRIMARY KEY,
    day DAY_ENUM NOT NULL,
    id_first_time INTEGER NOT NULL,
    id_second_time INTEGER NOT NULL,
    id_local INTEGER NOT NULL,
    FOREIGN KEY (id_first_time) REFERENCES first_time(id_first_time),
    FOREIGN KEY (id_second_time) REFERENCES second_time(id_second_time),
    FOREIGN KEY (id_local) REFERENCES local(id_local)
)