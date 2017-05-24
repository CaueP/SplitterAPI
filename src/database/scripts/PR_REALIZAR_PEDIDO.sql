-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_realizar_pedido;

DELIMITER $$
CREATE PROCEDURE pr_realizar_pedido (
IN id_associacao_estabelecimento VARCHAR(50),
IN cod_comanda INT,
IN cod_produto INT,
IN qtd_produto INT,
IN txt_observacao VARCHAR(200),
IN cod_mesa INT
)

BEGIN 				

	SET @cod_estabelecimento =  (SELECT B.cod_estabelecimento
									FROM tb_estabelecimento AS B
									WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento);

	
	
	INSERT INTO tb_pedido
	(cod_status_pedido, dt_pedido,cod_produto,qtd_produto, cod_comanda,txt_observacao,val_pedido,val_a_pagar)
	SELECT DISTINCT 0, NOW(), (SELECT D.cod_produto
							   FROM tb_produto AS D
							   WHERE D.cod_produto = cod_produto
							   AND D.cod_estabelecimento = @cod_estabelecimento), qtd_produto, B.cod_comanda, txt_observacao, ((SELECT C.val_produto
																																FROM tb_produto AS C
																																WHERE C.cod_produto = cod_produto) * qtd_produto), (((SELECT C.val_produto
																																														FROM tb_produto AS C
																																														WHERE C.cod_produto = cod_produto) * qtd_produto)/C.qtd_pessoas)																																       
	FROM tb_comanda AS B
	INNER JOIN tb_mesa AS C
	        ON B.cod_mesa = C.cod_mesa
	        AND B.cod_estabelecimento = C.cod_estabelecimento
	WHERE B.cod_estabelecimento = @cod_estabelecimento
	AND B.cod_mesa = cod_mesa
	AND B.ind_ativo = 1;
								
				
	SET @vl_total_mesa = (SELECT SUM(val_pedido)
						  FROM tb_pedido AS A
						  WHERE A.cod_comanda = cod_comanda);
						
	SET @vl_total_individual = (SELECT SUM(val_a_pagar)
							   FROM tb_pedido AS A
						       WHERE A.cod_comanda = cod_comanda);			
								

	UPDATE tb_comanda AS A
	INNER JOIN tb_estabelecimento AS B
	        ON A.cod_estabelecimento = B.cod_estabelecimento
	SET vl_total_mesa = @vl_total_mesa, vl_total_individual = @vl_total_individual
	WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
	 AND A.cod_mesa = cod_mesa;																									       																											       
	
   SELECT LAST_INSERT_ID() AS cod_pedido;
	  

END $$

DELIMITER ;	
