#!/bin/sh
# Assembles the two outputs from src/.
#   index.html    - the deployable standalone page
#   artifact.html - same page without document-level tags, for Claude Artifacts
set -e
cd "$(dirname "$0")"

{
  echo '<!doctype html>'
  echo '<html lang="en">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1">'
  cat src/meta.html
  echo '<style>'
  cat src/style.css
  echo '</style>'
  echo '</head>'
  echo '<body>'
  cat src/body.html
  cat src/cdn.html
  echo '<script>'
  cat src/app.js
  echo '</script>'
  echo '</body>'
  echo '</html>'
} > index.html

{
  cat src/meta.html
  echo '<style>'
  cat src/style.css
  echo '</style>'
  cat src/body.html
  cat src/cdn.html
  echo '<script>'
  cat src/app.js
  echo '</script>'
} > artifact.html

echo "built index.html    $(wc -c < index.html) bytes"
echo "built artifact.html $(wc -c < artifact.html) bytes"
