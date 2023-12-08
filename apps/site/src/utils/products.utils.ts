import { getCookie, setCookie } from "cookies-next";

//get recently viewed data from cookie
export const getRecentlyViewed = (productId: number) => {
  let cookieValue = getCookie("recently_viewed_data_list") as any;
  let recentlyViewed = cookieValue ? JSON.parse(cookieValue) : [];
  recentlyViewed.push(productId);
  const uniqueViews = [...new Set(recentlyViewed)];
  setCookie("recently_viewed_data_list", JSON.stringify(uniqueViews), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};
