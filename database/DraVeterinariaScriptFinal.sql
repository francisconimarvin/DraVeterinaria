DECLARE
    -- VARRAY DE HORARIOS
    TYPE tipo_varray_horario IS VARRAY(20) OF VARCHAR2(5);
    v_varray_horas tipo_varray_horario;

    -- VARIABLES AUXILIARES
    v_fecha DATE := TO_DATE('2025-09-15','YYYY-MM-DD'); -- fecha de servicio
    v_costo NUMBER := 20000;   -- ejemplo de costo
    v_tipo_servicio NUMBER := 1; -- ejemplo de tipo servicio

    -- CURSOR PARA TUTORES
    CURSOR cur_tutores IS
        SELECT id_tutor, nombre_tutor FROM tutor;

    -- CURSOR PARAMETRIZADO PARA MASCOTAS
    CURSOR cur_mascotas(p_tutor_id NUMBER) IS
        SELECT id_mascota, nombre_mascota
        FROM mascota
        WHERE id_tutor = p_tutor_id;

    -- REGISTRO USANDO ROWTYPE
    rec_servicio servicio%ROWTYPE;

BEGIN
    -- Borramos datos previos
    EXECUTE IMMEDIATE 'TRUNCATE TABLE SERVICIO';

    -- Cargar horarios en el VARRAY
    v_varray_horas := tipo_varray_horario(
        '10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30',
        '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'
    );

    -- Recorrer tutores
    FOR reg_tutor IN cur_tutores LOOP
        DBMS_OUTPUT.PUT_LINE('Tutor: ' || reg_tutor.nombre_tutor);

        -- Recorrer mascotas del tutor
        FOR reg_mascota IN cur_mascotas(reg_tutor.id_tutor) LOOP
            DBMS_OUTPUT.PUT_LINE('  Mascota: ' || reg_mascota.nombre_mascota);

            -- Recorrer horarios
            FOR i IN 1..v_varray_horas.COUNT LOOP 

                -- Costo aleatorio
                v_costo := TRUNC(DBMS_RANDOM.VALUE(15000,35000));
                -- Tipo de servicio aleatorio entre 1 y 3
                v_tipo_servicio := TRUNC(DBMS_RANDOM.VALUE(1,4));
                
                -- Llenar registro
                rec_servicio.id_servicio := ISEQ$$_107406.NEXTVAL;  
                rec_servicio.id_mascota := reg_mascota.id_mascota;
                rec_servicio.fecha := TO_TIMESTAMP(
                    TO_CHAR(v_fecha + TRUNC(DBMS_RANDOM.VALUE(0,6)), 'YYYY-MM-DD') || ' ' || v_varray_horas(i),
                    'YYYY-MM-DD HH24:MI');
                rec_servicio.duracion := NUMTODSINTERVAL(TRUNC(DBMS_RANDOM.VALUE(20,61)),'MINUTE');
                rec_servicio.costo := v_costo;
                rec_servicio.id_agenda := NULL; 
                rec_servicio.id_tipo_servicio := v_tipo_servicio;

                -- Intentar insertar
                BEGIN
                    INSERT INTO servicio VALUES rec_servicio;
                    DBMS_OUTPUT.PUT_LINE('Servicio Insertado: ' || rec_servicio.id_tipo_servicio ||' ' || v_varray_horas(i));
                EXCEPTION
                    WHEN DUP_VAL_ON_INDEX THEN
                        DBMS_OUTPUT.PUT_LINE('Error: Servicio duplicado para mascota ' || reg_mascota.nombre_mascota);
                    WHEN VALUE_ERROR THEN
                        DBMS_OUTPUT.PUT_LINE('Error: Valor numérico fuera de rango al insertar servicio.');
                    WHEN INVALID_NUMBER THEN
                        DBMS_OUTPUT.PUT_LINE('Error: Conversión inválida de número en el costo.');
                    WHEN NO_DATA_FOUND THEN
                        DBMS_OUTPUT.PUT_LINE('Error: No se encontró mascota/tutor al insertar servicio.');
                    WHEN OTHERS THEN
                        DBMS_OUTPUT.PUT_LINE('Error inesperado al insertar: ' || SQLERRM);
                END;

            END LOOP;
        END LOOP;
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Tabla SERVICIO cargada exitosamente.');

EXCEPTION
    WHEN INVALID_CURSOR THEN
        DBMS_OUTPUT.PUT_LINE('Error: Intento de usar un cursor inválido.');
    WHEN PROGRAM_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Error: Problema interno en el bloque PL/SQL.');
    WHEN STORAGE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Error: Memoria insuficiente en la ejecución.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error general en el bloque principal: ' || SQLERRM);
        ROLLBACK;
END;


