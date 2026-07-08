@echo off
REM Run full DuckDB pipeline (Windows)
REM Requires: duckdb CLI on PATH — https://duckdb.org/docs/installation/

cd /d "%~dp0.."
set DB=analytics.duckdb

echo Loading tables...
duckdb %DB% < sql\duckdb\00_load_tables.sql
if errorlevel 1 exit /b 1

echo Running analyses...
for %%f in (01 02 03 04 05 06 07) do (
  echo --- %%f ---
  duckdb %DB% < sql\duckdb\%%f_*.sql
)

echo Exporting BI tables...
duckdb %DB% < scripts\export_bi_tables.sql

echo Done. CSV exports in exports\
