import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const loading = () => {
  return (
    <div className="flex flex-col w-full h-[100dvh] justify-center items-center">
      <div className="max-w-xl flex flex-col justify-center items-center">
        <div className="flex flex-col w-full h-[100dvh] justify-center items-center">
          <div className="max-w-xl flex flex-col justify-center items-center">
            <div className="flex w-full justify-center items-center max-w-md">
              <img className="loading-img" width={300} src="/fast-bio.png" alt="" />
            </div>
            <div className="text-xl">loading</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
