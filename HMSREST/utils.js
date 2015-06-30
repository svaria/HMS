/* True if there is an error*/
module.exports.handleError = function handleError(err, res) {
  if (err) {
    res.status(400).send(err);
    console.error(err);
    return true;
  }
  return false;
};