import { useNavigate } from "react-router-dom";
import { formatDate } from "./utils/FormateDate";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import client from "../client"


export default function NewsListing() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        client
          .fetch(
            `*[_type == "post"] {
            title,
            slug,
            publishedAt,
            body,
            mainImage {
              asset -> {
                _id,
                url
              },
              alt
            },
            "name": author->name,
            "authorImage": author->image,
            "bio": author->bio,
          }`
          )
          .then((data) => setPosts(data))
          .catch(console.error)
      }, []);

    return (
        <>
            {/* Back Button */}
            <div className="mt-6 mb-4 px-4 max-w-2xl mx-auto">
                <button
                    onClick={() => navigate(-1)} // Navigate to the previous page
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm md:text-base"
                >
                    ←
                </button>
                <h1 className="max-w-2xl  p-4 pt-8 text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                Latest News
            </h1>
            </div>
            
            <div className="max-w-[90rem] mx-auto p-4 space-y-6 rounded-lg mb-4">


                {posts.map((post) => (
                    <article key={post.slug.current} className="group cursor-pointer mb-20" onClick={() => navigate(`/news-details/${post.slug.current}`)}>
                        <div className="relative  h-[350px] md:h-[400px]  overflow-hidden mb-3">
                            <img src={post.mainImage.asset.url} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 42rem"/>
                        </div>
                        <time className="text-xs md:text-sm text-gray-600 mb-2 block">
                            {formatDate(post.publishedAt)}
                        </time>
                        <h2 className="text-lg md:text-3xl font-bold leading-tight">
                            {post.title}
                        </h2>
                    </article>
                ))}


            </div>
        </>
    );
}

