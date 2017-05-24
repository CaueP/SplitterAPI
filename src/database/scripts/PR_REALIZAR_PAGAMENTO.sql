DROP PROCEDURE IF EXISTS pr_realizar_pagamento;

DELIMITER $$
CREATE PROCEDURE pr_realizar_pagamento (
IN cod_comanda INT,
IN cod_mesa INT
)

BEGIN 				


	INSERT INTO tb_pagamento 
	(tp_parcelamento, ind_status_pagamento, id, dt_pagamento, cod_comanda)
	VALUES (1, 1,(SELECT A.id
				 FROM tb_cliente AS A
				 INNER JOIN tb_comanda AS B
				 ON A.id = B.id
				 WHERE B.cod_comanda = cod_comanda
				 AND B.cod_mesa = cod_mesa), NOW(), cod_comanda);
	
																																	       																											       
END $$

DELIMITER ;	





