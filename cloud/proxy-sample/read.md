### Build and Run App Server
- docker build -t app .
- dokcer run -p 9000:80 app

### Build and run the cluster
docker-compose build
docker-compose up

### Scale up
docker-compose up --scale app=4

#### ssh into the proxy
docker-compose exec proxy sh
