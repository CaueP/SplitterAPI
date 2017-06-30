-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_consultar_status_mesa;

DELIMITER $$
CREATE PROCEDURE pr_consultar_status_mesa (
IN cod_mesa INT,
IN id_associacao_estabelecimento VARCHAR(50)
)
 
BEGIN 

	SET @ind_status_mesa = (SELECT A.ind_status_mesa
							FROM tb_mesa AS A
							INNER JOIN tb_estabelecimento AS B
							ON A.cod_estabelecimento = B.cod_estabelecimento
							INNER JOIN tb_status_mesa AS C
							ON A.ind_status_mesa = C.ind_status_mesa
							WHERE A.cod_mesa = cod_mesa
							  AND B.id_associacao_estabelecimento = id_associacao_estabelecimento);
							 
	IF (@ind_status_mesa = 0) THEN						 

		SELECT C.dsc_ind_status_mesa, cod_qr_ocupado, Null as cod_cliente, A.tp_divisao AS tipoDivisao
		FROM tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		ON A.cod_estabelecimento = B.cod_estabelecimento
		INNER JOIN tb_status_mesa AS C
		ON A.ind_status_mesa = C.ind_status_mesa
		WHERE A.cod_mesa = cod_mesa
		  AND B.id_associacao_estabelecimento = id_associacao_estabelecimento;
	  
	  
	ELSE
	
		SELECT C.dsc_ind_status_mesa, cod_qr_ocupado, E.txt_email, A.tp_divisao AS tipoDivisao
		FROM tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		ON A.cod_estabelecimento = B.cod_estabelecimento
		INNER JOIN tb_status_mesa AS C
		ON A.ind_status_mesa = C.ind_status_mesa
		INNER JOIN tb_cliente AS E 
				ON A.id = E.id
		WHERE A.cod_mesa = cod_mesa
		  AND B.id_associacao_estabelecimento = id_associacao_estabelecimento;

	END IF;

END $$

DELIMITER ;	
