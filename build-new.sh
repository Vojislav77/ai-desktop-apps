#!/bin/bash
NAME=$1
URL=$2
ICON=$3
if [ -z "$NAME" ] || [ -z "$URL" ]; then
  echo "Usage: $0 <name> <url> [icon-path]"
  exit 1
fi
cp -r app-template ${NAME}-app
cd ${NAME}-app
rm -rf dist node_modules package-lock.json
sed -i "s/qwen/${NAME}/g" main.js
sed -i "s/Qwen/${NAME^}/g" main.js
sed -i "s/chat.qwen.ai/${URL}/g" main.js
sed -i "s/qwen/${NAME}/g" package.json
sed -i "s/Qwen/${NAME^}/g" package.json
sed -i "s/qwen-window-state/${NAME}-window-state/g" main.js
if [ -f "$ICON" ]; then cp "$ICON" icon.png; fi
npm install
npm run build
echo "AppImage built at dist/${NAME^}-1.0.0.AppImage"
