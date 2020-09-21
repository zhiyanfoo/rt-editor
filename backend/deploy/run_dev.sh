set -eu

cat docker-compose.tpl.yml \
  | sigil \
  'postgres_password=dev' \
  'app_origin=localhost:80' \
  > docker-compose.yml
cat docker-compose.yml
docker stack deploy editor --compose-file docker-compose.yml
