import { LoaderCircle } from "lucide-react";
export default function Loading() {
  return (
    <LoaderCircle className="absolute top-1/3  left-[55%] animate-spin h-20 w-20 text-xl font-bold text-primary" />
  );
}
