-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_buscar_conta;

DELIMITER $$
CREATE PROCEDURE pr_buscar_conta (
IN email VARCHAR (100) 
) 

BEGIN 
 
SELECT c.id AS id, c.txt_nome AS nome, c.nr_cpf AS cpf, 
		DATE_FORMAT(c.dt_nascimento,'%d/%m/%Y') AS dataNascimento, 
        c.txt_email AS email, c.nr_telefone AS telefone, c.conta_ativa AS contaAtiva, c.url_foto AS url_foto
	FROM tb_cliente c 
    JOIN tb_login l ON c.txt_email = l.txt_login
    WHERE c.txt_email = email
    LIMIT 1;
    
END $$

DELIMITER ;