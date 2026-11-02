#!/bin/sh
# Renders card-front.html (which cuts the person out of photo.jpg) to public/lanyard/card-front.jpg
# using headless Chrome. The lanyard draws its card faces onto a 1024×1440 canvas, so the output
# matches that exactly. To use a different photo, replace photo.jpg (plain, light background works best).
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$(pwd)/../../public/lanyard"
TMP="$(mktemp -d)"

"$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars --user-data-dir="$TMP/profile" --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=10000 \
  --window-size=1024,1440 --screenshot="$TMP/card-front.png" "file://$(pwd)/card-front.html" >/dev/null 2>&1

sips -s format jpeg -s formatOptions 90 "$TMP/card-front.png" --out "$OUT/card-front.jpg" >/dev/null
rm -rf "$TMP"
echo "Wrote $OUT/card-front.jpg"
