#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# The latest version of some ESLint plugins require Node.js v16
NODE_VERSION=$(node --version | cut -c 2-3)
if (($NODE_VERSION < 16)); then
  echo "error: requires Node.js version 16"
  exit 1
fi

SECONDS=0

cd "$DIR"

# Step 1 - Use Prettier to check formatting
npx prettier --check "typings/**/*.ts"

# Step 2 - Use ESLint to lint the TypeScript
# Since all ESLint errors are set to warnings,
# we set max warnings to 0 so that warnings will fail in CI
npx eslint --max-warnings 0 typings

# Step 3 - Spell check every file using cspell
# We use no-progress and no-summary because we want to only output errors
npx cspell --no-progress --no-summary "typings/**/*.ts"
npx cspell --no-progress --no-summary "scripts/**/*.py"

echo "Successfully linted in $SECONDS seconds."
