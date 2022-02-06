--SCRIPT CREACIÓN DE TABLAS

CREATE TABLE alumno (
    id_alumno          INTEGER NOT NULL,
    rut                NUMBER(9) NOT NULL,
    nombre             VARCHAR2(10) NOT NULL,
    apellido_paterno   VARCHAR2(30) NOT NULL,
    apellido_materno   VARCHAR2(30) NOT NULL,
    telefono_alumno    NUMBER(9) NOT NULL,
    direccion          VARCHAR2(300) NOT NULL,
    email              VARCHAR2(100) NOT NULL,
    comuna_fk   INTEGER NOT NULL
);

ALTER TABLE alumno ADD CONSTRAINT alumno_pk PRIMARY KEY ( id_alumno );

CREATE TABLE comuna (
    id_comuna          INTEGER NOT NULL,
    nombre             VARCHAR2(100) NOT NULL,
    region_fk   INTEGER NOT NULL
);

ALTER TABLE comuna ADD CONSTRAINT comuna_pk PRIMARY KEY ( id_comuna );

CREATE TABLE curso (
    id_curso               INTEGER NOT NULL,
    nombre_curso           VARCHAR2(50) NOT NULL,
    profesor_fk   INTEGER NOT NULL
);

ALTER TABLE curso ADD CONSTRAINT curso_pk PRIMARY KEY ( id_curso );

CREATE TABLE notas (
    id_nota            INTEGER NOT NULL,
    nota_1             FLOAT NOT NULL,
    nota_2             FLOAT NOT NULL,
    nota_3             FLOAT NOT NULL,
    nota_4             FLOAT NOT NULL,
    nota_5             FLOAT NOT NULL,
    promedio           FLOAT NOT NULL,
    alumno_fk   INTEGER NOT NULL,
    curso_fk     INTEGER NOT NULL
);

ALTER TABLE notas ADD CONSTRAINT notas_pk PRIMARY KEY ( id_nota );

CREATE TABLE profesor (
    id_profesor        INTEGER NOT NULL,
    rut                NUMBER(11) NOT NULL,
    nombre             VARCHAR2(30) NOT NULL,
    apellido_paterno   VARCHAR2(30) NOT NULL,
    apellido_materno   VARCHAR2(30) NOT NULL,
    telefono           NUMBER(9) NOT NULL,
    direccion          VARCHAR2(300) NOT NULL,
    email              VARCHAR2(100) NOT NULL,
    comuna_fk   INTEGER NOT NULL
);

ALTER TABLE profesor ADD CONSTRAINT profesor_pk PRIMARY KEY ( id_profesor );

CREATE TABLE region (
    id_region   INTEGER NOT NULL,
    nombre      VARCHAR2(100) NOT NULL
);

ALTER TABLE region ADD CONSTRAINT region_pk PRIMARY KEY ( id_region );

ALTER TABLE alumno
    ADD CONSTRAINT alumno_comuna_fk FOREIGN KEY ( comuna_fk )
        REFERENCES comuna ( id_comuna );

ALTER TABLE comuna
    ADD CONSTRAINT comuna_region_fk FOREIGN KEY ( region_fk )
        REFERENCES region ( id_region );

ALTER TABLE curso
    ADD CONSTRAINT curso_profesor_fk FOREIGN KEY ( profesor_fk )
        REFERENCES profesor ( id_profesor );

ALTER TABLE notas
    ADD CONSTRAINT notas_alumno_fk FOREIGN KEY ( alumno_fk )
        REFERENCES alumno ( id_alumno );

ALTER TABLE notas
    ADD CONSTRAINT notas_curso_fk FOREIGN KEY ( curso_fk )
        REFERENCES curso ( id_curso );

ALTER TABLE profesor
    ADD CONSTRAINT profesor_comuna_fk FOREIGN KEY ( comuna_fk )
        REFERENCES comuna ( id_comuna );