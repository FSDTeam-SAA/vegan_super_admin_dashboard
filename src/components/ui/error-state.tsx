import { AlertCircle } from "lucide-react";
import { memo } from "react";

const ErrorState = memo(({ message }: { message: string }) => (
  <div className="h-[80vh] md:h-[calc(100vh-25vh)] w-full flex justify-center gap-x-2 items-center">
    <div className="flex flex-col justify-center items-center">
      <AlertCircle className="h-6 w-6 text-red-500" />
      <p className="font-inter text-16px text-red-500">
        <p>{message}</p>
      </p>
    </div>
  </div>
));

export default ErrorState;
ErrorState.displayName = "ErrorState";
