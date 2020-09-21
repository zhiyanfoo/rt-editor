set -eu


cat docker-compose.tpl.yml \
  | sigil \
  'postgres_password=dev' \
  'app_origin=localhost:3000' \
  > docker-compose.yml
cat docker-compose.yml
docker stack deploy demo --compose-file docker-compose.yml
