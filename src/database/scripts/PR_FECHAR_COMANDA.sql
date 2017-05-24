-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_fechar_comanda;

DELIMITER $$
CREATE PROCEDURE pr_fechar_comanda (
IN id_associacao_estabelecimento VARCHAR(50),
IN cod_comanda INT,
IN cod_mesa INT
)

BEGIN 				


	SET @vl_total_mesa = (SELECT SUM(val_pedido)
						  FROM tb_pedido AS A
						  WHERE A.cod_comanda = cod_comanda);
						
	SET @vl_total_individual = (SELECT SUM(val_a_pagar)
							   FROM tb_pedido AS A
						       WHERE A.cod_comanda = cod_comanda);
	
	UPDATE tb_comanda AS A
	INNER JOIN tb_estabelecimento AS B
	        ON A.cod_estabelecimento = B.cod_estabelecimento
	SET A.ind_ativo = 0
	WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
	 AND A.cod_comanda = cod_comanda
	 AND A.cod_mesa = cod_mesa;
	 
	 
	UPDATE tb_mesa AS A
	INNER JOIN tb_estabelecimento AS B
	        ON A.cod_estabelecimento = B.cod_estabelecimento
	SET A.qtd_pessoas = A.qtd_pessoas - 1
	WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
	 AND A.cod_mesa = cod_mesa;
	 
	SELECT @vl_total_mesa AS vl_total_mesa, @vl_total_individual AS vl_total_individual;
																																	       																											       


END $$

DELIMITER ;	





