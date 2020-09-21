set -eu


cat docker-compose.tpl.yml \
  | sigil \
  'postgres_password=dev' \
  'app_origin=localhost:3000' \
  > docker-compose.yml
cat docker-compose.yml
docker-compose -f docker-compose.yml up
