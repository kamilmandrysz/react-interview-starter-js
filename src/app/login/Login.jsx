import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toastr } from "react-redux-toastr";

import API from "lib/axios";

import { login } from "store/user/actions";

import { USER_ENDPOINTS } from "constants/endpoints";

import { AppRoute } from "../../routing/AppRoute.enum";

import { isEmptyObject } from "utils/common";

import Input from "components/input";
import Button from "components/button";

import styles from "./Login.module.scss";

import logo from "assets/images/logo.png";
import loginPic from "assets/images/login.png";

const schema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const Login = () => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
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
    <div className={styles.Login}>
      {isNotMobile && (
        <img className={styles.Login__image} src={loginPic} alt="login" />
      )}
      <form
        className={styles.Login__formWrapper}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Link className={styles.Login__logo} to={AppRoute.home}>
          <img src={logo} alt="logo" />
        </Link>
        <h2 className={styles.Login__title}>Login</h2>
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
        <Link className={styles.Login__forgotPassword} to={AppRoute.home}>
          Forgot password?
        </Link>
      </form>
    </div>
  );
};
