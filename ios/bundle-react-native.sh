#!/bin/bash
set -e

case "$CONFIGURATION" in
  Debug) export BABEL_ENV=development ;;
  Release) export BABEL_ENV=production ;;
  Staging) export BABEL_ENV=staging ;;
  *) echo "error: Unknown API configuration: $CONFIGURATION" >&2; exit 1 ;;
esac

exec bash ../node_modules/react-native/scripts/react-native-xcode.sh
