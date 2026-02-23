# Point CUDA to 11.8 for THIS terminal only
$env:CUDA_PATH="C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6"

# Prepend CUDA 11.8 binaries to PATH
$env:PATH="$env:CUDA_PATH\bin;$env:CUDA_PATH\libnvvp;$env:PATH"

venv/scripts/activate

Write-Host "CUDA switched to 11.8"