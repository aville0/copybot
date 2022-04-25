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

// CREATE A NEW POST
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  const tldrPrompt = `${prompt}\n\nTl;dr`;
  console.log(tldrPrompt);

  const output = await fetchGPT3({ prompt: tldrPrompt });
  console.log("---");
  console.log(output);

  res.status(200).send(output);
});

// SEND THE POST TO DATABASE
router.post("/create", async (req, res) => {
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

// GET THE POST FROM DATABASE TO CLIENT
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const docRef = db.collection("posts").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).send("fail - not found");
  } else {
    res.status(200).send(doc.data());
  }
});


// FIREBASE DATABASE
const serviceAccount = require("/Users/ashleyj/src/brainstation/assignments/CAPSTONE/copybot-xyz-firebase-adminsdk-dhhc2-09454f3b8e.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = router;
