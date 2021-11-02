import { Box } from "@mui/system";
import { ReactNode } from "react";

type AlertProps = {
  children: ReactNode;
};

export default function Alert({ children }: AlertProps) {
  return (
    <Box
      sx={{
        bgcolor: "#F48FB1",
        borderLeftWidth: "4px",
        borderColor: "#D81B60",
        padding: "12px ",
      }}
    >
      {children}
    </Box>
  );
}
