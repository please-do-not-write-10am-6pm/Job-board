import {
  Flex,
  Box,
  FormLabel,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerAction } from "redux/slices/authSlice/auth.action";
import { useAppDispatch } from "redux/store";
import { BasicLayout } from "pages/__layout/BasicLayout";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters plus 1 alphabet, 1 special character and 1 number"
    )
    .required("Required"),
  role: Yup.string().required("Required"),
  title: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(250, "Must be 250 characters or less")
    .required("Required"),
  rate: Yup.number().required("Required"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  return (
    <BasicLayout>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: "",
          title: "",
          description: "",
          rate: 0,
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          dispatch(registerAction(values))
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
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign up
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>
              <Box
                w="lg"
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <FormLabel>Name</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    type="text"
                    name="name"
                    placeholder="Donaldo James"
                  />
                  <ErrorMessage name="name" />
                  <FormLabel>Email address</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    name="email"
                    type="email"
                    placeholder="donaldo@email.io"
                  />
                  <ErrorMessage name="email" />
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Field
                      style={{
                        borderWidth: "thin",
                        borderRadius: "5px",
                        width: "100%",
                        padding: "8px",
                      }}
                      name="password"
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="password" />
                  <FormLabel>Role</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    name="role"
                    as="select"
                    placeholder="Client or Freelancer?"
                  >
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                  </Field>
                  <ErrorMessage name="role" />
                  <FormLabel>Title</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    name="title"
                    type="text"
                  />
                  <ErrorMessage name="title" />
                  <FormLabel>Description</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    as="textarea"
                    name="description"
                    placeholder="Here is your description"
                  />
                  <ErrorMessage name="description" />
                  <FormLabel>Rate</FormLabel>
                  <Field
                    style={{
                      borderWidth: "thin",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
                    type="number"
                    name="rate"
                  />
                  <ErrorMessage name="rate" />
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link href="/login" color={"blue.400"}>
                        Login
                      </Link>
                    </Text>
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
