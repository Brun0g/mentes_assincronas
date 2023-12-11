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

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) UNIQUE,
    quantidade_estoque INT,
    valor DECIMAL(10,2),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    cpf VARCHAR(11) UNIQUE,
    cep VARCHAR(8),
    rua VARCHAR(255),
    numero INT,
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2)
);




CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT,
    observacao TEXT,
    valor_total DECIMAL(10, 2),
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade_produto INT,
    valor_produto DECIMAL(10, 2),
    CONSTRAINT fk_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

ALTER TABLE produtos
ADD COLUMN produto_imagem TEXT;