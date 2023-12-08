import React from "react";
import { Heading3, BodyText, Button } from "@jstemplate/ecommerce-ui";
import { HiStar } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useReviews } from "../../../lib/woocommerce/useReviews";
import { FormLoader } from "../formLoader/FormLoader";
import { ReviewCard } from "./ReviewCard";
import Rating from "react-rating";
import axios from "axios";

interface CustomerReviewProps {
  productId?: number;
}

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const CustomerReview = ({ productId }: CustomerReviewProps) => {
  const { addToast } = useToasts();

  const [loading, setLoading] = React.useState(false);

  const [rating, setRating] = React.useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { reviews, isLoading } = useReviews(productId);
  const onSubmit = handleSubmit((data: any) => {
    if (rating === 0) {
      return addToast("Please select rating", { appearance: "error", autoDismiss: true, autoDismissTimeout: 2000 });
    }
    const addData = {
      review: data?.message,
      reviewer: data?.name,
      reviewer_email: data?.email,
      rating: rating,
      product_id: productId,
    };
    setLoading(true);
    axios
      .post("/api/products/post-review", addData)
      .then(() => {
        addToast("Review added successfully", { appearance: "success", autoDismiss: true, autoDismissTimeout: 2000 });
        reset();
        setLoading(false);
      })
      .catch(() => {
        addToast("Something went wrong", { appearance: "error", autoDismiss: true, autoDismissTimeout: 2000 });
        setLoading(false);
      });
  });

  return (
    <section className="flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-1/2 h-[34rem] overflow-y-auto scrollBar">
        <div className="grid grid-cols-1 gap-3 justify-items-center">
          {/* not result message */}
          {reviews && reviews.length === 0 && !loading && !isLoading && (
            <Heading3 intent="bold" className="mt-20 text-themePrimary600 ">
              No reviews yet
            </Heading3>
          )}
          {/* review lists */}
          {!isLoading && reviews?.map((items: any, index: number) => <ReviewCard data={items} key={index} />)}
          {/* review loader */}
          {isLoading && <FormLoader color="text-red-500" size="h-7 w-7" />}
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="">
          <Heading3 intent="bold" className=" text-themeSecondary800">
            Leave a Review
          </Heading3>
          <BodyText size="md" intent="semibold" className=" text-themeSecondary800 mt-6">
            Your rating
          </BodyText>
          <div className="flex gap-1 mt-3">
            {/* @ts-ignore */}
            <Rating
              onClick={handleRating}
              initialRating={rating}
              emptySymbol={<HiStar className="text-themeSecondary300 h-6 w-6" />}
              fullSymbol={<HiStar className="text-themeWarning500 h-6 w-6" />}
            />
          </div>
          <form className="mt-8" onSubmit={onSubmit}>
            <div className="flex flex-col md:flex-row items-center gap-5">
              <input
                className={`w-full px-5 py-3 text-base outline-none bg-white border rounded placeholder:text-themeSecondary400 ${
                  errors.name && "border-red-500"
                }`}
                placeholder="Name"
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
              <input
                className={`w-full px-5 py-3 text-base outline-none bg-white border rounded placeholder:text-themeSecondary400 ${
                  errors.email && "border-red-500"
                }`}
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <textarea
              rows={8}
              cols={50}
              placeholder="Write your message..."
              className={`w-full px-5 py-3 text-base outline-none bg-white border rounded placeholder:text-themeSecondary400 mt-5 ${
                errors.message && "border-red-500"
              }`}
              {...register("message", {
                required: true,
              })}
            />
            <Button
              size="xl"
              color="dark"
              className={`flex gap-4 items-center justify-center w-full mt-7 ${loading ? "bg-themeSecondary800" : ""}`}
            >
              {loading && <FormLoader />}
              {loading ? "Processing..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
