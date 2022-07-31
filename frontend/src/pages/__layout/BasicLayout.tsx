import React from "react";
import { Stack } from "@chakra-ui/react";

import WithSubnavigation from "../../components/Navbar";
import Footer from "../../components/Footer";

export const BasicLayout = ({ children }: any) => {
  return (
    <>
      <WithSubnavigation />
      <Stack alignItems="center" justifyContent="center">
        <Stack spacing={6} w={"100%"} textAlign="center">
          {children}
        </Stack>
      </Stack>
      {/* <Footer /> */}
    </>
  );
};
