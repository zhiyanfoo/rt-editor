set -eu
DOCKER_BUILDKIT=1 docker build .. -f Dockerfile -t zhiyanfoo/rt-editor-http
docker push zhiyanfoo/rt-editor-http
