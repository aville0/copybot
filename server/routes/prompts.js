const express = require("express");
const router = express.Router();
const fetchGPT3 = require("../lib/gpt3");

router.post("/create", async (req, res) => {
  const { prompt } = req.body;
  // TODO: Do validation on the user input. E.g. they can't send empty strings.

  const tldrPrompt = `${prompt}\n\nTl;dr`;
  console.log(tldrPrompt);

  const output = await fetchGPT3({ prompt: tldrPrompt });
  console.log("---");
  console.log(output);

  res.status(200).send(output);
});

module.exports = router;
