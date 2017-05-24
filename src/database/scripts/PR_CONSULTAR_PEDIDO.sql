-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_consultar_pedido;

DELIMITER $$
CREATE PROCEDURE pr_consultar_pedido (
IN id_associacao_estabelecimento VARCHAR(50),
IN cod_comanda INT
)

BEGIN 			 
	
	SELECT A.cod_pedido, B.nome_produto, A.qtd_produto, B.link_img_produto, A.cod_status_pedido, A.val_a_pagar, A.val_pedido, A.txt_observacao
	FROM tb_pedido AS A
	INNER JOIN tb_produto AS B 
	ON A.cod_produto = B.cod_produto
	WHERE A.cod_comanda = cod_comanda
	AND B.cod_estabelecimento = (SELECT B.cod_estabelecimento
							     FROM tb_estabelecimento AS B
							     WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento);
	  

END $$

DELIMITER ;	
