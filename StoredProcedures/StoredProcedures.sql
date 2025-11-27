-- ====================================================
-- Proyecto Andon-OEE
-- Autor: Daniel Arellano
-- ====================================================

-- ==========================================
-- PROCEDURE: Insertar un área
-- ==========================================
CREATE OR REPLACE PROCEDURE InsertArea(
    p_name TEXT, 
    p_description TEXT
)
LANGUAGE plpgsql  
AS $$
BEGIN
    INSERT INTO "AreaModels" ("Name", "Description")
    VALUES (p_name, p_description);
END;
$$;

-- ==========================================
-- PROCEDURE: Actualizar un área
-- ==========================================
CREATE OR REPLACE PROCEDURE UpdateArea(
    p_id INT,
    p_name TEXT,
    p_description TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "AreaModels"
    SET "Name" = p_name,
        "Description" = p_description
    WHERE "Id" = p_id;
END;
$$;

-- ==========================================
-- PROCEDURE: Eliminar un área
-- ==========================================
CREATE OR REPLACE PROCEDURE DeleteArea(p_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "AreaModels" WHERE "Id" = p_id;

    IF NOT FOUND THEN
        RAISE NOTICE 'No se encontró el área con Id=%', p_id;
    END IF;
END;
$$;

-- ==========================================
-- FUNCTION: Obtener todas las áreas
-- ==========================================
CREATE OR REPLACE FUNCTION GetAreas()
RETURNS TABLE(
    Id INT,
    Name TEXT,
    Description TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT "Id", "Name", "Description"
    FROM "AreaModels";
END;
$$;

-- ==========================================
-- FIN DE STORED PROCEDURES / FUNCTION PARA AreaModels
-- ====================================================
-- ==========================================
-- Ejemplos de uso
-- ==========================================

-- Insertar un área
-- CALL InsertArea('Producción', 'Área principal de la planta');

-- Actualizar un área
-- CALL UpdateArea(1, 'Producción Actualizada', 'Área modificada');

-- Eliminar un área
-- CALL DeleteArea(1);

-- Obtener todas las áreas
-- SELECT * FROM GetAreas();






-- ====================================================
-- STORED PROCEDURES Y FUNCTION PARA Lines
-- Proyecto Andon-OEE
-- Autor:Daniel Arellano
-- ====================================================

-- ==========================================
-- PROCEDURE: Insertar una línea
-- ==========================================
CREATE OR REPLACE PROCEDURE InsertLine(
    p_area_name TEXT,
    p_name TEXT,
    p_description TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_area_id INT;
BEGIN
    -- Obtener Id del área
    SELECT "Id" INTO v_area_id
    FROM "AreaModels"
    WHERE "Name" = p_area_name;

    IF v_area_id IS NULL THEN
        RAISE EXCEPTION 'Área con nombre % no existe', p_area_name;
    END IF;

    -- Insertar línea
    INSERT INTO "Lines" ("AreaId", "Name", "Description")
    VALUES (v_area_id, p_name, p_description);
END;
$$;

-- ==========================================
-- PROCEDURE: Actualizar una línea
-- ==========================================
CREATE OR REPLACE PROCEDURE UpdateLine(
    p_id INT,
    p_area_name TEXT,
    p_name TEXT,
    p_description TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_area_id INT;
BEGIN
    -- Obtener Id del área
    SELECT "Id" INTO v_area_id
    FROM "AreaModels"
    WHERE "Name" = p_area_name;

    IF v_area_id IS NULL THEN
        RAISE EXCEPTION 'Área con nombre % no existe', p_area_name;
    END IF;

    -- Actualizar línea
    UPDATE "Lines"
    SET "AreaId" = v_area_id,
        "Name" = p_name,
        "Description" = p_description
    WHERE "Id" = p_id;
END;
$$;

-- ==========================================
-- PROCEDURE: Eliminar una línea
-- ==========================================
CREATE OR REPLACE PROCEDURE DeleteLine(p_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "Lines" WHERE "Id" = p_id;

    IF NOT FOUND THEN
        RAISE NOTICE 'No se encontró la línea con Id=%', p_id;
    END IF;
END;
$$;

-- ==========================================
-- FUNCTION: Obtener todas las líneas
-- ==========================================
CREATE OR REPLACE FUNCTION GetLines()
RETURNS TABLE(
    Id INT,
    AreaId INT,
    Name TEXT,
    Description TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT "Id", "AreaId", "Name", "Description"
    FROM "Lines";
END;
$$;

-- ==========================================
-- EJEMPLOS DE USO 
-- ==========================================

-- Insertar una línea
-- CALL InsertLine('Producción', 'Línea 1', 'Línea de ensamble principal');

-- Actualizar una línea
-- CALL UpdateLine(1, 'Producción', 'Línea 1 Modificada', 'Descripción modificada');

-- Eliminar una línea
-- CALL DeleteLine(1);

-- Obtener todas las líneas
-- SELECT * FROM GetLines();

-- ==========================================
-- FIN DE STORED PROCEDURES / FUNCTION PARA Lines
-- ====================================================


-- ====================================================
-- STORED PROCEDURES Y FUNCTION PARA WorkStations
-- Proyecto Andon-OEE
-- Autor:Daniel Arellano
-- ====================================================

-- ==========================================
-- PROCEDURE: Insertar una WorkStation
-- ==========================================
CREATE OR REPLACE PROCEDURE InsertWorkStation(
    p_line_name TEXT,
    p_name TEXT,
    p_description TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_line_id INT;
BEGIN
    -- Obtener Id de la línea
    SELECT "Id" INTO v_line_id
    FROM "Lines"
    WHERE "Name" = p_line_name;

    IF v_line_id IS NULL THEN
        RAISE EXCEPTION 'Línea con nombre % no existe', p_line_name;
    END IF;

    -- Insertar WorkStation
    INSERT INTO "WorkStations" ("LineId", "Name", "Description")
    VALUES (v_line_id, p_name, p_description);
END;
$$;

-- ==========================================
-- PROCEDURE: Actualizar una WorkStation
-- ==========================================
CREATE OR REPLACE PROCEDURE UpdateWorkStation(
    p_id INT,
    p_line_name TEXT,
    p_name TEXT,
    p_description TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_line_id INT;
BEGIN
    -- Obtener Id de la línea
    SELECT "Id" INTO v_line_id
    FROM "Lines"
    WHERE "Name" = p_line_name;

    IF v_line_id IS NULL THEN
        RAISE EXCEPTION 'Línea con nombre % no existe', p_line_name;
    END IF;

    -- Actualizar WorkStation
    UPDATE "WorkStations"
    SET "LineId" = v_line_id,
        "Name" = p_name,
        "Description" = p_description
    WHERE "WorkStationId" = p_id;
END;
$$;

-- ==========================================
-- PROCEDURE: Eliminar una WorkStation
-- ==========================================
CREATE OR REPLACE PROCEDURE DeleteWorkStation(p_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "WorkStations" WHERE "WorkStationId" = p_id;

    IF NOT FOUND THEN
        RAISE NOTICE 'No se encontró la estación con Id=%', p_id;
    END IF;
END;
$$;

-- ==========================================
-- FUNCTION: Obtener todas las WorkStations
-- ==========================================
CREATE OR REPLACE FUNCTION GetWorkStations()
RETURNS TABLE(
    WorkStationId INT,
    LineId INT,
    Name TEXT,
    Description TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT "WorkStationId", "LineId", "Name", "Description"
    FROM "WorkStations";
END;
$$;

-- ==========================================
-- EJEMPLOS DE USO 
-- ==========================================

-- Insertar una estación
-- CALL InsertWorkStation('Línea 1', 'Estación A', 'Primera estación de ensamble');

-- Actualizar una estación
-- CALL UpdateWorkStation(1, 'Línea 1', 'Estación A Modificada', 'Descripción modificada');

-- Eliminar una estación
-- CALL DeleteWorkStation(1);

-- Obtener todas las estaciones
-- SELECT * FROM GetWorkStations();

-- ==========================================
-- FIN DE STORED PROCEDURES / FUNCTION PARA WorkStations
-- ====================================================



-- ====================================================
-- STORED PROCEDURES Y FUNCTION PARA Machines
-- Proyecto Andon-OEE
-- Autor:Daniel Arellano
-- ====================================================

-- ==========================================
-- PROCEDURE: Insertar una máquina
-- ==========================================
CREATE OR REPLACE PROCEDURE InsertMachine(
    p_workstation_name TEXT,
    p_name TEXT,
    p_description TEXT,
    p_serial_number TEXT,
    p_status TEXT DEFAULT 'Active'
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_workstation_id INT;
BEGIN
    -- Obtener Id de la estación de trabajo
    SELECT "WorkStationId" INTO v_workstation_id
    FROM "WorkStations"
    WHERE "Name" = p_workstation_name;

    IF v_workstation_id IS NULL THEN
        RAISE EXCEPTION 'WorkStation con nombre % no existe', p_workstation_name;
    END IF;

    -- Insertar máquina
    INSERT INTO "Machines" ("WorkStationId", "Name", "Description", "SerialNumber", "Status")
    VALUES (v_workstation_id, p_name, p_description, p_serial_number, p_status);
END;
$$;

-- ==========================================
-- PROCEDURE: Actualizar una máquina
-- ==========================================
CREATE OR REPLACE PROCEDURE UpdateMachine(
    p_id INT,
    p_workstation_name TEXT,
    p_name TEXT,
    p_description TEXT,
    p_serial_number TEXT,
    p_status TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_workstation_id INT;
BEGIN
    -- Obtener Id de la estación de trabajo
    SELECT "WorkStationId" INTO v_workstation_id
    FROM "WorkStations"
    WHERE "Name" = p_workstation_name;

    IF v_workstation_id IS NULL THEN
        RAISE EXCEPTION 'WorkStation con nombre % no existe', p_workstation_name;
    END IF;

    -- Actualizar máquina
    UPDATE "Machines"
    SET "WorkStationId" = v_workstation_id,
        "Name" = p_name,
        "Description" = p_description,
        "SerialNumber" = p_serial_number,
        "Status" = p_status
    WHERE "MachineId" = p_id;
END;
$$;

-- ==========================================
-- PROCEDURE: Eliminar una máquina
-- ==========================================
CREATE OR REPLACE PROCEDURE DeleteMachine(p_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "Machines" WHERE "MachineId" = p_id;

    IF NOT FOUND THEN
        RAISE NOTICE 'No se encontró la máquina con Id=%', p_id;
    END IF;
END;
$$;

-- ==========================================
-- FUNCTION: Obtener todas las máquinas
-- ==========================================
CREATE OR REPLACE FUNCTION GetMachines()
RETURNS TABLE(
    MachineId INT,
    WorkStationId INT,
    Name TEXT,
    Description TEXT,
    SerialNumber TEXT,
    Status TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT "MachineId", "WorkStationId", "Name", "Description", "SerialNumber", "Status"
    FROM "Machines";
END;
$$;

-- ==========================================
-- EJEMPLOS DE USO 
-- ==========================================

-- Insertar una máquina
-- CALL InsertMachine('Estación A', 'Máquina 1', 'Máquina de ensamble', 'SN12345', 'Active');

-- Actualizar una máquina
-- CALL UpdateMachine(1, 'Estación A', 'Máquina 1 Modificada', 'Descripción modificada', 'SN12345X', 'Inactive');

-- Eliminar una máquina
-- CALL DeleteMachine(1);

-- Obtener todas las máquinas
-- SELECT * FROM GetMachines();

-- ==========================================
-- FIN DE STORED PROCEDURES / FUNCTION PARA Machines
-- ====================================================


-- =========================================
-- STORED PROCEDURE PARA PRODUCTIONS
-- Proyecto Andon-OEE
-- Autor:Daniel Arellano
-- =========================================
-- ========================================
--  Stored Procedure: Insert Production by IDs
-- ========================================

CREATE OR REPLACE FUNCTION sp_create_production_by_ids(
    p_area_id INT,
    p_line_id INT,
    p_station_id INT,
    p_machine_id INT,
    p_user_id INT,
    p_model TEXT,
    p_date_time TIMESTAMP,
    p_quantity_ok INT,
    p_quantity_ng INT,
    p_production_time INTERVAL,
    p_production_downtime INTERVAL,
    p_status TEXT DEFAULT 'Producción',
    p_failure TEXT DEFAULT '',
    p_operator TEXT DEFAULT ''
)
RETURNS INT AS $$
DECLARE
    v_production_id INT;
BEGIN
    INSERT INTO "Productions"(
        "AreaId", "LineId", "StationId", "MachineId", "UserId",
        "Model", "DateTime", "QuantityProducedOK", "QuantityProducedNG",
        "ProductionTime", "ProductionDowntime",
        "Status", "Failure", "Operator"
    )
    VALUES (
        p_area_id, p_line_id, p_station_id, p_machine_id, p_user_id,
        p_model, p_date_time, p_quantity_ok, p_quantity_ng,
        p_production_time, p_production_downtime,
        p_status, p_failure, p_operator
    )
    RETURNING "ProductionId" INTO v_production_id;

    RETURN v_production_id;
END;
$$ LANGUAGE plpgsql;

-- ========================================
--  Ejemplo de uso
-- ========================================

SELECT sp_create_production_by_ids(
    7 :: INT,             -- AreaId
    11 :: INT,            -- LineId 
    15 :: INT,            -- StationId
    23 :: INT,            -- MachineId
    1 :: INT,             -- UserId
    'ModeloA':: TEXT,     -- Model
    NOW() :: TIMESTAMP,   -- DateTime
    120 :: INT,           -- Quantity OK
    5 :: INT,             -- Quantity NG
    INTERVAL '03:00:00', -- Production Time
    INTERVAL '00:15:00', -- Downtime
    'Producción' :: TEXT,  -- Status
    '' :: TEXT,            -- Failure
    'Juan' :: TEXT         -- Operator
);


-- =============================================
-- Stored Procedure: Actualizar datos de producción
-- =============================================
CREATE OR REPLACE FUNCTION sp_update_production_data(
    p_production_id INT,
    p_quantity_produced_ok INT,
    p_quantity_produced_ng INT,
    p_production_time INTERVAL,
    p_production_downtime INTERVAL
)
RETURNS VOID AS $$
BEGIN
    UPDATE "Productions"
    SET 
        "QuantityProducedOK" = p_quantity_produced_ok,
        "QuantityProducedNG" = p_quantity_produced_ng,
        "ProductionTime" = p_production_time,
        "ProductionDowntime" = p_production_downtime
    WHERE "ProductionId" = p_production_id;
END;
$$ LANGUAGE plpgsql;
-- =============================================
-- Ejemplo de uso del stored procedure
-- =============================================
SELECT sp_update_production_data(
    5,                     -- ProductionId
    250,                   -- QuantityProducedOK
    10,                    -- QuantityProducedNG
    INTERVAL '4 hours',    -- ProductionTime
    INTERVAL '20 minutes'  -- ProductionDowntime
);

-- =============================================
-- Stored Procedure: Actualizar modelo, estatus, operador y falla
-- =============================================
CREATE OR REPLACE FUNCTION sp_update_production_info(
    p_production_id INT,
    p_model TEXT,
    p_status TEXT,
    p_operator TEXT,
    p_failure TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE "Productions"
    SET 
        "Model" = COALESCE(p_model, "Model"),
        "Status" = COALESCE(p_status, "Status"),
        "Operator" = COALESCE(p_operator, "Operator"),
        "Failure" = COALESCE(p_failure, "Failure")
    WHERE "ProductionId" = p_production_id;
END;
$$ LANGUAGE plpgsql;
--========================================================================================
-- Ejemplo de uso:
-- SELECT sp_update_production_info(1, 'Modelo-X1', 'Running', 'Carlos López', 'Sin falla');
--========================================================================================

-- =============================================
-- Stored Procedure: Actualizar piezas OK y NG
-- =============================================
CREATE OR REPLACE FUNCTION sp_update_production_quantities(
    p_production_id INT,
    p_quantity_ok INT,
    p_quantity_ng INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE "Productions"
    SET 
        "QuantityProducedOK" = COALESCE(p_quantity_ok, "QuantityProducedOK"),
        "QuantityProducedNG" = COALESCE(p_quantity_ng, "QuantityProducedNG")
    WHERE "ProductionId" = p_production_id;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo de uso:
-- SELECT sp_update_production_quantities(1, 120, 5);



-- =========================================================
-- Stored Procedure: Actualizar eventos únicos de producción
-- =========================================================
CREATE OR REPLACE FUNCTION sp_update_production_event(
    p_production_id INT,
    p_model VARCHAR,
    p_status VARCHAR,
    p_fault VARCHAR,
    p_operator VARCHAR,
    p_event_time TIMESTAMP
)
RETURNS VOID AS
$$
BEGIN
    -- Cambio de Modelo
    INSERT INTO "ProductionEvents"("ProductionId", "EventType", "EventValue", "Timestamp")
    VALUES (p_production_id, 'ModelChange', p_model, p_event_time)
    ON CONFLICT ("ProductionId", "EventType")
    DO UPDATE SET "EventValue" = EXCLUDED."EventValue", "Timestamp" = EXCLUDED."Timestamp";

    -- Cambio de Estado
    INSERT INTO "ProductionEvents"("ProductionId", "EventType", "EventValue", "Timestamp")
    VALUES (p_production_id, 'StatusChange', p_status, p_event_time)
    ON CONFLICT ("ProductionId", "EventType")
    DO UPDATE SET "EventValue" = EXCLUDED."EventValue", "Timestamp" = EXCLUDED."Timestamp";

    -- Cambio de Falla
    INSERT INTO "ProductionEvents"("ProductionId", "EventType", "EventValue", "Timestamp")
    VALUES (p_production_id, 'FaultChange', p_fault, p_event_time)
    ON CONFLICT ("ProductionId", "EventType")
    DO UPDATE SET "EventValue" = EXCLUDED."EventValue", "Timestamp" = EXCLUDED."Timestamp";

    -- Cambio de Operador
    INSERT INTO "ProductionEvents"("ProductionId", "EventType", "EventValue", "Timestamp")
    VALUES (p_production_id, 'OperatorChange', p_operator, p_event_time)
    ON CONFLICT ("ProductionId", "EventType")
    DO UPDATE SET "EventValue" = EXCLUDED."EventValue", "Timestamp" = EXCLUDED."Timestamp";

END;
$$
LANGUAGE plpgsql;

-- =============================================
-- Ejemplo de uso del stored procedure
-- =============================================

SELECT sp_update_production_event(
    1 :: INT,                      -- ProductionId
    'Modelo X' :: VARCHAR,             -- Model
    'En Producción' :: VARCHAR,        -- Status
    'Ninguna' :: VARCHAR,              -- Fault
    'Operador A' :: VARCHAR,           -- Operator
    NOW() :: TIMESTAMP                   -- Timestamp del evento
);

-- =============================================
-- Stored Procedure: Actualizar Producción, registrar evento Telegram y actualizar fecha/hora
-- =============================================
CREATE OR REPLACE FUNCTION sp_update_production_info_with_outbox(
    p_production_id INT,
    p_model TEXT,
    p_status TEXT,
    p_operator TEXT,
    p_failure TEXT
)
RETURNS VOID AS $$
DECLARE
    v_old_failure TEXT;
    v_old_model TEXT;
    v_old_status TEXT;
    v_old_operator TEXT;
    v_payload JSONB;
    v_local_time TIMESTAMP;
BEGIN
    -- 🔍 Obtener datos previos de la producción
    SELECT "Failure", "Model", "Status", "Operator"
    INTO v_old_failure, v_old_model, v_old_status, v_old_operator
    FROM "Productions"
    WHERE "ProductionId" = p_production_id;

    IF NOT FOUND THEN
        RAISE NOTICE '⚠️ No se encontró producción con ID %', p_production_id;
        RETURN;
    END IF;

    -- 🧩 Actualizar la producción (incluyendo fecha/hora)
    UPDATE "Productions"
    SET 
        "Model" = COALESCE(p_model, "Model"),
        "Status" = COALESCE(p_status, "Status"),
        "Operator" = COALESCE(p_operator, "Operator"),
        "Failure" = COALESCE(p_failure, "Failure"),
        "DateTime" = now()  -- ⏰ Actualiza la fecha/hora actual
    WHERE "ProductionId" = p_production_id;
    
     v_local_time := now() AT TIME ZONE 'UTC' AT TIME ZONE 'America/Mexico_City';
    -- 💬 Si cambió la falla, registrar evento en Outbox
    IF v_old_failure IS DISTINCT FROM p_failure THEN
        v_payload := jsonb_build_object(
            'productionId', p_production_id,
            'model', COALESCE(p_model, v_old_model),
            'status', COALESCE(p_status, v_old_status),
            'operator', COALESCE(p_operator, v_old_operator),
            'previousFailure', v_old_failure,
            'newFailure', COALESCE(p_failure, v_old_failure),
            'timestamp', to_char(now(), 'YYYY-MM-DD HH24:MI:SS')
        );

        INSERT INTO outbox (event_type, payload, created_at)
        VALUES ('FailureChanged', v_payload, now());

        RAISE NOTICE '📨 Evento FailureChanged registrado en Outbox.';
    END IF;

    RAISE NOTICE '✅ Producción % actualizada con fecha/hora %', p_production_id, now();

END;
$$ LANGUAGE plpgsql;

-- =======================================================
-- EJEMPLO DE USO:
-- =======================================================
-- Ejemplo 1: Actualizar modelo, estado y operador
SELECT sp_update_production_info_with_outbox(
    1,                   -- ID de la producción
    'Modelo-X1',         -- Nuevo modelo
    'Running',           -- Nuevo estado
    'Carlos López',      -- Nuevo operador
    NULL                 -- No cambiar falla
);

-- Ejemplo 2: Cambiar falla → genera evento en la tabla outbox
SELECT sp_update_production_info_with_outbox(
    1,                   -- ID de la producción
    NULL,                -- Mantiene el modelo actual
    'Stopped',           -- Cambia el estado
    NULL,                -- Mantiene el operador
    'Motor sobrecalentado' -- Nueva falla (crea evento Telegram)
);

-- Ejemplo 3: Solo actualizar el operador y fecha
SELECT sp_update_production_info_with_outbox(
    2,
    NULL,
    NULL,
    'Ana Martínez',      -- Cambia operador
    NULL
);
-- =======================================================

