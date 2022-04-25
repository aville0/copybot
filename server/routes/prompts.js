const express = require("express");
const router = express.Router();
const fetchGPT3 = require("../lib/gpt3");
const { v4: uuidv4 } = require("uuid");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  const tldrPrompt = `${prompt}\n\nTl;dr`;
  console.log(tldrPrompt);

  const output = await fetchGPT3({ prompt: tldrPrompt });
  console.log("---");
  console.log(output);

  res.status(200).send(output);
});

router.post("/create/:id", async (req, res) => {
  const content = req.body.content;
  console.log("test test test");
  const id = uuidv4();
  const todaysDate = Date.now();
  const docRef = db.collection("posts").doc(id);

  await docRef.set({
    content: content,
    title: "on",
    createDate: todaysDate,
  });
  res.status(200).send("ok");
});

// GET the completed content for editing
router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const docRef = await db.collection("posts").get(id);
  res.status(200).send(docRef.content);
});

const serviceAccount = require("/Users/ashleyj/src/brainstation/assignments/CAPSTONE/copybot-xyz-firebase-adminsdk-dhhc2-09454f3b8e.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = router;
