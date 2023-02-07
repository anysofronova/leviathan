docker build -t leviathan-api . && docker run -p 4200:4200 --env-file .env -d leviathan-api
