--1. Escriba una Query que entregue la lista de alumnos para el curso "programacio?n"

SELECT a.nombre AS ALUMNO, a.apellido_paterno AS APELLIDO_PATERNO, a.apellido_paterno AS APELLIDO_MATERNO, c.nombre_curso AS CURSO
FROM app_alumno a JOIN app_notas b ON (a.id_alumno=b.alumno_fk_id)
JOIN app_curso c ON (b.curso_fk_id=c.id_curso)
WHERE c.nombre_curso='Programación';

--2. Escriba una Query que calcule el promedio de notas de un alumno en un curso.

SELECT a.nombre AS ALUMNO, a.apellido_paterno AS APELLIDO_PATERNO, a.apellido_paterno AS APELLIDO_MATERNO, (ROUND(b.nota_1+b.nota_2+b.nota_3+b.nota_4+b.nota_5)/5) AS PROMEDIO , c.nombre_curso AS CURSO
FROM app_alumno a JOIN app_notas b ON (a.id_alumno=b.alumno_fk_id)
JOIN app_curso c ON (b.curso_fk_id=c.id_curso)
WHERE c.nombre_curso='Matematicas' AND a.nombre='Mario';

--3. Escriba una Query que entregue a los alumnos y el promedio que tiene en cada curso.

SELECT a.nombre AS ALUMNO, a.apellido_paterno AS APELLIDO_PATERNO, a.apellido_paterno AS APELLIDO_MATERNO, b.promedio AS PROMEDIO , c.nombre_curso AS CURSO
FROM app_alumno a JOIN app_notas b ON (a.id_alumno=b.alumno_fk_id)
JOIN app_curso c ON (b.curso_fk_id=c.id_curso);

--4. Escriba una Query que lista a todos los alumnos con ma?s de un curso con promedio rojo.

SELECT a.nombre AS ALUMNO, a.apellido_paterno AS APELLIDO_PATERNO, a.apellido_paterno AS APELLIDO_MATERNO, b.promedio AS PROMEDIO , c.nombre_curso AS CURSO
FROM app_alumno a JOIN app_notas b ON (a.id_alumno=b.alumno_fk_id)
JOIN app_curso c ON (b.curso_fk_id=c.id_curso)
WHERE b.promedio <= 3.9;

SELECT c1.nombre, c2.nombre
FROM app_alumno c1, app_alumno c2
WHERE c1.rut > c2.rut

/*5. Dejando de lado el problema del cólegio se tiene una tabla con informacio?n de jugadores de tenis: PLAYERS(Nombre, Pais, Ranking). Suponga que Ranking es un nu?mero de 1 a 100 
que es distinto para cada jugador. Si la tabla en un momento dado tiene solo 20 registros, indique cuantos registros tiene la tabla que resulta de la siguiente consulta:

SELECT c1.Nombre, c2.Nombre
FROM PLAYERS c1, PLAYERS c2
WHERE c1.Ranking > c2.Ranking

a) 400
b) 190 -----> correcta
c) 20
d) imposible saberlo


