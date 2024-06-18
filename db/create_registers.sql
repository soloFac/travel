CREATE OR REPLACE PROCEDURE sp_create_user
    (_name VARCHAR(50), _email VARCHAR(50), _password VARCHAR(50), _phone VARCHAR(50), _address VARCHAR(50), _id_role INTEGER)
AS $$
BEGIN
    CALL validation_user(_name, _email, _password, _phone, _address, _id_role, v_existe);

    INSERT INTO user(name, email, password, phone, address, id_role)
    VALUES (_name, _email, _password, _phone, _address, _id_role);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_address
    (_address VARCHAR(50), _number VARCHAR(6), _id_user INTEGER)
AS $$
BEGIN
    CALL validation_address(_address, _number, _id_user);

    INSERT INTO address(address, number, id_user)
    VALUES (_address, _number, _id_user);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_order
    (_date DATE, _time TIME, _total INTEGER, _id_user INTEGER)
AS $$
BEGIN
    CALL validation_order(_date, _time, _total, _id_user);

    INSERT INTO "order"(date, time, total, id_user)
    VALUES (_date, _time, _total, _id_user);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_order_detail
    (_payment_type PAYMENT_TYPE, _delivery_type DELIVERY_TYPE, _comments VARCHAR(100), _quantity INTEGER, _price INTEGER, _id_variant INTEGER, _id_zone INTEGER, _id_order BIGSERIAL)
AS $$
BEGIN
    CALL validation_order_detail(_payment_type, _delivery_type, _comments, _quantity, _price, _id_variant, _id_zone, _id_order);

    INSERT INTO order_detail(payment_type, delivery_type, comments, quantity, price, id_variant, id_zone, id_order)
    VALUES (_payment_type, _delivery_type, _comments, _quantity, _price, _id_variant, _id_zone, _id_order);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_variant
    (_name VARCHAR(50), _price INTEGER, _active BOOLEAN, _stock INTEGER, _id_product INTEGER)
AS $$
BEGIN
    CALL validation_variant(_name, _price, _active, _stock, _id_product);

    INSERT INTO variant(name, price, active, stock, id_product)
    VALUES (_name, _price, _active, _stock, _id_product);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE sp_create_category
    (_name VARCHAR(50), _active BOOLEAN)
AS $$
BEGIN
    CALL validation_category(_name, _active, v_existe);

    INSERT INTO category(name, active)
    VALUES (_name, _active);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_product
    (_name VARCHAR(50), _unit_measure UNIT_MEASURE, _description VARCHAR(500), _image VARCHAR(80), _id_category)
AS $$
BEGIN
    CALL validation_product(_name, _unit_measure, _description, _image, _id_category);

    INSERT INTO product(name, unit_measure, description, image, id_category)
    VALUES (_name, _unit_measure, _description, _image, _id_category);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_dressing
(_name VARCHAR(50), _active BOOLEAN, _id_category INTEGER)
AS $$
BEGIN
    CALL validation_dressing(_name, _active, _id_category);

    INSERT INTO dressing(name, active, id_category)
    VALUES (_name, _active, _id_category);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_dressing_detail
(_id_dressing INTEGER, _id_order_detail INTEGER)
AS $$
BEGIN
    CALL validation_dressing_detail(_id_dressing, _id_order_detail);

    INSERT INTO dressing_detail(id_dressing, id_order_detail)
    VALUES (_id_dressing, _id_order_detail);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_extra
(_name VARCHAR(50), _price INTEGER, _active BOOLEAN, _id_category INTEGER)
AS $$
BEGIN
    CALL validation_extra(_name, _price, _active, _id_category);

    INSERT INTO extra(name, price, active, id_category)
    VALUES (_name, _price, _active, _id_category);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_extra_detail
(_id_extra INTEGER, _id_order_detail INTEGER)
AS $$
BEGIN
    CALL validation_extra_detail(_id_extra, _id_order_detail);

    INSERT INTO extra_detail(id_extra, id_order_detail)
    VALUES (_id_extra, _id_order_detail);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE sp_create_transfer
    (_cbu VARCHAR(22), _alias VARCHAR(50), _name VARCHAR(50))
AS $$
BEGIN
    CALL validation_transfer(_cbu, _alias, _name);

    INSERT INTO transfer(cbu, alias, name)
    VALUES (_cbu, _alias, _name);
END;
$$ LANGUAGE plpgsql;

