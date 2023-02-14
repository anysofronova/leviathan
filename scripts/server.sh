if test ! -z "$(docker images -q leviathan)"; then
  echo "Exist"
  else docker build --mount=type=cache,target=/root/.npm -t leviathan . && docker run -p 5000:5000 --env-file .env -d leviathan
fi
