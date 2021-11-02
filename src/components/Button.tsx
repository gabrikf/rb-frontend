import { Button } from "@mui/material";
import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import { override } from "../utils/loadingCss";

type ButtonWithLoaderProps = {
  children: ReactNode;
  loader: boolean;
};

export default function ButtonWithLoader({
  children,
  loader,
}: ButtonWithLoaderProps) {
  return (
    <Button type="submit" variant="outlined">
      {loader ? (
        <ClipLoader
          color={"#BBDEFB"}
          loading={loader}
          css={override}
          size={150}
        />
      ) : (
        children
      )}
    </Button>
  );
}
