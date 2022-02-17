const express = require("express");

const User = require("../Models/User");

// Fonction pour authentifier via Token
const isAuthenticated = async (req, res, next) => {
  const isTokenValid = await User.findOne({
    token: req.headers.authorization.replace("Bearer ", ""),
  });
  console.log("here", isTokenValid);
  if (isTokenValid) {
    req.user = isTokenValid;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default isAuthenticated;
