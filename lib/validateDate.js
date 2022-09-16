"use strict";

function isAnInteger(input) {
  input = typeof input === 'string' ? input.trim() : input.toString();

  if (input.length === 0) {
    return false;
  }

  if (input.match(/[\D\s]/g)) {
    return false;
  } else {
    return true;
  }
}

function validateDate(d, m, y) {
  var fieldName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Date';
  var errors = [];
  var monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var problematicFields = ['day', 'month', 'year'];
  var incompleteFields = [d.length === 0 ? 0 : -1, m.length === 0 ? 1 : -1, y.length === 0 ? 2 : -1];
  incompleteFields.forEach(function (incompleteField) {
    if (incompleteField > -1) {
      errors.push({
        error: true,
        reason: "'".concat(fieldName, "' must include a ").concat(problematicFields[incompleteField]),
        index: incompleteField
      });
    }
  });
  var nonNumericFields = [!isAnInteger(d) ? 0 : -1, !isAnInteger(m) ? 1 : -1, !isAnInteger(y) ? 2 : -1];
  nonNumericFields.forEach(function (nonNumericField, index) {
    if (nonNumericField > -1 && incompleteFields[index] === -1) {
      errors.push({
        error: true,
        reason: "'".concat(fieldName, "' ").concat(problematicFields[nonNumericField], " must be a number"),
        index: nonNumericField
      });
    }
  });
  var day = parseInt(d.toString().trim());
  var month = parseInt(m.toString().trim());
  var year = parseInt(y.toString().trim());
  year = year < 100 ? year + 2000 : year;

  if (nonNumericFields[1] === -1) {
    if (month < 1 || month > 12) {
      errors.push({
        error: true,
        reason: "'".concat(fieldName, "' month must be between 1 and 12"),
        index: problematicFields.indexOf('month')
      });
    }
  }

  if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) monthLengths[1] = 29;

  if (!nonNumericFields.some(function (nonNumericFields) {
    return nonNumericFields > -1;
  })) {
    if (day < 1 || day > monthLengths[month - 1]) {
      errors.push({
        error: true,
        reason: "'".concat(fieldName, "' day must be between 1 and ").concat(monthLengths[month - 1], " in the month of ").concat(months[month - 1]),
        index: problematicFields.indexOf('day')
      });
    }
  }

  if (errors.length > 0) {
    return {
      error: true,
      errors: errors
    };
  }

  return {
    error: false,
    date: new Date(year, month - 1, day)
  };
}

module.exports = validateDate;