import { lazy } from "react";

const Lazy = (path: string) => {
  return () =>{
    return lazy(() => import(`${path}`));
  }
};

export default Lazy;
