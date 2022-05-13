const express = require("express");
const moment = require("moment");
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
  const id = uuidv4();
  const todaysDate = moment().format("LL");
  const docRef = db.collection("posts").doc(id);

  await docRef.set({
    content: content,
    title: "on",
    createDate: todaysDate,
  });
  console.log(docRef);
  res.status(200).send({ postId: id });
});

// GET THE POST AND COMMENTS FROM DATABASE TO CLIENT
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const docRef = db.collection("posts").doc(id);
  const doc = await docRef.get();
  // console.log(id, doc.data());
  if (!doc.exists) {
    res.status(404).send("fail - not found");
  } else {
    const post = doc.data();
    const commentsRef = await docRef.collection("comments").get();
    const reviewsRef = await docRef.collection("reviews").get();
    post.comments = commentsRef.docs.map((doc) => doc.data());
    post.reviews = reviewsRef.docs.map((doc) => doc.data());
    res.status(200).send(post);
  }
});

// POST A COMMENT TO THE FIREBASE DATABASE AS A NEW COLLECTION
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const comment = req.body.comments;
  const author = req.body.author;
  const todaysDate = moment().format("LL");
  const commentsRef = db.collection("posts").doc(id).collection("comments");
  await commentsRef.add({
    comments: comment,
    author: author,
    date: todaysDate,
  });
  res.status(200).send("ok");
});

// EDIT A POST
router.post("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const docRef = db.collection("posts").doc(id);
  await docRef.update({ content: content });
  res.status(200).send("ok");
});

// POST A REVIEW TO THE FIREBASE DATABASE AS A NEW COLLECTION
router.post("/:id/review", async (req, res) => {
  const { id } = req.params;
  const approved = req.body.reviewerApproved;
  const name = req.body.reviewerName;
  const todaysDate = moment().format("LL");
  const reviewRef = db.collection("posts").doc(id).collection("reviews");
  await reviewRef.add({
    reviews: approved,
    approved: approved,
    author: name,
    date: todaysDate,
  });
  res.status(200).send("ok");
});

// FIREBASE DATABASE
const serviceAccount = require("/Users/ashleyj/src/brainstation/assignments/CAPSTONE/copybot-xyz-firebase-adminsdk-dhhc2-09454f3b8e.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = router;
