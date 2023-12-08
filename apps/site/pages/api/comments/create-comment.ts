import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
  // if request is not post return 404
  if (req.method !== "POST") {
    return res.status(404).json({ error: " You are not Allowed to access this route" });
  }

  if (!req.body) {
    return res.status(400).json({ error: "No body" });
  }
  const commentData = req?.body;
  const enCodedAuth = btoa(`${process.env.NEXT_PUBLIC_WP_AUTH_USER}` + ":" + `${process.env.NEXT_PUBLIC_WP_AUTH_PASS}`);

  axios({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/comments/?post=${commentData?.post}&content=${commentData?.content}&author_name=${commentData?.author_name}&author_email=${commentData?.author_email}`,
    headers: {
      Authorization: `Basic ${enCodedAuth}`,
    },
  })
    .then((response: any) => {
      return res.status(200).json({
        message: "Thanks for your comment",
        data: response.data,
      });
    })
    .catch((error: any) => {
      return res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}
