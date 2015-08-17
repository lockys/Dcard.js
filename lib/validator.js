exports.isValidInput = function(pageNum) {
  var userNum = parseInt(pageNum, 10);
  if (pageNum !== userNum) {
    return false;
  }else if (userNum <= 0) {
    return false;
  }

  return true;
};

exports.isValidType = function(type) {
  /** input is not string **/
  if (typeof type !== 'string') {
    return false;
  }

  var allowedList = ['DEFAULT', 'HOT_WITH_FORUM', 'HOT'];
  if (allowedList.indexOf(type) <= -1) {
    return false;
  }

  return true;
};
