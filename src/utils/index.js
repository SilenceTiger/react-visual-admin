export function deepCopy(obj) {
  if (typeof obj !== "object") return
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
