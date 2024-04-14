"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";

import { useState } from "react";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransaction";
import { useRouter } from "next/navigation";
const SUPPORTED_BANKS = [{ id: "0", name: "SBI" },{ id: "1", name: "HDFC" },{ id: "2", name: "ICICI" },{ id: "3", name: "CBI" }];


export const AddMoney = () => {
  const router = useRouter();
  const [provider, setProvider] = useState(
    SUPPORTED_BANKS[0]?.name || "SBI"
  );
  const [value, setValue] = useState(0);

  async function handleOnRamp() {
    const res = await createOnRampTransaction(provider, value * 100);
    if (res.message === "Done") {
      const url = `http://localhost:3004/?token=${res.token}&amount=${res.amount}&userId=${res.userId}&bank=${provider}`;
      router.replace(url);
    }
  }

  return (
    <Card className="max-w-[500px] max-h-[440px]">
      <CardHeader>
        <CardTitle>Add money</CardTitle>
        <CardDescription>
          Enter the the amount and select the provider to add money to your
          wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="Rs: "
            type="number"
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="provider">Provider</Label>

          <Select
            onValueChange={(val) => {
              setProvider(
                SUPPORTED_BANKS.find((x) => x.id === val)?.name || ""
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Banks</SelectLabel>
                {SUPPORTED_BANKS.map((bank) => {
                  return (
                    <SelectItem key={bank.id} value={bank.id}>
                      {bank.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="mx-auto w-full" type="submit" onClick={handleOnRamp}>
          Add
        </Button>
      </CardContent>
    </Card>
  );
};
