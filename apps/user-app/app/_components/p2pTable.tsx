import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { type p2pTransfer } from "@repo/database";
import { IndianRupeeIcon } from "lucide-react";

type tableProp = {
  transactions: p2pTransfer[];
  userId: number;
};
export function P2pTable({ transactions, userId }: tableProp) {
  return (
    <Table className="min-w-[300px] max-w-[1000px] flex-shrink-0">
      <TableCaption>A list of your transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" flex items-center gap-2">
            Amount
            <IndianRupeeIcon className="h-4 w-4" />
          </TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => {
          const date = new Date(tx.timestamp).toDateString();
          const sender = userId === tx.fromUserId;
          return (
            <TableRow key={tx.id}>
              <TableCell
                className={`font-medium flex items-center justify-between min-w-32 max-w-40 ${sender ? "text-destructive" : "text-green-500"}`}
              >
                {(sender ? "-" : "+") + (tx.amount/100).toLocaleString()}{" "}
              </TableCell>
              <TableCell>{tx.message}</TableCell>
              <TableCell>{date}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
