import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";

import API from "lib/axios";

import { login } from "store/user/actions";

import { USER_ENDPOINTS } from "constants/endpoints";

import { AppRoute } from "routing/AppRoute.enum";

import { isEmptyObject } from "utils/common";

import Input from "components/input";
import Button from "components/button";

import styles from "./LoginForm.module.scss";

import logo from "assets/images/logo.png";

const schema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);

    API.post(USER_ENDPOINTS.LOGIN, { ...data })
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch((err) => {
        const { error, message } = err.response.data;
        toastr.error(error, message);

        setIsSubmitting(false);
      });
  };

  return (
    <form
      className={styles.LoginForm__formWrapper}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Link className={styles.LoginForm__logo} to={AppRoute.home}>
        <img src={logo} alt="logo" />
      </Link>
      <h2 className={styles.LoginForm__title}>Login</h2>
      <Input
        className="mb-3"
        innerRef={register}
        name="username"
        label="Username"
        placeholder="Enter username"
        feedback={errors.username?.message}
        isError={!!errors.username}
      />
      <Input
        className="mb-5"
        innerRef={register}
        name="password"
        label="Password"
        placeholder="Enter password"
        feedback={errors.password?.message}
        isError={!!errors.password}
      />
      <Button
        className="mb-2"
        type="submit"
        label="Log in"
        isDisabled={isSubmitting || !isEmptyObject(errors)}
        isSubmitting={isSubmitting}
      />
      <Link className={styles.LoginForm__forgotPassword} to={AppRoute.home}>
        Forgot password?
      </Link>
    </form>
  );
};

export default LoginForm;
