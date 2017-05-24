-- CREATE PROCEDURE
DROP PROCEDURE IF EXISTS pr_associar_cliente_mesa;

DELIMITER $$
CREATE PROCEDURE pr_associar_cliente_mesa (
IN email VARCHAR (100),
IN tp_divisao INT,
IN cod_qr_ocupado VARCHAR(200), 
IN id_associacao_estabelecimento VARCHAR(50),
IN cod_mesa INT
)

BEGIN

  DECLARE no_rows CONDITION FOR SQLSTATE '22012';
  DECLARE CONTINUE HANDLER FOR no_rows
  RESIGNAL SET MESSAGE_TEXT = 'Esta mesa nao esta associada a este estabelecimento'; 
  
  SET @COD_MESA = (SELECT A.cod_mesa
	 FROM tb_mesa AS A
	 INNER JOIN tb_estabelecimento AS B
     ON A.cod_estabelecimento = B.cod_estabelecimento
     WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
       AND A.cod_mesa = cod_mesa);
   
  SET @ID = (SELECT A.id
	 FROM tb_mesa AS A
	 INNER JOIN tb_estabelecimento AS B
     ON A.cod_estabelecimento = B.cod_estabelecimento
     WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
       AND A.cod_mesa = cod_mesa);


  IF (@COD_MESA IS NULL) THEN
   SIGNAL no_rows;
 
  END IF;  
   
  IF (@COD_MESA IS NOT NULL AND @ID IS NULL) THEN
		INSERT INTO tb_mesa_cliente
		(id, dat_inclusao, cod_mesa, cod_estabelecimento)
		VALUES ((SELECT A.id
				 FROM tb_cliente AS A
				 WHERE A.txt_email = email), NOW(), cod_mesa, (SELECT B.cod_estabelecimento
															   FROM tb_estabelecimento AS B
															   WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento));
											
		UPDATE tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		        ON A.cod_estabelecimento = B.cod_estabelecimento
		INNER JOIN tb_cliente AS C
				ON C.txt_email = email
		SET A.ind_status_mesa = 1, A.cod_qr_ocupado = cod_qr_ocupado, A.tp_divisao = tp_divisao, A.id = C.id, A.qtd_pessoas = A.qtd_pessoas + 1
		WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
		 AND A.cod_mesa = cod_mesa;
		 
		 
	   INSERT INTO tb_comanda
	   (vl_total_mesa, vl_total_individual, dt_comanda, ind_ativo, id, cod_estabelecimento, cod_mesa)
	   VALUES (0, 0, NOW(), 1, (SELECT A.id
							 FROM tb_cliente AS A
				             WHERE A.txt_email = email), (SELECT B.cod_estabelecimento
															   FROM tb_estabelecimento AS B
															   WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento), cod_mesa);
	  
	  SELECT A.cod_comanda 
	  FROM tb_comanda AS A
	  WHERE id = (SELECT A.id
				  FROM tb_cliente AS A
				  WHERE A.txt_email = email)
	  AND A.ind_ativo = 1
	  AND A.cod_estabelecimento = (SELECT B.cod_estabelecimento
								   FROM tb_estabelecimento AS B
								   WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento)
	  AND A.cod_mesa = cod_mesa;
				             

 END IF;		 
		 
	IF (@COD_MESA IS NOT NULL AND @ID IS NOT NULL) THEN
		INSERT INTO tb_mesa_cliente
		(id, dat_inclusao, cod_mesa, cod_estabelecimento)
		VALUES ((SELECT A.id
				 FROM tb_cliente AS A
				 WHERE A.txt_email = email), NOW(), cod_mesa, (SELECT B.cod_estabelecimento
															   FROM tb_estabelecimento AS B
															   WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento));
				 
		UPDATE tb_mesa AS A
		INNER JOIN tb_estabelecimento AS B
		        ON A.cod_estabelecimento = B.cod_estabelecimento
		SET A.cod_qr_ocupado = cod_qr_ocupado, A.qtd_pessoas = A.qtd_pessoas + 1
		WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento
		 AND A.cod_mesa = cod_mesa;
		 
		 
	   INSERT INTO tb_comanda
	   (vl_total_mesa, vl_total_individual, dt_comanda, ind_ativo, id, cod_estabelecimento, cod_mesa)
	   VALUES (0, 0, NOW(), 1, (SELECT A.id
							 FROM tb_cliente AS A
				             WHERE A.txt_email = email), (SELECT B.cod_estabelecimento
															   FROM tb_estabelecimento AS B
															   WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento), cod_mesa);
															   
	
	  SELECT A.cod_comanda 
	  FROM tb_comanda AS A
	  WHERE id = (SELECT A.id
				  FROM tb_cliente AS A
				  WHERE A.txt_email = email)
	  AND A.ind_ativo = 1
	  AND A.cod_estabelecimento = (SELECT B.cod_estabelecimento
								   FROM tb_estabelecimento AS B
								   WHERE B.id_associacao_estabelecimento = id_associacao_estabelecimento)
	  AND A.cod_mesa = cod_mesa;
	
	
  END IF;

END $$

DELIMITER ;
