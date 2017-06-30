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
	IF (@vl_total_mesa IS NULL) THEN
		SET @vl_total_mesa = 0;		
	END IF;					
	SET @vl_total_individual = (SELECT SUM(val_a_pagar)
							   FROM tb_pedido AS A
						       WHERE A.cod_comanda = cod_comanda);
	IF (@vl_total_individual IS NULL) THEN
		SET @vl_total_individual = 0;		
	END IF;	

	UPDATE tb_comanda AS A
	INNER JOIN tb_estabelecimento AS B
	        ON A.cod_estabelecimento = B.cod_estabelecimento
	SET A.ind_ativo = 0, vl_total_mesa = @vl_total_mesa, vl_total_individual = @vl_total_individual
	WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
	 AND A.cod_comanda = cod_comanda
	 AND A.cod_mesa = cod_mesa;
	 
	 
	UPDATE tb_mesa AS A
	INNER JOIN tb_estabelecimento AS B
	        ON A.cod_estabelecimento = B.cod_estabelecimento
	SET A.qtd_pessoas = A.qtd_pessoas - 1
	WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
	 AND A.cod_mesa = cod_mesa;
	 
	 		 
	SET @qtd_pessoas = (SELECT A.qtd_pessoas
					    FROM tb_mesa A
					    INNER JOIN tb_estabelecimento AS B
						ON A.cod_estabelecimento = B.cod_estabelecimento
					    WHERE A.cod_mesa = cod_mesa
					    AND B.id_associacao_estabelecimento = id_associacao_estabelecimento);
					    
	 
	IF (@qtd_pessoas < 1) THEN
	
		UPDATE tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		ON A.cod_estabelecimento = B.cod_estabelecimento
		SET A.ind_status_mesa = 0, A.cod_qr_ocupado = '', A.tp_divisao = 3, A.id = null, A.qtd_pessoas = 0
		WHERE A.cod_mesa = cod_mesa
		AND B.id_associacao_estabelecimento = id_associacao_estabelecimento;
		
	END IF;
	 
	 
	SELECT @vl_total_mesa AS vl_total_mesa, @vl_total_individual AS vl_total_individual;
																																	       																											       

END $$

DELIMITER ;