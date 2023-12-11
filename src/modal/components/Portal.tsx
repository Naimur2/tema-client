import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

interface PortalProps {
  containerId: string;
  children: React.ReactNode;
}

const Portal = ({ containerId, children }: PortalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (isMounted) {
    return ReactDOM.createPortal(
      children,
      document.getElementById(containerId) as HTMLElement,
    );
  }
  return null;
};

export default Portal;
