param(
  [string]$Message = "Update site"
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$appRoot = Join-Path $repoRoot "app"

Set-Location $appRoot

if (-not (Test-Path "node_modules")) {
  npm install
}

npm run build

Set-Location $repoRoot

Copy-Item -Path (Join-Path $appRoot "dist\*") -Destination $repoRoot -Recurse -Force

git add .nojekyll README.md publish.ps1 index.html assets app

$status = git status --short
if (-not $status) {
  Write-Host "No changes to publish."
  exit 0
}

git commit -m $Message
git push origin main

Write-Host "Published to GitHub Pages."
