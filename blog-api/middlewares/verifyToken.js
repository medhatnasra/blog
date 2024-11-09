var jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (erro) {
      res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    res.status(400).json({ message: "No Token Provided" });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Your Are Not Authorised to Fetch Thi Api.." });
    }
    next();
  });
};

const verifyTokenAndOnlyUser = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  });
};

module.exports = {
  verifytoken,
  verifyTokenAndOnlyUser,
  verifyTokenAndAdmin,
};
