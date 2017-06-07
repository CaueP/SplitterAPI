DROP TABLE IF EXISTS tb_pedido;
DROP TABLE IF EXISTS tb_mesa_cliente;
DROP TABLE IF EXISTS tb_pagamento;
DROP TABLE IF EXISTS tb_tp_parcelamento;
DROP TABLE IF EXISTS tb_cartao;
DROP TABLE IF EXISTS tb_cod_rede_origem;
DROP TABLE IF EXISTS tb_login;
DROP TABLE IF EXISTS tb_comanda;
DROP TABLE IF EXISTS tb_mesa;
DROP TABLE IF EXISTS tb_status_mesa;
DROP TABLE IF EXISTS tb_tp_divisao;
DROP TABLE IF EXISTS tb_cliente;
DROP TABLE IF EXISTS tb_status_pedido;
DROP TABLE IF EXISTS tb_status_pagamento;
DROP TABLE IF EXISTS tb_produto;
DROP TABLE IF EXISTS tb_tp_alimento;
DROP TABLE IF EXISTS tb_estabelecimento;

-- VR, VISA, MASTER
CREATE TABLE tb_cod_rede_origem(
cod_rede_origem INT NOT NULL,
dsc_cod_rede_origem VARCHAR(30) NOT NULL,
CONSTRAINT PK_tb_cod_rede_origem PRIMARY KEY NONCLUSTERED (cod_rede_origem)
);

-- A VISTA, PARCELADO EMISSOR, PARCELADO ADIQUIRENTE, DINHEIRO
CREATE TABLE tb_tp_parcelamento(
tp_parcelamento INT NOT NULL,
dsc_tp_parcelamento VARCHAR(30) NOT NULL,
CONSTRAINT PK_tb_tp_parcelamento PRIMARY KEY NONCLUSTERED (tp_parcelamento)
);

-- 0 VAZio
CREATE TABLE tb_tp_divisao(
tp_divisao INT NOT NULL,
dsc_tp_divisao VARCHAR(30) NOT NULL,
CONSTRAINT PK_tb_tp_divisao PRIMARY KEY NONCLUSTERED (tp_divisao)
);

-- BEBIDA, ENTRADA, PRATO PRINCIPAL
CREATE TABLE tb_tp_alimento(
cod_tp_alimento INT NOT NULL,
dsc_tp_alimento VARCHAR(30) NOT NULL,
CONSTRAINT PK_tb_tp_alimento PRIMARY KEY NONCLUSTERED (cod_tp_alimento)
);


-- OCUPADO, VAZIO, LIMPEZA..
CREATE TABLE tb_status_mesa(
ind_status_mesa INT NOT NULL,
dsc_ind_status_mesa VARCHAR(30) NOT NULL,
CONSTRAINT PK_tb_status_mesa PRIMARY KEY NONCLUSTERED (ind_status_mesa)
);

-- EM APROVACAO, APROVADO, NEGADO, REALIZADO
CREATE TABLE tb_status_pagamento(
ind_status_pagamento INT NOT NULL,
dsc_ind_status_pagamento VARCHAR(30) NOT NULL,
CONSTRAINT PK_ind_status_pagamento PRIMARY KEY NONCLUSTERED (ind_status_pagamento)
);

-- ESPERA, EM PREPARO, PRONTO, ENTREGUE
CREATE TABLE tb_status_pedido(
cod_status_pedido INT NOT NULL,
dsc_ind_status_pedido VARCHAR(30) NOT NULL, 
CONSTRAINT PK_tb_status_pedido PRIMARY KEY NONCLUSTERED (cod_status_pedido)
);


CREATE TABLE tb_cliente(
id INT NOT NULL AUTO_INCREMENT,
txt_nome VARCHAR (100) NOT NULL,
nr_cpf BIGINT NOT NULL,
dt_nascimento DATETIME NOT NULL,
txt_email VARCHAR (100) NOT NULL UNIQUE,
nr_telefone BIGINT,
conta_ativa boolean NOT NULL DEFAULT 1,
url_foto VARCHAR (300),
CONSTRAINT PK_tb_cliente PRIMARY KEY NONCLUSTERED (Id)
);

CREATE TABLE tb_login(
id INT NOT NULL,
txt_login VARCHAR (30) NOT NULL UNIQUE,
txt_senha VARCHAR (30) NOT NULL,
CONSTRAINT PK_tb_login PRIMARY KEY NONCLUSTERED (Id),
CONSTRAINT FK_tb_cliente_login FOREIGN KEY (Id)
REFERENCES tb_cliente (Id)
ON DELETE CASCADE
ON UPDATE CASCADE
);


CREATE TABLE tb_estabelecimento(
cod_estabelecimento INT NOT NULL AUTO_INCREMENT, 
id_associacao_estabelecimento VARCHAR(50) NOT NULL,
nr_cnpj BIGINT NOT NULL,
dsc_razao_social VARCHAR (100) NOT NULL,
dsc_nome_fantasia VARCHAR (100) NOT NULL,
dsc_endereco VARCHAR (100) NOT NULL,
nr_telefone INT NOT NULL,
CONSTRAINT PK_tb_estabelecimento PRIMARY KEY NONCLUSTERED (cod_estabelecimento)
);


CREATE TABLE tb_produto(
cod_produto INT NOT NULL AUTO_INCREMENT, 
nome_produto VARCHAR (30) NOT NULL,
cod_tp_alimento INT NOT NULL,
dsc_produto VARCHAR (200) NOT NULL,
val_produto FLOAT NOT NULL,
link_img_produto VARCHAR (200) NOT NULL,
cod_estabelecimento INT NOT NULL,
CONSTRAINT PK_tb_produto PRIMARY KEY NONCLUSTERED (cod_produto),
CONSTRAINT FK_tb_produto_tp_alimento FOREIGN KEY (cod_tp_alimento)
REFERENCES tb_tp_alimento (cod_tp_alimento)
ON UPDATE CASCADE,
CONSTRAINT tb_estabelecimento_produto FOREIGN KEY (cod_estabelecimento)
REFERENCES tb_estabelecimento (cod_estabelecimento)
ON UPDATE CASCADE
);


CREATE TABLE tb_mesa(
cod_mesa INT NOT NULL,
ind_status_mesa INT NOT NULL,
cod_estabelecimento INT NOT NULL,
cod_qr VARCHAR(200) NOT NULL,
cod_qr_ocupado VARCHAR(200), 
tp_divisao INT NOT NULL,
id INT,
qtd_pessoas INT NOT NULL,
CONSTRAINT PK_tb_mesa PRIMARY KEY NONCLUSTERED (cod_mesa, cod_estabelecimento),
CONSTRAINT FK_tb_status_mesa FOREIGN KEY (ind_status_mesa)
REFERENCES tb_status_mesa (ind_status_mesa)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_estabelecimento FOREIGN KEY (cod_estabelecimento)
REFERENCES tb_estabelecimento(cod_estabelecimento)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_tp_divisao FOREIGN KEY (tp_divisao)
REFERENCES tb_tp_divisao (tp_divisao)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_primeiro_associado FOREIGN KEY (id)
REFERENCES tb_cliente (id)
ON UPDATE CASCADE
);


CREATE TABLE tb_mesa_cliente(
id_associacao INT NOT NULL AUTO_INCREMENT,
id INT NOT NULL,
dat_inclusao DATETIME NOT NULL,
cod_mesa INT NOT NULL,
cod_estabelecimento INT NOT NULL,
CONSTRAINT PK_tb_mesa_cliente PRIMARY KEY NONCLUSTERED (id_associacao),
CONSTRAINT FK_tb_cliente_mesa FOREIGN KEY (id)
REFERENCES tb_cliente (id)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_mesa FOREIGN KEY (cod_mesa)
REFERENCES tb_mesa (cod_mesa)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_estabelecimento_cliente FOREIGN KEY (cod_estabelecimento)
REFERENCES tb_estabelecimento(cod_estabelecimento)
ON UPDATE CASCADE
);

CREATE TABLE tb_comanda(
cod_comanda INT NOT NULL AUTO_INCREMENT,
vl_total_mesa FLOAT NOT NULL,
vl_total_individual FLOAT NOT NULL,
dt_comanda DATETIME NOT NULL,
ind_ativo INT NOT NULL,
id INT NOT NULL,
cod_estabelecimento INT NOT NULL,
cod_mesa INT NOT NULL,
CONSTRAINT PK_tb_comanda PRIMARY KEY NONCLUSTERED (cod_comanda),
CONSTRAINT FK_tb_cliente_comanda FOREIGN KEY (id)
REFERENCES tb_cliente (id)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_mesa_comanda FOREIGN KEY (cod_mesa, cod_estabelecimento)
REFERENCES tb_mesa (cod_mesa, cod_estabelecimento)
);



CREATE TABLE tb_pedido(
cod_pedido INT NOT NULL AUTO_INCREMENT,
cod_status_pedido INT NOT NULL,
dt_pedido DATETIME NOT NULL,
cod_produto INT NOT NULL,
qtd_produto INT NOT NULL,
cod_comanda INT NOT NULL,
txt_observacao VARCHAR(200) NOT NULL,
val_pedido FLOAT NOT NULL,
val_a_pagar FLOAT NOT NULL,
CONSTRAINT PK_tb_pedido PRIMARY KEY NONCLUSTERED (cod_pedido),
CONSTRAINT FK_tb_produto_pedido FOREIGN KEY (cod_produto)
REFERENCES tb_produto (cod_produto)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_comanda_pedido FOREIGN KEY (cod_comanda)
REFERENCES tb_comanda (cod_comanda)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_status_pedido FOREIGN KEY (cod_status_pedido)
REFERENCES tb_status_pedido (cod_status_pedido)
ON UPDATE CASCADE
);

CREATE TABLE tb_pagamento(
cod_pagamento INT NOT NULL AUTO_INCREMENT,
tp_parcelamento INT NOT NULL,
ind_status_pagamento INT NOT NULL,
id INT NOT NULL,
dt_pagamento DATETIME NOT NULL,
cod_comanda INT NOT NULL,
CONSTRAINT PK_tb_pagamento PRIMARY KEY NONCLUSTERED (cod_pagamento),
CONSTRAINT FK_tb_comanda FOREIGN KEY (cod_comanda)
REFERENCES tb_comanda (cod_comanda),
CONSTRAINT FK_tb_cliente_pagamento FOREIGN KEY (id)
REFERENCES tb_cliente (id)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_tp_parcelamento FOREIGN KEY (tp_parcelamento)
REFERENCES tb_tp_parcelamento (tp_parcelamento)
ON UPDATE CASCADE,
CONSTRAINT FK_tb_status_pagamento FOREIGN KEY (ind_status_pagamento)
REFERENCES tb_status_pagamento (ind_status_pagamento)
ON UPDATE CASCADE
);

CREATE TABLE tb_cartao(
id INT NOT NULL,
txt_nome_cartao VARCHAR (100),
nr_cartao BIGINT NOT NULL,
cod_seguranca_cartao INT NOT NULL,
cod_rede_origem INT NOT NULL,
dt_validade DATETIME NOT NULL,
CONSTRAINT FK_tb_cliente_cartao FOREIGN KEY (Id)
REFERENCES tb_cliente (Id)
ON DELETE CASCADE
ON UPDATE CASCADE,
CONSTRAINT FK_tb_cod_rede_origem FOREIGN KEY (cod_rede_origem)
REFERENCES tb_cod_rede_origem (cod_rede_origem)
ON UPDATE CASCADE
);


