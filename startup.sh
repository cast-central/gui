#! /usr/bin/env bash

if [ "$1" = "test" ]; then
	echo "Starting cast-central-web test"
	cd /opt/cast-central-web && /usr/local/bin/npm test
else
	echo "Starting cast-central-web"
	cd /opt/cast-central-web && /usr/local/bin/node bin/cast-central-web.js "$@"
fi
