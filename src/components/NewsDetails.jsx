import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import client from "../client"
import BlockContent from "@sanity/block-content-to-react"



export default function Article() {

  const [singlePost, setSinglePost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useParams()


  const navigate = useNavigate();

  
  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
          title,
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
      .then((data) => setSinglePost(data[0]))
    setIsLoading(false)
  }, [slug])

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
      </div>



      {isLoading ? (
        <h1 className="uppercase font-bold text-4xl tracking-wide mb-5 md:text-6xl lg:text-8xl flex items-center justify-center h-screen">
          Loading...
        </h1>
      ) : (
        <article className="mx-auto px-4 md:px-6 flex flex-col justify-center items-center">

          {singlePost.mainImage && singlePost.mainImage.asset && (
            <div className="relative w-[85vw] h-[400px] md:h-[500px] mb-6 rounded-lg overflow-hidden">
              <img
                src={singlePost.mainImage.asset.url}
                alt={singlePost.title}
                title={singlePost.title}
                className="absolute inset-0 w-full h-full object-cover"
                priority
              />
            </div>
          )}


          <div className="px-4 md:px-6">
            <div className="flex justify-center items-center">
              <h1 className="text-xl md:text-3xl font-bold leading-tight mb-3">
                {singlePost.title}
              </h1>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-600 mb-6">
              <span className="font-medium">{singlePost.name}</span>
              <span>·</span>
              <span><time>{singlePost.publishedAt}</time></span>
            </div>

            <div className="flex justify-center items-center px-6 py-12">
              <div className="prose prose-sm sm:prose-base prose-gray max-w-none mb-7 w-[77vw]">
                <BlockContent
                  blocks={singlePost.body}
                  projectId="0mdt7i04"
                  dataset="production"
                />
              </div>
            </div>
          </div>

        </article>
      )}


    </>
  )
}

