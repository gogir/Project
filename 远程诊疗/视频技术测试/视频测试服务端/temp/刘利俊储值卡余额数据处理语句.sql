IF EXISTS ( SELECT  1
            FROM    sysobjects
            WHERE   type = 'u'
                    AND name = 't_tmp' ) 
    DROP TABLE t_tmp

SELECT  b.customer_id ,
        b.pos_id ,
        SUM(b.amount_remain) AS 充值减消费 ,
        SUM(b.ye) AS 记录余额 ,
        SUM(b.amount_remain) - SUM(b.ye) AS diff
INTO    t_tmp
FROM    ( SELECT    customer_id ,
                    a.pos_id ,
                    SUM(amount_jy) - SUM(xsje) AS 'amount_remain' ,
                    0.000000 AS ye
          FROM      ( SELECT    customer_id ,
                                pos_id ,
                                amount_jy ,
                                0.000000 AS xsje
                      FROM      customer_vip_jyjl
                      WHERE     jy_type = '充值'
                      UNION ALL
                      SELECT    customer_id ,
                                pos_id ,
                                0 ,
                                amount_jy
                      FROM      customer_vip_jyjl
                      WHERE     jy_type <> '充值'
                    ) a ,
                    pos
          WHERE     a.pos_id = pos.pos_id
          GROUP BY  customer_id ,
                    a.pos_id
          UNION ALL
          SELECT    a.customer_id ,
                    a.pos_id AS 'pos_id' ,
                    0 ,
                    SUM(amount_remain) AS 'amount_remain'
          FROM      customer_vip_jyjl a ,
                    ( SELECT    MAX(order_id) AS order_id ,
                                j.pos_id ,
                                j.customer_id
                      FROM      customer_vip_jyjl j
                      WHERE     ISNULL(order_id, '') <> ''
                                AND j.jy_date < DATEADD(dd, 1, GETDATE())
                      GROUP BY  j.customer_id ,
                                j.pos_id ,
                                j.customer_id
                    ) b
          WHERE     a.pos_id = b.pos_id
                    AND ISNULL(a.order_id, '') = b.order_id
                    AND a.customer_id = b.customer_id
          GROUP BY  a.customer_id ,
                    a.pos_id
        ) b
GROUP BY b.customer_id ,
        b.pos_id
HAVING  SUM(b.amount_remain) - SUM(b.ye) <> 0
ORDER BY b.customer_id ,
        b.pos_id

go

DECLARE @Customer_id VARCHAR(50) ,
    @Pos_id VARCHAR(20)
DECLARE llj_bill_cursor CURSOR
FOR
    SELECT  customer_id ,
            pos_id
    FROM    t_tmp	
OPEN llj_bill_cursor

FETCH NEXT FROM llj_bill_cursor
		INTO @Customer_id, @Pos_id
WHILE @@FETCH_STATUS = 0 
    BEGIN

        DECLARE @JY_ID INT ,
            @Amount_JY NUMERIC(20, 6) ,
            @Amount_Remain NUMERIC(20, 6) ,
            @Amount_Tmp NUMERIC(20, 6)
	
        SET @Amount_Tmp = 0
        DECLARE llj_detail_cursor CURSOR
        FOR
            SELECT  jy_id ,
                    CASE WHEN jy_type = '充值' THEN amount_jy
                         ELSE -1 * amount_jy
                    END AS amount_jy
            FROM    customer_vip_jyjl
            WHERE   customer_id = @Customer_id
                    AND pos_id = @pos_id
            ORDER BY order_id
        OPEN llj_detail_cursor

        FETCH NEXT FROM llj_detail_cursor
		INTO @JY_ID, @Amount_JY
        WHILE @@FETCH_STATUS = 0 
            BEGIN
                SET @Amount_Tmp = @Amount_Tmp + @Amount_JY
								
                UPDATE  dbo.customer_vip_jyjl
                SET     amount_remain = @Amount_Tmp
                WHERE   jy_id = @JY_ID
				
                FETCH NEXT FROM llj_detail_cursor
                INTO @JY_ID, @Amount_JY
            END
        CLOSE llj_detail_cursor
        DEALLOCATE llj_detail_cursor
        
        FETCH NEXT FROM llj_bill_cursor
        INTO @Customer_id, @Pos_id
    END
        
CLOSE llj_bill_cursor    
DEALLOCATE llj_bill_cursor
