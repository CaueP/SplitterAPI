-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_atualizar_status_mesa;

DELIMITER $$
CREATE PROCEDURE pr_atualizar_status_mesa (
IN cod_mesa INT,
IN id_associacao_estabelecimento VARCHAR(50),
IN cod_qr_ocupado VARCHAR(200),
IN ind_status_mesa INT
)
 
BEGIN 

	SET @ind_status_mesa = ind_status_mesa;

	IF (@ind_status_mesa = 0) THEN
	
		UPDATE tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		ON A.cod_estabelecimento = B.cod_estabelecimento
		SET A.ind_status_mesa = ind_status_mesa, A.cod_qr_ocupado = cod_qr_ocupado, A.tp_divisao = 3, A.id = null
		WHERE A.cod_mesa = cod_mesa
		  AND B.id_associacao_estabelecimento = id_associacao_estabelecimento;

	ELSE
		UPDATE tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		ON A.cod_estabelecimento = B.cod_estabelecimento
		SET A.ind_status_mesa = ind_status_mesa, A.cod_qr_ocupado = cod_qr_ocupado
		WHERE A.cod_mesa = cod_mesa
		  AND B.id_associacao_estabelecimento = id_associacao_estabelecimento;

	END IF;

END $$

DELIMITER ;
