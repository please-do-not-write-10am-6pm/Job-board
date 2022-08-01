import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { authSelectors } from "redux/slices/authSlice";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Footer() {
  const currentUser = useSelector(authSelectors.currentUser);
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        {currentUser.email ? (
          <Stack direction={"row"} spacing={6}>
            {currentUser.role === "admin" && (
              <Link as={ReactRouterLink} to="/users">
                User
              </Link>
            )}
            <Link as={ReactRouterLink} to="/jobs">
              Job
            </Link>
          </Stack>
        ) : (
          <Stack />
        )}
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
      </Container>
    </Box>
  );
}
