const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/favorites", async (req, res) => {
  const { data } = await supabase
    .from("favorites")
    .select("*");

  res.json(data);
});

app.post("/favorites", async (req, res) => {

  const { title } = req.body;

  const { data } = await supabase
    .from("favorites")
    .insert([{ title }]);

  res.json(data);
});

app.get("/movies", async (req, res) => {

  const response = await fetch(
    "https://api.tvmaze.com/shows"
  );

  const data = await response.json();

  res.json(data.slice(0, 10));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
