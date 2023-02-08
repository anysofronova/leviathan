docker build -t backend . && docker run -p 4200:4200 --env-file .env -d backend
