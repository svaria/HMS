/* True if there is an error*/
module.exports.handleError = function handleError(err, res) {
  if (err) {
    res.send(err.message);
    console.error(err);
    return true;
  }
  return false;
};