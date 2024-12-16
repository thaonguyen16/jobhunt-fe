import Breadcrumbs from "@mui/material/Breadcrumbs";

import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ReactElement } from "react";

type BreadcrumbProps = {
  breadcrumps: ReactElement[];
};

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {props.breadcrumps}
      </Breadcrumbs>
    </Stack>
  );
}
