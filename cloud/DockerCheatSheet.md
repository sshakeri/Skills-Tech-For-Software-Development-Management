### One liner to run an interactive container 
docker run --rm -it -v $(pwd):/api  -p 88:5000 microsoft/dotnet
