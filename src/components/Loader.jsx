import { Spinner } from "@material-tailwind/react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-600">
      <Spinner className="h-16 w-16 text-secondary" color="white" />
    </div>
  );
}
