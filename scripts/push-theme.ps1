# Use instead of a direct theme push to validate the exact local configuration first.
$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    python scripts/validate-settings.py
    if ($LASTEXITCODE -ne 0) { throw 'Invalid theme settings; upload stopped.' }
    shopify theme check
    if ($LASTEXITCODE -ne 0) { throw 'Theme Check failed; upload stopped.' }
    shopify theme push @args
    if ($LASTEXITCODE -ne 0) { throw 'Theme upload failed.' }
} finally { Pop-Location }
