import { Flex, Skeleton } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const LoadingWrapper: FC<LoadingWrapperProps> = ({
  children,
  isLoading,
  repeat,
}) => {
  return isLoading ? (
    <Flex flexDirection={"column"} justifyContent={"space-around"}>
      {Array.from(Array(repeat ?? 1).keys()).map((num) => {
        return (
          <Skeleton
            key={`loading-${num}`}
            my={`${10 / repeat}dvh`}
            mx={`${10 / repeat}dvw`}
            height={`${80 / repeat}dvh`}
          />
        );
      })}
    </Flex>
  ) : (
    <>{children}</>
  );
};

export type LoadingWrapperProps = {
  children: ReactNode;
  isLoading: boolean;
  repeat: number;
};

export default LoadingWrapper;
