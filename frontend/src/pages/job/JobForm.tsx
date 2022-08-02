import {
  Flex,
  Box,
  FormLabel,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch } from "redux/store";
import {
  createJobAction,
  getAllJobsAction,
  getJobAction,
  updateJobAction,
} from "redux/slices/jobSlice/job.action";
import { authSelectors } from "redux/slices/authSlice";
import { jobSelectors } from "redux/slices/jobSlice";

const JobSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(250, "Must be 250 characters or less")
    .required("Required"),
  rate: Yup.number().required("Required"),
});

export default function JobForm() {
  const dispatch = useAppDispatch();
  let navigator = useNavigate();
  const currentUser = useSelector(authSelectors.currentUser);
  const { id } = useParams();
  const job = useSelector(jobSelectors.job);

  const goBack = () => {
    navigator("/jobs");
  };

  useEffect(() => {
    if (id) {
      dispatch(getJobAction(parseInt(id)));
    }
  }, [id, dispatch]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: id ? job.title : "",
        description: id ? job.description : "",
        rate: id ? job.rate : "",
      }}
      validationSchema={JobSchema}
      onSubmit={(values) => {
        if (id) {
          dispatch(
            updateJobAction({
              id: parseInt(id),
              data: { authorId: currentUser.id, ...values },
            })
          )
            .unwrap()
            .then((res: any) => {
              toast(res.status);
              navigator("/jobs");
              dispatch(getAllJobsAction);
            });
        } else {
          dispatch(createJobAction({ authorId: currentUser.id, ...values }))
            .unwrap()
            .then((res) => {
              toast(res.status);
              navigator("/jobs");
              dispatch(getAllJobsAction);
            })
            .catch((error) => {
              toast.warn(error.message);
            });
        }
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
                Enjoy a Job!
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
                <FormLabel>Title</FormLabel>
                <Field
                  style={{
                    borderWidth: "thin",
                    borderRadius: "5px",
                    padding: "8px",
                  }}
                  name="title"
                  type="text"
                  placeholder="Find a senior frontend developer"
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
                  type="text"
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
                    Save
                  </Button>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={goBack}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Form>
    </Formik>
  );
}
