module.exports = {
  '*.{tsx,ts}': ['eslint --cache --fix --max-warnings=0'],
  '*.{json,yaml}': ['prettier --write']
}
