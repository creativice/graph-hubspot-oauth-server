# graph-hubspot-oauth-server

## 1. Build the image

`docker build -t ghos . `

## 2. Run the container

`docker run -it -v $(pwd)/.env:/app/.env -p 3000:3000 ghos`
