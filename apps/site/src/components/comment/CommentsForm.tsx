import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Heading3 } from "@jstemplate/ecommerce-ui";
import { LoaderRound } from "../../loaders/Loader";

interface commentsFormProps {
  postId?: any;
}

export const CommentsForm = ({ postId }: commentsFormProps) => {
  const [commentLoader, setCommentLoader] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showErrMessage, setShowErrMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setCommentLoader(true);
    const commentDataInput = {
      author_name: data?.name,
      author_email: data?.email,
      content: data?.message,
      post: postId,
    };

    await axios
      .post(`/api/comments/create-comment`, commentDataInput)
      .then((res) => {
        setShowErrMessage(false);
        setErrMessage("");
        setShowMessage(true);
        setCommentLoader(false);
      })
      .catch((err) => {
        setShowMessage(false);
        setShowErrMessage(true);
        setErrMessage(err?.message);
        setCommentLoader(false);
      });
  };

  return (
    <section>
      {showMessage && (
        <p className="px-10 mt-10 mb-6 font-bold border-l-4 rounded-lg bg-themeSuccess100 text-themeSuccess900 font-2xl py-7 border-themeSuccess500">
          Thanks For Your Comment. Your Comment Is Under Review Now.
        </p>
      )}
      {showErrMessage && (
        <p className="px-10 mt-10 mb-6 font-bold border-l-4 rounded-lg bg-themeWarning100 text-themeWarning900 font-2xl py-7 border-themeWarning500">
          {errMessage}
        </p>
      )}
      <Heading3 intent="bold" className="mb-5 text-themeSecondary800">
        Write Your Comment
      </Heading3>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 md:flex-row">
          <input
            className={`w-full px-6 py-3 text-base outline-none bg-themeSecondary100 border rounded ${
              errors?.name ? "border-red-500" : "border-themeSecondary100"
            }`}
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />
          <input
            className={`w-full px-6 py-3 text-base outline-none bg-themeSecondary100 border rounded ${
              errors?.email ? "border-red-500" : "border-themeSecondary100"
            }`}
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <textarea
          rows={4}
          cols={50}
          placeholder="Comment"
          className={`block w-full px-5 py-3 my-5 font-medium border rounded placeholder:text-base placeholder:text-themeSecondary400 focus:outline-none bg-themeSecondary100 ${
            errors?.message ? "border-red-500" : "border-themeSecondary100 "
          }`}
          {...register("message", { required: true })}
        />
        <button
          disabled={commentLoader}
          type="submit"
          className="px-8 py-4 text-base leading-6 text-white transition rounded-md bg-themePrimary600 hover:bg-themeSecondary800 hover:duration-300 flex justify-center"
        >
          {commentLoader && <LoaderRound />}
          <span className={`${commentLoader ? "ml-2" : ""}`}>{commentLoader ? "Plase Wait.." : "Share Comment"}</span>
        </button>
      </form>
    </section>
  );
};
