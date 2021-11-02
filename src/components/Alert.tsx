import { ReactNode } from "react";
import { Alert as AlertFromMaterialUI } from "@material-ui/core";

type AlertProps = {
  children: ReactNode;
  success?: boolean;
};

export default function Alert({ children, success }: AlertProps) {
  return (
    <AlertFromMaterialUI
      sx={{ border: `solid 2px ${success ? "green" : "red"}` }}
      severity={success ? "success" : "error"}
    >
      {children}
    </AlertFromMaterialUI>
  );
}
