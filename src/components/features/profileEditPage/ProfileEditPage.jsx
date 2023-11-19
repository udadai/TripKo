import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { user, editUser } from "../../../apis/user";
import InputGroup from "../../molecules/InputGroup";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import Button from "../../atoms/Button";
import LoadingPage from "../loadingPage/LoadingPage";
import ButtonBack from "../../atoms/ButtonBack";
import Photo from "../../atoms/Photo";
import ErrorBox from "../../atoms/ErrorBox";
import { ModalContext } from "../../../App";
import ProfileImageEditTemplate from "./ProfileImageEditTemplate";

const ProfileEditPage = () => {
  const { data, isLoading, error } = useQuery("userProfile", user);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (data) {
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .required("Name is required.")
          .matches(
            /^[a-zA-Z]+$/,
            "Name must contain at least 1 letter and only alphabetic characters are allowed.",
          ),
        nickName: yup
          .string()
          .required("Nickname is required.")
          .matches(
            /^(?=.*[a-zA-Z])[a-zA-Z\d]+$/,
            "Nickname must be at least 1 character long and contain at least one letter.",
          ),
        email: yup
          .string()
          .required("Email is required.")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
          ),
      }),
    ),
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        nickName: data?.nickName,
        email: data?.email,
      });
    }
  }, [data, reset]);

  const mutation = useMutation((newData) => editUser(newData), {
    onSuccess: () => {
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
    },
    onError: (error) => {
      setSuccessMessage("");
      setErrorMessage(
        error.message || "An error occurred while updating the profile.",
      );
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };
  // 파일 업로드

  const { show } = useContext(ModalContext);
  const onOpenImageChange = (e) => {
    show(<ProfileImageEditTemplate initImageURL={data?.image} />);
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="profile-edit-page width-flex-layout flex h-screen items-center justify-center p-8">
      <div className="profile-edit-container flex w-full flex-col justify-center gap-4">
        <div className="flex justify-between">
          <div className="ml-4 mt-2">
            <ButtonBack />
          </div>
          <span className="text-4xl font-bold text-tripKoOrange">
            Edit My Profile
          </span>

          <Button as={Link} to="/" className="mt-2" aria-label="home-button">
            <AiOutlineHome size={24} />
          </Button>
        </div>
        <div className={"avatar-wrapper flex w-full justify-center "}>
          <div
            className={"relative overflow-hidden rounded-full cursor-pointer"}
            onClick={onOpenImageChange}
            aria-label={"change-profile-image"}
          >
            <Photo
              src={data?.image || "/images/default-avatar.jpg"}
              alt={data?.name}
              className={"mx-auto h-40 w-40 rounded-full"}
            />
            <div
              className={
                "edit-avatar-sign absolute bottom-0 w-full bg-black py-2 text-center text-xl font-semibold text-tripKoOrange-100 opacity-70"
              }
            >
              Edit
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            label="Name"
            name="name"
            type="text"
            register={register}
            errorMsg={errors.name?.message}
          />
          <InputGroup
            label="Nickname"
            name="nickName"
            type="text"
            register={register}
            errorMsg={errors.nickName?.message}
          />
          <InputGroup
            label="Email"
            name="email"
            type="email"
            register={register}
            errorMsg={errors.email?.message}
          />

          <Button
            className="mt-4 w-full rounded-full bg-tripKoOrange p-2 text-xl font-bold text-white"
            type="submit"
            aria-label="save-changes-button"
          >
            Save Changes
          </Button>
        </form>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger font-semibold text-red-500">
            <ErrorBox>{errorMessage}</ErrorBox>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditPage;
