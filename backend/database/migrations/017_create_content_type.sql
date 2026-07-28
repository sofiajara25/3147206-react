-- database/migrations/create_content_type.sql
-- Correcion: creacion de la tabla content_type
-- Cambiar el tamaño de las columnas

ALTER TABLE public.content_type
ALTER COLUMN app_label TYPE VARCHAR(100),
ALTER COLUMN model TYPE VARCHAR(100);

-- Renombrar la restricción única (si quieres que se llame uq_content_type)

ALTER TABLE public.content_type RENAME CONSTRAINT content_type_app_label_model_key TO uq_content_type;