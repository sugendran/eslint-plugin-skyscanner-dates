# eslint-plugin-skyscanner-dates

[![Greenkeeper badge](https://badges.greenkeeper.io/Skyscanner/eslint-plugin-skyscanner-dates.svg)](https://greenkeeper.io/)

eslint plugin to handle safely dates.

## Features

This eslint plugin is meant to be used to avoid explicit usage/manupulation of date in JS, so to avoid issues with timezones.

## Installation

```bash
npm install --save-dev eslint-plugin-skyscanner-dates
```

## Usage

Add to the `.eslintrc.json` file inside the root folder of a linted project:

All the rules will raise an error except `skyscanner-dates/no-new-date-without-args` which will be just a warning.
```
{
  "extends": "plugin:skyscanner-dates/recommended",
  "plugins": ["skyscanner-dates"]
}
```

Any rule failing will raise a blocking error.
```
{
  "extends": "plugin:skyscanner-dates/error",
  "plugins": ["skyscanner-dates"]
}
```

Any rule failing will just raise a warning.
```
{
  "extends": "plugin:skyscanner-dates/warn",
  "plugins": ["skyscanner-dates"]
}
```


Each rule can bbe configured on its own following `eslint` conventions:
```
{
  "plugins": ["skyscanner-dates"],
  "rules": {
    "skyscanner-dates/no-date-fns": "warn",
    "skyscanner-dates/no-moment": "warn",
    "skyscanner-dates/no-new-date-with-args": "warn",
    "skyscanner-dates/no-new-date-without-args": "warn"
  }
}
```

## API

Your favourite code editor should provide information about API using code completion.

API docs can be generated by cloning the project and running:

```bash
npm install
npm run build-docs
```

API docs will now be generated in `docs/api.md`.

## Developing

* `npm install` - installs dependencies
* `npm run lint` - runs linter
* `npm run build-docs` - produces API documentation in Markdown format in `docs/api.md`
* `npm test` - runs linter and tests

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute.
