"use server"; //to create an action this should be done

import prisma from "../../../prismaClient";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import { randomUUID } from "crypto";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  //remove the any type here and check how can this be improved with a better type
  const session: any = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = randomUUID(); // Ideally the token should come from the banking provider (hdfc/axis) like how create an order id first in the server when starting a payment in razorpay
  const create = await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session.user.id),
      amount: amount,
    },
  });

  return {
    message: "Done",
    token: create.token,
    userId: create.userId,
    amount: create.amount,
  };
}
