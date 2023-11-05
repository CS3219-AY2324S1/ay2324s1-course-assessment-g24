import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Spinner
      thickness={"5px"}
      speed={"0.65s"}
      emptyColor={"gray.200"}
      color={"orange.500"}
      size={"xl"}
    />
  );
};

export default LoadingSpinner;
