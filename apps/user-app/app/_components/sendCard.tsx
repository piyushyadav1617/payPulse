"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@repo/ui/components/ui/card";

import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Card className="max-w-fit">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>Enter the receiver&apos;s phone number and the amount you want to send</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            placeholder="Phone number"
            type="tel"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="Amount"
            type="text"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            placeholder="What is this for?"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button
          className="mx-auto w-full"
          type="submit"
          onClick={async () => {
            await p2pTransfer(number, Number(amount) * 100, message);
          }}
        >
          Send
        </Button>
      </CardContent>
  
    </Card>
  );
}
