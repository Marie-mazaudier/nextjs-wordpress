import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // only accept POST requests
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "You are not allowed",
    });
  }
  // cocart login api
  const { username, password } = req.body;

  try {
    const { data } = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/login`,
        {},
        {
          auth: {
            username: username,
            password: password,
          },
        }
      )
      .then((res: any) => {
        return res.data.role === "Customer"
          ? {
              data: {
                message: "Login success",
                data: res.data,
              },
            }
          : {
              data: {
                message: "You are not allowed",
                description: "You are not allowed.Because you are not customer",
                status: 400,
              },
            };
      });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: "User or password is incorrect",
      error_message: "Username or password is incorrect",
      data: error,
    });
  }
}
