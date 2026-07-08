# Run full DuckDB pipeline (PowerShell)
# Requires: duckdb CLI on PATH

$ProjectRoot = Split-Path $PSScriptRoot -Parent
Set-Location $ProjectRoot

$db = "analytics.duckdb"

Write-Host "Loading tables..."
Get-Content "sql\duckdb\00_load_tables.sql" | duckdb $db
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$queries = @(
  "01_revenue_overview.sql",
  "02_category_performance.sql",
  "03_revenue_by_state.sql",
  "04_repeat_customers.sql",
  "05_churn_risk_proxy.sql",
  "06_payment_mix.sql",
  "07_reviews_vs_delivery.sql"
)

foreach ($q in $queries) {
  Write-Host "--- $q ---"
  Get-Content "sql\duckdb\$q" | duckdb $db
}

Write-Host "Exporting BI tables..."
Get-Content "scripts\export_bi_tables.sql" | duckdb $db

Write-Host "Done. Upload exports\*.csv to Google Sheets for Looker Studio."
