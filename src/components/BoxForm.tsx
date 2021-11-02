import { Box } from "@mui/system";
import { ReactNode } from "react";

type BoxFormProps = {
  children: ReactNode;
  height: string;
};

export default function BoxForm({ children, height }: BoxFormProps) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#BBDEFB",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          height: `${height}`,
          margin: "10px",
          border: "solid 2px #29B6F6",
          borderRadius: "12px",

          bgcolor: "#E3F2FD",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
