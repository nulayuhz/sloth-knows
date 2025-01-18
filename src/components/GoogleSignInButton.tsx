import { FunctionComponent, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FunctionComponent<GoogleSignInButtonProps> = ({
  children,
}) => {
  const googleLogin = () => {};

  return (
    <Button onClick={googleLogin} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
