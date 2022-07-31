import {
  Flex,
  Box,
  FormLabel,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { loginAction } from "redux/slices/authSlice/auth.action";
import { useAppDispatch } from "redux/store";
import { useNavigate } from "react-router-dom";
import { BasicLayout } from "pages/__layout/BasicLayout";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters plus 1 alphabet, 1 special character and 1 number"
    )
    .required("Required"),
});

export default function Login() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  return (
    <BasicLayout>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(loginAction(values))
            .unwrap()
            .then((res) => {
              toast(res.status);
              localStorage.setItem("token", res.token);
              navigate("/jobs");
            })
            .catch((error) => {
              toast.warn(error.message);
            });
        }}
      >
        <Form>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool{" "}
                  <Link color={"blue.400"}>features</Link> ✌️
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <FormLabel>Email address</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    type="email"
                    name="email"
                    placeholder="donaldo@email.io"
                  />
                  <ErrorMessage name="email" />
                  <FormLabel>Password</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    type="password"
                    name="password"
                  />
                  <ErrorMessage name="password" />
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.400"}>Forgot password?</Link>
                    </Stack>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      Sign in
                    </Button>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        Already a user?{" "}
                        <Link href="/" color={"blue.400"}>
                          Register
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      </Formik>
    </BasicLayout>
  );
}
