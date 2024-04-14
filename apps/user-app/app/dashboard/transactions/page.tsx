import { Wrapper } from "../pageWrapper";
import { P2pTable } from "../../_components/p2pTable";
import prisma from "../../../prismaClient";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import { type p2pTransfer } from "@repo/database";

const Transactions = async () => {
  const session: any = await getServerSession(authOptions);
  const transactions: p2pTransfer[] = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session.user.id) },
        { toUserId: Number(session.user.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  console.log(transactions);
  return (
    <Wrapper title="Transactions">
      <div className="border p-2">
      <P2pTable transactions={transactions} userId={Number(session.user.id)} />

      </div>
    </Wrapper>
  );
};
export default Transactions;
