import express from "express";
import { HLTV } from "hltv";

const app = express();
const port = 8000;

// Middleware to parse JSON body
app.use(express.json());

app.post("/event", async (req, res) => {
  try {
    const { event_id } = req.body;

    if (!event_id) {
      return res.status(400).json({ error: "event_id is required in the body" });
    }

    const data = await HLTV.getEvent({ id: Number(event_id) });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(port, () => console.log(`HLTV API on port ${port}`));
