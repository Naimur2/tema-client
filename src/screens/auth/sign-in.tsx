import { Button, Card, Label, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectAuth } from "store/features/auth";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "components/Loader";
import { useLoginMutation } from "store/apis/auth";

export default function LoginScreen() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [loginFn, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (auth.token) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await loginFn(values);
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Welcome to Tema Admin
        </span>
      </div>
      <Card className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block">
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              placeholder="name@company.com"
              type="email"
              helperText={formik.errors.email}
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              placeholder="••••••••"
              type="password"
              helperText={formik.errors.password}
              {...formik.getFieldProps("password")}
            />
          </div>

          <div className="mb-6">
            <Button
              type="submit"
              className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
            >
              Login to your account
            </Button>
          </div>
          <Loader isLoading={isLoading} />
        </form>
      </Card>
    </div>
  );
}
