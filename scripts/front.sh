if test ! -z "$(docker images -q frontend)"; then
  echo "Exist"
  else docker build -t frontend . && docker run -p 3000:3000 frontend
fi
