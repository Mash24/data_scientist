-- Payment method mix
SELECT
  payment_type,
  COUNT(*) AS payment_rows,
  ROUND(SUM(payment_value), 2) AS total_payment_value,
  ROUND(
    100.0 * SUM(payment_value) / SUM(SUM(payment_value)) OVER (),
    2
  ) AS pct_of_value
FROM order_payments
GROUP BY payment_type
ORDER BY total_payment_value DESC;
