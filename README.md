![build](https://github.com/jrmedd/validate-govuk-date/actions/workflows/main.yml/badge.svg)

# Parse GOVUK date
Takes separate day, month, and year values (a la the [GOV.UK date input pattern](https://design-system.service.gov.uk/components/date-input/)) and checks for errors, returning a [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) if none are found.

## Overview

The [GOV.UK design system](https://design-system.service.gov.uk/) is a fantastic resource for building usable, accessible frontends, but it doesn't do a lot as far as validation goes. I created this input for a Driver & Vehicle Standards Agency project a while back and found it sufficient for most use cases.


## Usage

### Basic usage

Import the module:

```js
import validateDate from "validate-govuk-date";
//or
const validateDate = require("validate-govuk-date");
```

Give the function a day, month, and year and it will attempt to parse e.g. `validateDate(8, 2, 1990)`

If no errors are detected, it returns and object with the properties `error: false` and a JavaScript `Date` object `date: Thu Feb 08 1990 00:00:00 GMT+0000 (Greenwich Mean Time)`.

If errors are detected, it returns and object with the properties `error: true` and a an array of errors with the properties `reason` (to describe the error) and `index` (with its index where 0 is the day, 1 is the month, and 2 is the year).

### Examples

```js
// With integers:
validateDate(8, 2, 1990) // { error: false, date: Thu Feb 08 1990 00:00:00 GMT+0000 (Greenwich Mean Time) }

// With strings
validateDate('1', '1', '20') // { error: false, date:  Wed Jan 01 2020 00:00:00 GMT+0000 (Greenwich Mean Time) }

// Detecting an error and returning its index
validateDate('17', '13', '2020') // { error: true, errors: [ { error: true, reason: "'Date' month must be between 1 and 12", index: 1 } ] }

// Detecting multiple errors and returning their indices
validateDate('', '13', '2020') // { error: true, errors: [ { error: true, reason: "'Date' must include a day", index: 0 }, { error: true, reason: "'Date' month must be between 1 and 12", index: 1 } ] }

// Detecting multiple errors
validateDate('', '13', '2020') // { error: true, errors: [ { error: true, reason: "'Date' must include a day", index: 0 }, { error: true, reason: "'Date' month must be between 1 and 12", index: 1 } ] }

// Pass a field name
validateDate('17', 'Oct', '2022', 'Start date') // { error: true, errors: [ { error: true, reason: "'Start date' month must be a number", index: 1 } ] }
```
