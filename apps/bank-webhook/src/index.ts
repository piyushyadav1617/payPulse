import express from "express";
import prisma from "./prismaClient";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors({
  origin:"localhost:3004"
}))
app.post("/globalbank", async (req, res) => {
  //TODO: Add zod validation here
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  //TODO: check if this onramp is processsing or not, to avoid repeated transactions

  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token, 
    userId: req.body.userId, //user id from the table
    amount: req.body.amount,
  };
    console.log(paymentInformation)
  try {
    await prisma.$transaction([
         prisma.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
      prisma.balance.updateMany({ 
        where: {
            userId: Number(paymentInformation.userId)
        },
        data: {
            amount: {
                increment: Number(paymentInformation.amount)
            }
        }
    }),
      prisma.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
