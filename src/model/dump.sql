CREATE DATABASE pdv;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao text
);
