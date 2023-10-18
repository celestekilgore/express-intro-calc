/** Simple demo Express app. */

const express = require("express");
const app = express();

const stats = require("./stats");
// useful error class to throw
const { BadRequestError } = require("./expressError");
const { NotFoundError } = require("./expressError");
const { convertStrNums } = require("./utils.js");
const { writeToFile } = require("./utils.js");




const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
//TODO: using MISSING instead
app.get("/mean", function (req, res) {
  if (req.query?.nums === undefined) {
    throw new BadRequestError("nums are required");
  }
  debugger;
  const data = req.query.nums;

  const numStrings = data.split(",");

  const nums = convertStrNums(numStrings);

  value = stats.findMean(nums);

  return res.json({ operation: "mean", value });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  if (req.query?.nums === undefined) {
    throw new BadRequestError("nums are required");
  }

  const data = req.query.nums;
  console.log(typeof data, data);
  const numStrings = data.split(",");

  const nums = convertStrNums(numStrings);

  value = stats.findMedian(nums);

  return res.json({ operation: "median", value });
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {
  if (req.query?.nums === undefined) {
    throw new BadRequestError("nums are required");
  }

  const data = req.query.nums;
  console.log(typeof data, data);
  const numStrings = data.split(",");

  const nums = convertStrNums(numStrings);

  value = stats.findMode(nums);

  return res.json({ operation: "mode", value });
});

app.get("/all", function (req, res) {
  if (req.query?.nums === undefined) {
    throw new BadRequestError("nums are required");
  }

  const data = req.query.nums;
  console.log(typeof data, data);
  const numStrings = data.split(",");

  const nums = convertStrNums(numStrings);

  mode = stats.findMode(nums);
  mean = stats.findMean(nums);
  median = stats.findMedian(nums);

  result = { operation: "all", mean, median, mode };

  if (req.query.save === "true") {
    console.log('here');
    writeToFile(JSON.stringify(result));
  }

  return res.json(result);;
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;