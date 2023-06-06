function GetErrorFormat(error) {
  let obj = {};
  if (error) {
    if (error.code == 11000) {
      obj['message'] = [];
      if (Object.keys(error.keyPattern).length > 0) {
        for (const key in error.keyPattern) {
          if (Object.hasOwnProperty.call(error.keyPattern, key)) {
            const element = error.keyPattern[key];
            obj['message'].push('Duplicate content found in ' + key)
          }
        }
      }
      obj['status'] = 409;
      return obj;
    }
  }
  obj['status'] = 500;
  obj['message'] = 'Something went wrong from server.';
  obj['error'] = error;
  return obj;
}

module.exports = GetErrorFormat;