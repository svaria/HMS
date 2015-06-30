function handleMongoError(err, res) {
  switch (err.code) {
    case 11000:
      //duplicate user
      err.displayableMessage = "User already exists with that email address";
      break;
  }
}

/* True if there is an error */
module.exports.handleError = function handleError(err, res) {
  if (err) {
    res.status(400);
    switch (err.name) {
      case 'MongoError':
        handleMongoError(err, res);
        break;
      default:
        if (!err.displayableMessage) {
          err.displayableMessage = "There was an issue with your request";
        }
        break;
    }
    res.send(err);
    console.log(err);
    return true;
  }
  return false;
};