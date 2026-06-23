# DAX measures (Power BI)

Create a **Metrics** table or add measures to `order_items`.

```dax
Total Revenue =
SUM ( order_items[price] )

Total Orders =
DISTINCTCOUNT ( orders[order_id] )

Average Order Value =
DIVIDE ( [Total Revenue], [Total Orders] )

Delivered Revenue =
CALCULATE (
    [Total Revenue],
    orders[order_status] = "delivered"
)

Revenue YoY % =
VAR CurrentYear = [Total Revenue]
VAR PriorYear = CALCULATE ( [Total Revenue], SAMEPERIODLASTYEAR ( orders[order_purchase_timestamp] ) )
RETURN DIVIDE ( CurrentYear - PriorYear, PriorYear )

Repeat Customers =
VAR CustomerOrders =
    ADDCOLUMNS (
        VALUES ( customers[customer_unique_id] ),
        "@OrderCount", CALCULATE ( DISTINCTCOUNT ( orders[order_id] ), orders[order_status] = "delivered" )
    )
RETURN COUNTROWS ( FILTER ( CustomerOrders, [@OrderCount] > 1 ) )

Repeat Purchase Rate =
DIVIDE ( [Repeat Customers], DISTINCTCOUNT ( customers[customer_unique_id] ) )
```

Format `Repeat Purchase Rate` and `Revenue YoY %` as percentage.

## Calculated column (optional)

```dax
Delivery Days =
DATEDIFF (
    orders[order_purchase_timestamp],
    orders[order_delivered_customer_date],
    DAY
)
```

Use for review vs delivery analysis on Page 3.
