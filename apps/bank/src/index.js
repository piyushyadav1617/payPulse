import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import cors from "cors"
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(cors())
app.get("/", async (req, res) => {
  const id = req.query.token;
  const amount = req.query.amount;
  const userId = req.query.userId;
  const bank = req.query.bank;
  const dynamicData = {
    amount: amount,
    bank:bank,
    id: id,
  };

  res.render("index", dynamicData);
});
app.post("/", async (req, res) => {
    try {
        const response = await fetch("http://localhost:3003/globalbank", { //hit the webhook of PayPulse wallet to let them know that user has paid the amount
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            token: req.query.token, 
            userId: req.query.userId,
            amount: req.query.amount,
        }),
      });
      if(response.status !== 200) res.status(411)
      res.status(200)
      
    } catch (error) {
        console.log(error)
        res.status(411)
    }
 
});

app.listen(3004, () => console.log("Server running on port 3004"));
