CREATE OR REPLACE FUNCTION validation_user( _username INTEGER, _password VARCHAR, _email VARCHAR, _name VARCHAR, _phone VARCHAR)
AS $$
BEGIN
    IF ( fn_valida_varchar( _username, 0, 15 ) ) THEN
        RAISE EXCEPTION '_username should be a varchar with a length of 15 characters or less';
    END IF;
    IF ( fn_valida_varchar( _password, 0, 15 ) ) THEN
        RAISE EXCEPTION '_password should be a varchar with a length of 15 characters or less';
    END IF;
    IF ( fn_valida_varchar( _email, 0, 50 ) ) THEN
        RAISE EXCEPTION '_email should be a varchar with a length of 50 characters or less';
    END IF;
    IF ( fn_valida_varchar( _name, 0, 50 ) ) THEN
        RAISE EXCEPTION '_name should be a varchar with a length of 50 characters or less';
    END IF;
    IF ( fn_valida_varchar( _phone, 9, 10 ) ) THEN
        RAISE EXCEPTION '_phone should be a varchar with a length of 10 characters';
    END IF;

    IF ( fn_existe_registro( 'user', 'user', _user ) ) THEN
        RAISE EXCEPTION 'user already exists';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_address( _address VARCHAR, _number INTEGER, _id_user INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _address, 0, 50 ) ) THEN
        RAISE EXCEPTION 'address should be less than 50';
    END IF;
    IF ( fn_valida_varchar( _number, 0, 6 ) ) THEN
        RAISE EXCEPTION 'number should be less than 6';
    END IF;

    IF ( fn_existe_registro( 'user', 'id_user', _id_user ) ) THEN
        RAISE EXCEPTION 'user does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_order( _date DATE, _time TIME, _total INTEGER, _id_user INTEGER)
AS $$
BEGIN
    IF ( _date IS NULL ) THEN
        RAISE EXCEPTION 'date should not be null';
    END IF;
    IF ( _time IS NULL ) THEN
        RAISE EXCEPTION 'time should not be null';
    END IF;
    IF ( _total IS NULL ) THEN
        RAISE EXCEPTION 'total should not be null';
    END IF;

    IF ( fn_existe_registro( 'user', 'id_user', _id_user ) ) THEN
        RAISE EXCEPTION 'user does not exist';
    END IF;
END;

CREATE OR REPLACE FUNCTION validation_order_detail( _payment_type PAYMENT_TYPE, _delivery_type DELIVERY_TYPE, _comments VARCHAR, _quantity INTEGER, _id_variant INTEGER, _id_zone INTEGER, _id_order BIGSERIAL)
AS $$
BEGIN
    IF ( _payment_type IS NULL ) THEN
        RAISE EXCEPTION 'payment_type should not be null';
    END IF;
    IF ( _delivery_type IS NULL ) THEN
        RAISE EXCEPTION 'delivery_type should not be null';
    END IF;
    IF ( fn_valida_varchar( _comments, 0, 100 ) ) THEN
        RAISE EXCEPTION 'comments should be less than 100';
    END IF;
    IF ( _quantity < 0 OR _quantity > 1000) THEN
        RAISE EXCEPTION 'quantity should be more than 0 and less than 1000';
    END IF;
    IF ( fn_existe_registro( 'variant', 'id_variant', _id_variant ) ) THEN
        RAISE EXCEPTION 'variant does not exist';
    END IF;
    IF ( fn_existe_registro( 'zone', 'id_zone', _id_zone ) ) THEN
        RAISE EXCEPTION 'zone does not exist';
    END IF;
    IF ( fn_existe_registro( 'order', 'id_order', _id_order ) ) THEN
        RAISE EXCEPTION 'order does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_variant( _name VARCHAR, _price INTEGER, active BOOLEAN, _stock INTEGER, _id_product INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 0, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( _price < 0 OR _price > 1000000 ) THEN
        RAISE EXCEPTION 'price should be more than 0';
    END IF;
    IF ( active IS NOT TRUE OR active IS NOT FALSE ) THEN
        RAISE EXCEPTION 'active should be boolean';
    END IF;
    IF ( _stock < 0 ) THEN
        RAISE EXCEPTION 'stock should be more than 0';
    END IF;
    IF ( fn_existe_registro( 'product', 'id_product', _id_product ) ) THEN
        RA RAISE EXCEPTION 'product does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTIONS validation_category( _name VARCHAR)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 0, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_product( _name VARCHAR, _unit_measure UNIT_MEASURE, _description VARCHAR, _image VARCHAR, _id_category INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 0, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( _unit_measure IS NULL ) THEN
        RAISE EXCEPTION 'unit_measure should not be null';
    END IF;
    IF ( fn_valida_varchar( _description, 0, 500 ) ) THEN
        RAISE EXCEPTION 'description should be less than 500';
    END IF;
    IF ( fn_valida_varchar( _image, 0, 80 ) ) THEN
        RAISE EXCEPTION 'image should be less than 80';
    END IF;
    IF ( fn_existe_registro( 'category', 'id_category', _id_category ) ) THEN
        RAISE EXCEPTION 'category does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_dressing( _name VARCHAR, _active BOOLEAN, _id_category INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 0, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( _active IS NOT TRUE OR _active IS NOT FALSE ) THEN
        RAISE EXCEPTION 'active should be boolean';
    END IF;
    IF ( fn_existe_registro( 'category', 'id_category', _id_category ) ) THEN
        RAISE EXCEPTION 'category does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_dressing_detail( _id_dressing INTEGER, _id_order_detail INTEGER)
AS $$
BEGIN
    IF ( fn_existe_registro( 'dressing', 'id_dressing', _id_dressing ) ) THEN
        RAISE EXCEPTION 'dressing does not exist';
    END IF;
    IF ( fn_existe_registro( 'order_detail', 'id_order_detail', _id_order_detail ) ) THEN
        RAISE EXCEPTION 'order_detail does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_extra( _name VARCHAR, _price INTEGER, _active BOOLEAN, _id_category INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 0, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( _price < 0 OR _price > 1000000 ) THEN
        RAISE EXCEPTION 'price should be more than 0 and less than 1000000';
    END IF;
    IF ( _active IS NOT TRUE OR _active IS NOT FALSE ) THEN
        RAISE EXCEPTION 'active should be boolean';
    END IF;
    IF ( fn_existe_registro( 'category', 'id_category', _id_category ) ) THEN
        RAISE EXCEPTION 'category does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_extra_detail( _id_extra INTEGER, _id_order_detail INTEGER)
AS $$
BEGIN
    IF ( fn_existe_registro( 'extra', 'id_extra', _id_extra ) ) THEN
        RAISE EXCEPTION 'extra does not exist';
    END IF;
    IF ( fn_existe_registro( 'order_detail', 'id_order_detail', _id_order_detail ) ) THEN
        RAISE EXCEPTION 'order_detail does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_transfer( _cbu VARCHAR, _alias VARCHAR, _name VARCHAR)
AS $$
BEGIN
    IF ( fn_valida_varchar( _cbu, 22 ) ) THEN
        RAISE EXCEPTION 'cbu should be less than 22';
    END IF;
    IF ( fn_valida_varchar( _alias, 50 ) ) THEN
        RAISE EXCEPTION 'alias should be less than 50';
    END IF;
    IF ( fn_valida_varchar( _name, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_local( _name VARCHAR, _address VARCHAR, _whatsapp VARCHAR, _instagram VARCHAR, _icon VARCHAR, _active VARCHAR, _phone VARCHAR, _id_transfer INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( fn_valida_varchar( _address, 50 ) ) THEN
        RAISE EXCEPTION 'address should be less than 50';
    END IF;
    IF ( fn_valida_varchar( _whatsapp, 10 ) ) THEN
        RAISE EXCEPTION 'whatsapp should be less than 10';
    END IF;
    IF ( fn_valida_varchar( _instagram, 50 ) ) THEN
        RAISE EXCEPTION 'instagram should be less than 50';
    END IF;
    IF ( fn_valida_varchar( _icon, 50 ) ) THEN
        RAISE EXCEPTION 'icon should be less than 50';
    END IF;
    IF ( _active IS NOT TRUE OR _active IS NOT FALSE ) THEN
        RAISE EXCEPTION 'active should be boolean';
    END IF;
    IF ( fn_valida_varchar( _phone, 10 ) ) THEN
        RAISE EXCEPTION 'phone should be less than 10';
    END IF;
    IF ( fn_existe_registro( 'transfer', 'id_transfer', _id_transfer ) ) THEN
        RAISE EXCEPTION 'transfer does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_zone( _name VARCHAR, _price INTEGER, _id_local INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( _price < 0 OR _price > 1000000 ) THEN
        RAISE EXCEPTION 'price should be more than 0 and less than 1000000';
    END IF;
    IF ( fn_existe_registro( 'local', 'id_local', _id_local ) ) THEN
        RAISE EXCEPTION 'local does not exist';
    END IF;
END;

CREATE OR REPLACE FUNCTION validation_zone_address( _name VARCHAR, _id_zone INTEGER )
AS $$
BEGIN
    IF ( fn_valida_varchar( _name, 50 ) ) THEN
        RAISE EXCEPTION 'name should be less than 50';
    END IF;
    IF ( fn_existe_registro( 'zone', 'id_zone', _id_zone ) ) THEN
        RAISE EXCEPTION 'zone does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_first_time ( _start TIME, _end TIME )
AS $$
BEGIN
    IF ( _start IS NULL ) THEN
        RAISE EXCEPTION 'start should not be null';
    END IF;
    IF ( _end IS NULL ) THEN
        RAISE EXCEPTION 'end should not be null';
    END IF;
    IF ( _start > _end ) THEN
        RAISE EXCEPTION 'start should be less than end';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validation_second_time ( _start TIME, _end TIME )
AS $$
BEGIN
    IF ( _start IS NULL ) THEN
        RAISE EXCEPTION 'start should not be null';
    END IF;
    IF ( _end IS NULL ) THEN
        RAISE EXCEPTION 'end should not be null';
    END IF;
    IF ( _start > _end ) THEN
        RAISE EXCEPTION 'start should be less than end';
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION validation_schedules( _day DAY_ENUM, _id_first_time INTEGER, _id_second_time INTEGER, _id_local INTEGER)
AS $$
BEGIN
    IF ( fn_valida_varchar( _day, 10 ) ) THEN
        RAISE EXCEPTION 'day should be less than 10';
    END IF;
    IF ( fn_existe_registro( 'first_time', 'id_first_time', _id_first_time ) ) THEN
        RAISE EXCEPTION 'first_time does not exist';
    END IF;
    IF ( fn_existe_registro( 'second_time', 'id_second_time', _id_second_time ) ) THEN
        RAISE EXCEPTION 'second_time does not exist';
    END IF;
    IF ( fn_existe_registro( 'local', 'id_local', _id_local ) ) THEN
        RAISE EXCEPTION 'local does not exist';
    END IF;
END;
$$ LANGUAGE plpgsql;
