-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_atualiza_tipo_divisao;

DELIMITER $$
CREATE PROCEDURE pr_atualiza_tipo_divisao (
IN cod_mesa INT,
IN id_associacao_estabelecimento VARCHAR(50),
IN tp_divisao INT
)
 
BEGIN 
	
		UPDATE tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		ON A.cod_estabelecimento = B.cod_estabelecimento
		SET A.tp_divisao = tp_divisao
		WHERE A.cod_mesa = cod_mesa
		AND B.id_associacao_estabelecimento = id_associacao_estabelecimento;

END $$

DELIMITER ;