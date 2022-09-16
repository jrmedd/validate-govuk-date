function isAnInteger (input) {
  input = typeof input === 'string' ? input.trim() : input.toString()
  if (input.length === 0) {
    return false
  }
  if (input.match(/[\D\s]/g)) {
    return false
  } else {
    return true
  }
}

function validateDate (d, m, y, fieldName = 'Date') {
  const errors = []
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const problematicFields = ['day', 'month', 'year']
  const incompleteFields = [d.length === 0 ? 0 : -1, m.length === 0 ? 1 : -1, y.length === 0 ? 2 : -1]
  incompleteFields.forEach(incompleteField => {
    if (incompleteField > -1) {
      errors.push(
        {
          error: true,
          reason: `'${fieldName}' must include a ${problematicFields[incompleteField]}`,
          index: incompleteField
        }
      )
    }
  })

  const nonNumericFields = [!isAnInteger(d) ? 0 : -1, !isAnInteger(m) ? 1 : -1, !isAnInteger(y) ? 2 : -1]
  nonNumericFields.forEach((nonNumericField, index) => {
    if (nonNumericField > -1 && incompleteFields[index] === -1) {
      errors.push(
        {
          error: true,
          reason: `'${fieldName}' ${problematicFields[nonNumericField]} must be a number`,
          index: nonNumericField
        }
      )
    }
  })
  const day = parseInt(d.toString().trim())
  const month = parseInt(m.toString().trim())
  let year = parseInt(y.toString().trim())
  year = year < 100 ? year + 2000 : year
  if (nonNumericFields[1] === -1) {
    if (month < 1 || month > 12) {
      errors.push({
        error: true,
        reason: `'${fieldName}' month must be between 1 and 12`,
        index: problematicFields.indexOf('month')
      })
    }
  }
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLengths[1] = 29
  if (!nonNumericFields.some(nonNumericFields => nonNumericFields > -1)) {
    if (day < 1 || day > monthLengths[month - 1]) {
      errors.push({
        error: true,
        reason: `'${fieldName}' day must be between 1 and ${monthLengths[month - 1]} in the month of ${months[month - 1]}`,
        index: problematicFields.indexOf('day')
      })
    }
  }
  if (errors.length > 0) {
    return (
      {
        error: true,
        errors
      }
    )
  }
  return ({
    error: false,
    date: new Date(year, month - 1, day)
  })
}

module.exports = validateDate
