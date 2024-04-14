import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { IndianRupeeIcon } from "lucide-react";
export const BalanceCard = ({
  amount,
  heading,
  description,
}: {
  amount: number;
  heading: string;
  description: string;
}) => {
  const amnt = (amount/100).toLocaleString();
  
  return (
    <Card className="max-w-[800px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-medium ">{heading}</CardTitle>
        <IndianRupeeIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <IndianRupeeIcon className="w-6 h-6 text-muted-foreground" />
          <span className="text-2xl font-bold">{amnt}</span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardFooter>
    </Card>
  );
};
