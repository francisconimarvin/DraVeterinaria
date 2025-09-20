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

    -- CONSULTA PARAMETRIZADA QUE RECORRE LAS MASCOTAS CON EL PARAMETRO DE SU TUTOR
    CURSOR cur_mascotas(p_tutor_id NUMBER) IS
        SELECT id_mascota, nombre_mascota
        FROM mascota
        WHERE id_tutor = p_tutor_id;

    -- REGISTRAMOS USANDO ROWTYPE PARA QUE TENGA EL MISMO FORMATO DATO INSERTADO CONB LAS COLUMNAS DE LAS TABLA QUE VAMOS A INSERTAR
    rec_servicio servicio%ROWTYPE;

BEGIN
    EXECUTE IMMEDIATE 'TRUNCATE TABLE SERVICIO';

    --CARGAR HORARIOS EN EL VARRAY
    v_varray_horas := tipo_varray_horario(
        '10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30',
        '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'
    );

        --RECORRER TUTORES
    FOR reg_tutor IN cur_tutores LOOP
        DBMS_OUTPUT.PUT_LINE('Tutor: ' || reg_tutor.nombre_tutor);

        -- Recorrer mascotas de cada tutor
        FOR reg_mascota IN cur_mascotas(reg_tutor.id_tutor) LOOP
            DBMS_OUTPUT.PUT_LINE('  Mascota: ' || reg_mascota.nombre_mascota);

            -- RECORRER LOS HORARIOS DEL VARRAY
            FOR i IN 1..v_varray_horas.COUNT LOOP 
            
            --PARA PODER LLENAR LA TABLA DAREMOS ESTE EJEMPLO CON DATOS RANDOM AL AZAR 
                v_costo := TRUNC(DBMS_RANDOM.VALUE(15000,35000));

                -- Tipo de servicio aleatorio entre 1 y 3
                v_tipo_servicio := TRUNC(DBMS_RANDOM.VALUE(1,4));
                
                -- Llenar registro ROWTYPE
                rec_servicio.id_servicio := ISEQ$$_107406.NEXTVAL;  
                rec_servicio.id_mascota := reg_mascota.id_mascota;
                rec_servicio.fecha := TO_TIMESTAMP(
                TO_CHAR(v_fecha + TRUNC(DBMS_RANDOM.VALUE(0,6)), 'YYYY-MM-DD') || ' ' || v_varray_horas(i),
                'YYYY-MM-DD HH24:MI');
                /*¿CÓMO FUNCIONA EL AGENDAR LA CITA?
                    SE PASA A TO_CHAR LA FECHA, 
                    EL DBMS_RANDOM ES UN FUNCION PARA QUE ALEATORIAMENTE AGENDE EN LOS PROXIMOS 5 DIAS
                    COMO ESTÁ ITERANDO EL V_VARRAY_HORAS(i) SIRVE PARA QUE NO HAYAN 2 CITAS AGENDADAS A LA MISMA HORA*/

                rec_servicio.duracion := NUMTODSINTERVAL(TRUNC(DBMS_RANDOM.VALUE(20,61)),'MINUTE');
                /*
                ESTA FUNCIÓN ES PARA DARLE UN AZAR A LA DURACIÓN A LAS ATENCIONES, YA QUE ESTAMOS EN UN CASO HIPOTETICO 
                */
                rec_servicio.costo := v_costo;
                rec_servicio.id_agenda := NULL; 
                rec_servicio.id_tipo_servicio := v_tipo_servicio;
                -- Insertar usando ROWTYPE
                INSERT INTO servicio VALUES rec_servicio;

                DBMS_OUTPUT.PUT_LINE('Servicio Insertado: ' || v_varray_horas(i));
            END LOOP;
        END LOOP;
    END LOOP;

    --COMMIT;
    DBMS_OUTPUT.PUT_LINE('Tabla SERVICIO cargada ');

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END;

SELECT 
TUT.NOMBRE_TUTOR || ' ' || TUT.SNOMBRE_TUTOR || ' ' || TUT.APPATERNO_TUTOR || ' ' || TUT.AMATERNO_TUTOR AS NOMBRE_TUTOR,
masc.nombre_mascota AS NOMBRE_MASCOTA,
SERV.FECHA AS FECHA,
TO_CHAR(SERV.COSTO, '$999G999G999') AS COSTO
FROM SERVICIO SERV
JOIN MASCOTA MASC
    ON MASC.ID_MASCOTA = SERV.ID_MASCOTA
JOIN TUTOR TUT 
    ON TUT.ID_TUTOR = MASC.ID_TUTOR

