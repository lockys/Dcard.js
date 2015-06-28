var helper = {};

helper.isValidInput = function(pageNum) {
  var userNum = parseInt(pageNum, 10);
  if (pageNum !== userNum) {
    return false;
  }else if (userNum <= 0) {
    return false;
  }

  return true;
};

module.exports = helper;
