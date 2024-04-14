import { Card } from "@repo/ui/components/ui/card";
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
import { IndianRupeeIcon } from "lucide-react";
import { type OnRampTransaction, OnRampStatus} from "@repo/database";

type TableProps = {
    transactions:Partial<OnRampTransaction>[]
}

export function OnRampTransactions({transactions}:TableProps) {
  return (
    <Table className="min-w-[300px] max-w-[800px] flex-shrink-0">
      <TableCaption>A list of your transactions with banks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" flex items-center gap-2">
            Amount
            <IndianRupeeIcon className="h-4 w-4" />
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx:any) => {
          const date = new Date(tx.startTime).toDateString();
          const st = tx.status;
          return (
            <TableRow key={tx.id}>
              <TableCell
                className={`font-medium flex items-center justify-between min-w-32 max-w-40 ${st === OnRampStatus.Failure ? "text-destructive" : st === OnRampStatus.Success? "text-green-500" :""}`}
              >
                {(tx.amount / 100).toLocaleString()}
              </TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>{date}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
