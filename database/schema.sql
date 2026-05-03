CREATE DATABASE IF NOT EXISTS centro_ensenanza;
USE centro_ensenanza;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) DEFAULT NULL,
    rol ENUM('admin','usuario','moderador') NOT NULL DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Profesor (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    direccion VARCHAR(255),
    poblacion VARCHAR(100),
    dni VARCHAR(20) UNIQUE,
    fecha_nac DATE,
    id_postal VARCHAR(10),
    telefono VARCHAR(20)
);

CREATE TABLE Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    id_profesor INT,
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor)
);

CREATE TABLE Aula (
    id_aula INT AUTO_INCREMENT PRIMARY KEY,
    piso INT,
    num_pupitres INT
);

CREATE TABLE Asignaturas (
    id_asignatura INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    horas_semana INT,
    id_profesor INT,
    id_curso INT,
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor),
    FOREIGN KEY (id_curso) REFERENCES Curso(id_curso)
);

CREATE TABLE Estudiante (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    direccion VARCHAR(255),
    poblacion VARCHAR(100),
    dni VARCHAR(20) UNIQUE,
    fecha_nac DATE,
    id_postal VARCHAR(10),
    telefono VARCHAR(20)
);

CREATE TABLE Matricula (
    id_estudiante INT,
    id_asignatura INT,
    nota DECIMAL(4,2),
    incidencias TEXT,
    PRIMARY KEY (id_estudiante, id_asignatura),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiante(id_estudiante),
    FOREIGN KEY (id_asignatura) REFERENCES Asignaturas(id_asignatura)
);

CREATE TABLE imparte_aula (
    id_aula INT,
    id_asignatura INT,
    mes VARCHAR(20),
    dia VARCHAR(20),
    hora TIME,
    PRIMARY KEY (id_aula, id_asignatura, dia, hora),
    FOREIGN KEY (id_aula) REFERENCES Aula(id_aula),
    FOREIGN KEY (id_asignatura) REFERENCES Asignaturas(id_asignatura)
);