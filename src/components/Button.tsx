import { Button } from "@mui/material";
import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import { override } from "../utils/loadingCss";

type ButtonWithLoaderProps = {
  children: ReactNode;
  loader?: boolean;
  onClickHere?: any;
};

export default function ButtonWithLoader({
  children,
  loader,
  onClickHere,
}: ButtonWithLoaderProps) {
  return (
    <Button onClick={onClickHere} type="submit" variant="outlined">
      {loader ? (
        <ClipLoader
          color={"#BBDEFB"}
          loading={loader}
          css={override}
          size={20}
        />
      ) : (
        children
      )}
    </Button>
  );
}
