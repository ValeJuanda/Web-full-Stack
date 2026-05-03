USE centro_ensenanza;

INSERT INTO usuarios (usuario, password, rol) VALUES
('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'admin'),
('profesor1', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'usuario'),
('moderador1', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'moderador'),
('usuario1', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'usuario'),
('usuario2', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'usuario');

INSERT INTO Profesor (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES
('Carlos', 'Ramírez', 'Calle 10 #5-20', 'Pereira', '12345678A', '1980-03-15', '660001', '3001234567'),
('María', 'López', 'Carrera 8 #12-30', 'Dosquebradas', '23456789B', '1975-07-22', '660002', '3109876543'),
('Jorge', 'Martínez', 'Av. 30 de Agosto #40-10', 'Pereira', '34567890C', '1985-11-05', '660001', '3205551234'),
('Ana', 'González', 'Calle 15 #8-45', 'Santa Rosa', '45678901D', '1990-02-18', '660003', '3154447890'),
('Luis', 'Fernández', 'Carrera 5 #10-25', 'Pereira', '56789012E', '1982-09-30', '660001', '3006663210');

INSERT INTO Curso (nombre, id_profesor) VALUES
('Grado Sexto', 1),
('Grado Séptimo', 2),
('Grado Octavo', 3),
('Grado Noveno', 4),
('Grado Décimo', 5);

INSERT INTO Aula (piso, num_pupitres) VALUES
(1, 30),
(1, 25),
(2, 35),
(2, 28),
(3, 20);

INSERT INTO Asignaturas (nombre, horas_semana, id_profesor, id_curso) VALUES
('Matemáticas', 5, 1, 1),
('Español', 4, 2, 2),
('Ciencias Naturales', 4, 3, 3),
('Historia', 3, 4, 4),
('Inglés', 5, 5, 5);

INSERT INTO Estudiante (nombre, apellido, direccion, poblacion, dni, fecha_nac, id_postal, telefono) VALUES
('David', 'Garcia', 'Pinares', 'Pereira', '123456789A', '2006-09-09', '12345', '3001234567'),
('Juan', 'López', 'Circunvalar', 'Pereira', '123456789B', '2006-07-22', '678910', '3109876543'),
('Perit', 'Carbajal', 'Poblado', 'Pereira', '123456789C', '2000-11-05', '11121314', '3205551234'),
('Valentina', 'Henao', 'Cuba', 'Pereira', '123456789D', '2007-02-18', '15161718', '3154447890'),
('Luis', 'Trejoz', 'Belmonte', 'Pereira', '123456789E', '2005-09-30', '19202122', '3006663210');

INSERT INTO Matricula (id_estudiante, id_asignatura, nota, incidencias) VALUES
(1, 1, 4.5, 'Ninguna'),
(2, 2, 3.8, 'Falta el 10 de marzo'),
(3, 3, 4.0, 'Ninguna'),
(4, 4, 3.5, 'Entrega tardía'),
(5, 5, 4.8, 'Ninguna');

INSERT INTO imparte_aula (id_aula, id_asignatura, mes, dia, hora) VALUES
(1, 1, 'Mayo', 'Lunes', '07:00:00'),
(2, 2, 'Mayo', 'Lunes', '08:00:00'),
(3, 3, 'Mayo', 'Martes', '09:00:00'),
(4, 4, 'Mayo', 'Martes', '10:00:00'),
(5, 5, 'Mayo', 'Miércoles', '11:00:00');