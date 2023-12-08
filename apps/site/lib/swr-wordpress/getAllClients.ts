
import useSWR from "swr";
import axios from "axios";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const staticquery = {
    per_page: 10,
};

export const useGetAllClients = (query: any) => {
    // map the query object to use on api url
    const finalQuery = query ? query : staticquery;
    const queryStr =
        Object.keys(finalQuery)
            .map((key) => `${key}=${finalQuery[key]}`)
            .join("&") || "";

    // fetch posts from the API
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/clients?_embed&${queryStr}`, fetcher, {
        fallbackData: [],
    });

    if (data && !error && data.length > 0) {
        // filter out posts only allow title, excerpt, and featured image, author, and date
        const clients = data?.map((client: any) => ({
            id: client?.id || "",
            title: client?.title?.rendered || "",
            slug: client?.slug || "",
            featuredmedia: {
                sourceUrl: client?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
                alt: client?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || "",
            },
            author: client?._embedded?.author?.[0]?.name,
            authorId: client?._embedded?.author?.[0]?.id,
            category: client?._embedded?.["wp:term"]?.[0],
            tags: client?._embedded?.["wp:term"]?.[1],
            publishTime: client?.date,
            avatar: client?._embedded?.author?.[0]?.avatar_urls[96],
            content: client?.content?.rendered,
        }));

        // Add a conditional check to set sourceUrl and alt to empty strings if they don't exist
        const postsWithConditionalImage = clients.map((client: any) => ({
            ...client,
            featuredmedia: {
                sourceUrl: client.featuredmedia.sourceUrl || "",
                alt: client.featuredmedia.alt || "",
            },
        }));

        return {
            clients: postsWithConditionalImage,
            isLoading: !error && !data,
            isError: error,
        };
    }

    return {
        clients: [],
        isLoading: true,
        isError: error,
    };
};
