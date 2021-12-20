import { Skeleton } from "@material-ui/lab";
import { Stack } from "@mui/material";

const UhuruSkeleton = () => {
  return (
    <Stack spacing={1} margin="5px 20px 13px 0px">
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" animation="wave" width={70} height={20} />
    </Stack>
  );
};
export default UhuruSkeleton;
