import { Wrapper } from "../pageWrapper";
import { AddMoney } from "../../_components/addMoney";
import { BalanceCard } from "../../_components/balanceCard";
import { OnRampTransactions } from "../../_components/onRampTable";
import prisma from "../../../prismaClient";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Withdraw } from "../../_components/withdraw";
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

async function getOnRampTransactions() {
  const session: any = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    select: {
      id: true,
      status: true,
      provider: true,
      amount: true,
      startTime: true,
    },
    take: 5,
    orderBy: {
      startTime: "desc",
    },
  });
  return txns;
}

const Transfer = async () => {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <Wrapper title="Transfer">
      <div className="flex flex-col flex-wrap lg:flex-row gap-10 w-full">
        <div className="f flex item-center justify-center">
          <Tabs defaultValue="add">
            <TabsList className="grid w-full min-w-[300px] grid-cols-2">
              <TabsTrigger value="add">Add to wallet</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="add">
              <AddMoney />
            </TabsContent>
            <TabsContent value="withdraw">
              <Withdraw/>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex-1">
          <BalanceCard
            amount={balance.amount}
            heading="Balance"
            description="locked balance not included"
          />
          <div className="mt-4 w-full border rounded-lg p-2 max-w-[800px]">
            <div className="w-full flex justify-between p-4">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
                Bank Transactions
              </h2>
            </div>

            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Transfer;

// Type '{ transactions: { id: number; status: OnRampStatus; token: string; provider: string; amount: number; startTime: Date; userId: number; }[]; }' is not assignable to type 'IntrinsicAttributes & { id: number; status: OnRampStatus; token: string; provider: string; amount: number; startTime: Date; userId: number; }[]'.
//   Property 'transactions' does not exist on type 'IntrinsicAttributes & { id: number; status: OnRampStatus; token: string; provider: string; amount: number; startTime: Date; userId: number; }[]'.ts(2322)
// (property) transactions: {
//     id: number;
//     status: $Enums.OnRampStatus;
//     token: string;
//     provider: string;
//     amount: number;
//     startTime: Date;
//     userId: number;
// }[
