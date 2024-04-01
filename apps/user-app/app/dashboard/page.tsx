import { CardDemo } from "../_components/randomCard";
import { Wrapper } from "./pageWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { BellRing, Check,DollarSignIcon,CreditCardIcon,ArrowUpIcon, ArrowDownIcon } from "lucide-react"


const Home = () => {
  return (

    <Wrapper title="Welcome Back">
      <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$5,231.89</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
                <CreditCardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid gap-0.5">
                  <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800/40">
                    <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="font-medium">+ $50.00</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 shrink-0 ml-auto">2 min ago</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800/40">
                    <ArrowDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="font-medium">- $25.00</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 shrink-0 ml-auto">10 min ago</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800/40">
                    <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="font-medium">+ $100.00</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 shrink-0 ml-auto">1 hour ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* <div className="border shadow-sm rounded-lg p-2">
            <CurvedlineChart className="w-full aspect-[2/1]" />
          </div> */}
    </Wrapper>
  );
};
export default Home;


