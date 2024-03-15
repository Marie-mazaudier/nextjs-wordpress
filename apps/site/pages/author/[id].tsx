import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useGetPostsByAuthorId } from "../../lib/swr-wordpress/getPosts";
import { CategoryCards, Spaces, Breadcrumb } from "@jstemplate/ecommerce-ui";
const Author = () => {
    const [pageData, setPageData] = useState<number>(6);
    const router = useRouter();
    const id = router.asPath.split("/")[2];

    // ==================Get all post data using author id=================

    const { posts: AuthorPost } = useGetPostsByAuthorId(`${id}`, {
        per_page: pageData,
    });
    const handleClick = () => {
        setPageData(pageData + 6);
    };
    const author = AuthorPost[0]?.author ? AuthorPost[0].author : "Author";
    return (
        <>
            <Head>
                <title>Author Page | MetaShop</title>
                <meta name="description" content="Author Page description" />
            </Head>
            <Breadcrumb name={`Author: ${author}`} />
            <Spaces />
            <CategoryCards data={AuthorPost} handleClick={handleClick} pageData={pageData} />
        </>
    );
};

export default Author;