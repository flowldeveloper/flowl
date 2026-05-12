$ErrorActionPreference = "Stop"

$status = git status --porcelain

if (-not $status) {
  Write-Host "No local changes to sync."
  exit 0
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$message = if ($args.Count -gt 0) {
  $args -join " "
} else {
  "Sync flowl work $timestamp"
}

git add --all
git commit -m $message
git pull --rebase origin main
git push origin main

Write-Host "Flowl changes were saved to GitHub."
