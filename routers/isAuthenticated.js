const express = require("express");

const User = require("../Models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const user = await User.findOne({ token: token }).select("account _id");
      console.log(user, token);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized, didnt find user" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized, bad authorisation" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = isAuthenticated;
