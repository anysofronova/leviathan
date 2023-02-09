if test ! -z "$(docker images -q leviathan)"; then
  echo "Exist"
  else docker build -t leviathan . && docker run -p 5000:5000 --env-file .env -d leviathan
fi
