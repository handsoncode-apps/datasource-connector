#!/bin/bash
command -v swagger-markdown >/dev/null 2>&1 || { echo >&2 "I require swagger-markdown but it's not installed.  Please install it globally then execute this script again"; exit 1; }
swagger-markdown -i swagger.yaml

