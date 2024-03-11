import React from "react";
import { Button } from "../../../../../packages/ecommerce-ui/src";
import { BlogCardHome } from "../../../../../packages/ecommerce-ui/src/molecules/blog/BlogCardHome";
import { PostNode } from "src/types/blogCardTypes";
import { Heading2 } from "../../../../../packages/ecommerce-ui/src";

interface LastPostsProps {
    posts: PostNode[]; // Ceci est maintenant un tableau de produits

}

export const LastPosts = ({ posts }: LastPostsProps) => {
    //   console.log('LastPosts', posts)
    return (
        <section className="container mx-auto mb-14 lg:mb-24 px-4 md:px-20">
            <Heading2 className="text-center mb-8">Nos derniers articles</Heading2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 col-span-12 lg:col-span-8 h-fit">
                {posts.map((post, index) => (
                    <BlogCardHome key={index} data={{
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.excerpt,
                        publishTime: post.date,
                        featuredmedia: {
                            mediaItemUrl: post.featuredImage?.node?.mediaItemUrl,
                            alt: "Description alternative", // Idéalement, fournissez ou récupérez une description alternative adéquate
                        },
                        // Ici, nous ajustons pour inclure le nom et le slug des catégories
                        category: post.categories.nodes.map(node => ({
                            name: node.name,
                            slug: node.slug,
                        })),
                    }} />
                ))}
            </div>
        </section>
    );
};