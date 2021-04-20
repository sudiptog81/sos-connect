const crypto = require("crypto");
const express = require("express");
const redis = require("redis");

const config = require("../config.json");

const router = express.Router();

const hash = (str) => crypto.createHash("md5").update(str).digest("hex");

router.get("/:topic", (req, res) => {
  const client = redis.createClient({
    url: "redis://" + config.RedisHost,
  });

  if (process.env.NODE_ENV == "production")
    if (!client.auth(process.env.REDIS_PASSWORD))
      return res.status(500).json({ error: "Could not connect to Redis :(" });

  if (!req.params.topic)
    return res.status(500).json({ error: "Are you sure you are human? o_O" });

  client.get(hash(req.params.topic), (err, str) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Welll...", name: err.name, message: err.message });

    res.json({ messages: str ? JSON.parse(str) : [] });
  });
});

router.post("/:topic", (req, res) => {
  const client = redis.createClient({
    url: "redis://" + config.RedisHost,
  });

  if (
    process.env.NODE_ENV == "production" &&
    !client.auth(process.env.REDIS_PASSWORD)
  )
    return res.status(500).json({ error: "Could not connect to Redis :(" });

  if (!req.params.topic)
    return res.status(500).json({ error: "Are you sure you are human? o_O" });

  client.get(hash(req.params.topic), (err, str) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Welll...", name: err.name, message: err.message });

    const messages = str ? JSON.parse(str) : [];
    messages.push(req.body.message);

    client.set(hash(req.params.topic), JSON.stringify(messages), (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Welll...", name: err.name, message: err.message });

      res.json({ messages });
    });
  });
});

router.delete("/:topic", (req, res) => {
  const client = redis.createClient({
    url: "redis://" + config.RedisHost,
  });

  if (process.env.NODE_ENV == "production")
    if (!client.auth(process.env.REDIS_PASSWORD))
      return res.status(500).json({ error: "Could not connect to Redis :(" });

  if (!req.params.topic)
    return res.status(500).json({ error: "Are you sure you are human? o_O" });

  client.del(hash(req.params.topic), (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Welll...", name: err.name, message: err.message });

    res.json({ ok: true });
  });
});

module.exports = router;
