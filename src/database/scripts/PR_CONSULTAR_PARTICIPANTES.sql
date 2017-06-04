-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_consultar_participantes;

DELIMITER $$
CREATE PROCEDURE pr_consultar_participantes (
IN id_associacao_estabelecimento VARCHAR(50),
IN cod_mesa INT
)

BEGIN 			 
	
	SELECT A.txt_nome AS nome, A.txt_email AS email, D.cod_comanda AS comanda
	FROM tb_cliente AS A
	INNER JOIN tb_estabelecimento AS B 
	ON B.id_associacao_estabelecimento = id_associacao_estabelecimento
	INNER JOIN tb_mesa AS C 
	ON C.cod_estabelecimento = B.cod_estabelecimento
	AND C.cod_mesa = cod_mesa
	INNER JOIN tb_comanda AS D
	ON C.cod_mesa = D.cod_mesa
	AND D.cod_estabelecimento = B.cod_estabelecimento
	AND D.id = A.id
	WHERE D.ind_ativo = 1;
	  

END $$

DELIMITER ;	

