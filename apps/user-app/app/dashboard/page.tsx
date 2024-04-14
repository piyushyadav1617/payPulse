import { Wrapper } from "./pageWrapper";
import {LoaderCircle} from "lucide-react"
import delay from 'delay';
import {
  ArrowUpRight,
} from "lucide-react";
import prisma from "../../prismaClient";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import { BalanceCard } from "../_components/balanceCard";
import { P2pTable } from "../_components/p2pTable";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { type p2pTransfer } from "@repo/database";
async function getBalance() {
  const session: any = await getServerSession(authOptions);
  console.log(session);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

const Home = async () => {
  const session: any = await getServerSession(authOptions);
  const balance = await getBalance();
  const transactions: p2pTransfer[] = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session.user.id) },
        { toUserId: Number(session.user.id) },
      ],
    },
    take:5,
    orderBy: {
      timestamp: 'desc',
    },
  });
  return (
    <Wrapper title="Welcome Back">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <BalanceCard
          heading="Current balance"
          amount={balance.amount}
          description="Wallet balance"
        />
        <BalanceCard
          heading="Locked balance"
          amount={balance.locked}
          description="Locked balance in wallet"
        />
        <BalanceCard
          heading="Total Balance"
          amount={balance.amount + balance.locked}
          description="Total balance in wallet"
        />
      </div>
      <div className="mt-4 w-full border rounded-lg p-2 max-w-[800px]">
        <div className="w-full flex justify-between p-4">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
            Recent Transactions
          </h2>
          <Button asChild>
            <Link href={"/dashboard/transactions?tab=p2p"}>
              View all
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <P2pTable transactions={transactions} userId = {Number(session.user.id)}/>
      </div>
   
    </Wrapper>
  );
};
export default Home;
