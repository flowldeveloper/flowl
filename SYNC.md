# Flowl Sync

GitHub repository:
https://github.com/flowldeveloper/flowl

## First setup on another PC

```powershell
git clone https://github.com/flowldeveloper/flowl.git
cd flowl
```

## Before starting work

```powershell
.\sync-start.ps1
```

## After finishing work

```powershell
.\sync-save.ps1 "Describe what changed"
```

If PowerShell blocks scripts, run this once in the repository folder:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
