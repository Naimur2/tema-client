import React from "react";
import Lottie from "lottie-react";

import loaderAnimation from "../assets/loader.json";

interface ILoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export default function Loader({ isLoading, children }: ILoaderProps) {
  if (!isLoading) return null;

  return (
    <>
      {children}
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <Lottie
          className="w-[200px] h-[200px]"
          animationData={loaderAnimation}
          loop={true}
        />
        ;
      </div>
    </>
  );
}
