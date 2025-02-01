import { Button, Card } from "@mui/material"
import { PlayCircle, Megaphone } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import client from "../client"


export default function NewsSection() {
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
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-[linear-gradient(155deg,rgba(255,190,122,0.5)_0%,#FFFFFF_100%)]">
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-6 ml-16">Latest News</h2>
        <div className="space-y-4 ml-12">

          {posts.slice(0, 3).map((post, index) => (
            <div key={index} className="flex gap-4 p-4 bg-transparent" 
            onClick={() => navigate(`/news-details/${post.slug.current}`)}>
              <article key={post.slug.current} className="flex">
                <div className="relative w-56 h-33 flex-shrink-0">
                  <img src={post.mainImage.asset.url} alt={post.title} className="absolute inset-0 w-full h-full object-cover rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold line-clamp-2 text-2xl ml-5">{post.title}</h3>
                  <p className="text-sm text-gray-500 ml-5">{post.publishedAt}</p>
                </div>
              </article>
            </div>
          ))}

          
          

        </div>
        <div className="absolute z-10 left-1/2">
          <button
            onClick={() => navigate("/news-list")}
            variant="outlined"
            className="px-4 py-2 border-2 border-black rounded-lg hover:scale-95 transition-transform duration-150 ease-in"
          >
            See more
          </button>
        </div>
        <br />
        <br />

      </div>

      <div className="md:w-72 space-y-4 mr-16 mt-16">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          <span className="font-bold">UPCOMING</span>
        </div>
        <div className="p-4 bg-transparent border border-black rounded-md flex flex-col justify-between">
          <p className="text-sm text-black-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <button className="bg-black text-white w-36 py-2 rounded-full m-auto hover:scale-95 transition-transform duration-150 ease-in">
            Join For Free
          </button>
        </div>
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>
      </div>
    </div>
  )
}

