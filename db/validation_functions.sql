-------------------------- VALIDA VARCHAR --------------------------

CREATE OR REPLACE FUNCTION fn_valida_varchar
    (_texto varchar, _longitud int) 
RETURNS BOOLEAN AS $$
BEGIN
    IF (_texto IS NULL) OR (char_length(_texto) = 0) OR (char_length(_texto) > _longitud) THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-------------------------- EXISTE REGISTRO --------------------------

CREATE OR REPLACE FUNCTION fn_existe_registro
    (_tabla VARCHAR, _columna VARCHAR, _valor VARCHAR) 
RETURNS BOOLEAN AS $$
DECLARE 
    v_existe record;
BEGIN
    IF (_valor IS NULL) OR (_valor = '') THEN
        RETURN FALSE;
    END IF;

    EXECUTE FORMAT('SELECT * FROM %I WHERE %I = %L LIMIT 1', _tabla, _columna, _valor) INTO v_existe;
    IF v_existe IS NOT NULL THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-------------------------- EXISTE REGISTRO ID --------------------------

CREATE OR REPLACE FUNCTION fn_existe_registro
    (_tabla VARCHAR, _columna VARCHAR, _valor INTEGER) 
RETURNS BOOLEAN AS $$
DECLARE 
    v_existe record;
BEGIN
    IF (_valor IS NULL) OR (_valor < 0) THEN
        RETURN FALSE;
    END IF;

    EXECUTE FORMAT('SELECT *  FROM %I WHERE %I = %L LIMIT 1', _tabla, _columna, _valor) INTO v_existe;
    IF v_existe IS NOT NULL THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;
