var helper = {};

helper.isValidInput = function(pageNum) {
  if (pageNum !== parseInt(pageNum, 10)) {
    return false;
  }

  return true;
};

module.exports = helper;
