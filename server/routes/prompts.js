const express = require("express");
const router = express.Router();
const fetchGPT3 = require("../lib/gpt3");
const { v4: uuidv4 } = require("uuid");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

// CREATE A NEW POST
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const tldrPrompt = `${prompt}\n\nTl;dr`;
  const output = await fetchGPT3({ prompt: tldrPrompt });
  res.status(200).send(output);
});

// SEND THE POST TO DATABASE
router.post("/create", async (req, res) => {
  const content = req.body.content;
  const id = uuidv4();
  const docRef = db.collection("posts").doc(id);
  await docRef.set({
    content: content,
    title: "on",
    createDate: Timestamp.fromDate(new Date()),
  });
  res.status(200).send({ postId: id });
});

// GET THE POST AND COMMENTS FROM DATABASE TO CLIENT
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const docRef = db.collection("posts").doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).send("fail - not found");
  } else {
    const post = doc.data();
    const commentsRef = await docRef
      .collection("comments")
      .orderBy("date", "asc")
      .get();
    const reviewsRef = await docRef.collection("reviews").get();
    post.comments = commentsRef.docs.map((doc) => doc.data());
    post.comments.forEach(c => c.date = c.date.toDate().toDateString())
    post.reviews = reviewsRef.docs.map((doc) => doc.data());
    post.reviews.forEach((r) => (r.date = r.date.toDate().toDateString()));
    res.status(200).send(post);
  }
});

// POST A COMMENT TO THE FIREBASE DATABASE AS A NEW COLLECTION
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const comment = req.body.comments;
  const author = req.body.author;
  const commentsRef = db.collection("posts").doc(id).collection("comments");
  await commentsRef.add({
    comments: comment,
    author: author,
    date: Timestamp.fromDate(new Date()),
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
  const reviewRef = db.collection("posts").doc(id).collection("reviews");
  await reviewRef.add({
    reviews: approved,
    approved: approved,
    author: name,
    date: Timestamp.fromDate(new Date()),
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
