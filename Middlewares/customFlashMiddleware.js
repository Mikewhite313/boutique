const customFlashMiddleware = () => (req, res, next) => {
  // Initialize an empty object to store flash messages
  req.flashMessages = {};

  // Check if there are any flash messages stored in the cookies
  if (req.cookies && req.cookies.flashMessages) {
    req.flashMessages = JSON.parse(req.cookies.flashMessages);
  }

  // Function to set a flash message
  req.flash = (type, message) => {
    req.flashMessages[type] = message;
  };

  // Function to get all flash messages and clear them from memory
  req.getFlashMessages = () => {
    const messages = { ...req.flashMessages };
    req.flashMessages = {};
    return messages;
  };

  // Pass the control to the next middleware/route handler
  next();
};

module.exports = customFlashMiddleware;
