import { useNavigate } from "react-router-dom";
import { formatDate } from "./utils/FormateDate";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import client from "../client"

// const articles = [
//     {
//         id: 1,
//         title: "Google pledges to crack down fake reviews after UK watchdog investigation",
//         timestamp: "2025-01-24T22:34:00",
//         imageUrl:
//             "data:image/jpeg;base64,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jUUhaSiipbKCkooqGxhRSUVNgFApKWoTGS8K0A1ccBuQGPc1R2zpUrhmJyyK0yP5aJxqpNmxtYipSXqzdnF1LtYusTosvluV1D1TJiq7JiqdDssyaeFqtGKEipSYkUUHIkm0KyPFroJ+ZB+Vam5iABWZxVpSHM6zNNKiW7IVpx20qZhmquZxtSJiStNjizQ2sVG1T7PE2HWsol/t9DXZMWah2dEGjZWuMldjXUcbPc+n96x3200qYquecWzpjxNc3Fz3qLf4lM6n0/vVB9rEetcbmKNZrEackT8RifWoTXZnWor3a5M1bxhRnPIdnugezv3qOCSfWudy8BuaiXccdl09etdEYtnFkmkScdicoyj2v/Uf1qtUUg9d6QtXStI45O2OZq50UlJyBIWikoqeQxaKSkqXIBaKSipbAKKKKlsYUUUlKwCiiipAejUgMU2iqctAS7WKqXbxdVNODUhpl8mMrsuNrOi8adzzQVyL+5jvWulriJFZznGnriTRQcjSYjihI3qvuY1WBBqqa/Ncs1MVlgWoz1CW7XQPTBMlTTxdPxqKHpy3aVFqRMW6KdzPWomekN0VPE1WUmc2k5lQjeFNa+aagxvMTmuR1qJexU7VFe6T1pharjFIyllscz02aSaSq5GLdjiaSkopOQhZopKKXIAooopchhRSUVNgLRSUUrAKKKKACiiigAooooAKKKKACiiigAooooAKWkooAWikpadgFKDSUlFgdBcpM1MpaLAcWpJpKSq5gOmiabS0cwCikoqbAWikoosBaKSikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q==",
//     },
//     {
//         id: 2,
//         title: "Google pledges to crack down fake reviews after UK watchdog investigation",
//         timestamp: "2025-01-24T22:34:00",
//         imageUrl:
//             "data:image/jpeg;base64,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jUUhaSiipbKCkooqGxhRSUVNgFApKWoTGS8K0A1ccBuQGPc1R2zpUrhmJyyK0yP5aJxqpNmxtYipSXqzdnF1LtYusTosvluV1D1TJiq7JiqdDssyaeFqtGKEipSYkUUHIkm0KyPFroJ+ZB+Vam5iABWZxVpSHM6zNNKiW7IVpx20qZhmquZxtSJiStNjizQ2sVG1T7PE2HWsol/t9DXZMWah2dEGjZWuMldjXUcbPc+n96x3200qYquecWzpjxNc3Fz3qLf4lM6n0/vVB9rEetcbmKNZrEackT8RifWoTXZnWor3a5M1bxhRnPIdnugezv3qOCSfWudy8BuaiXccdl09etdEYtnFkmkScdicoyj2v/Uf1qtUUg9d6QtXStI45O2OZq50UlJyBIWikoqeQxaKSkqXIBaKSipbAKKKKlsYUUUlKwCiiipAejUgMU2iqctAS7WKqXbxdVNODUhpl8mMrsuNrOi8adzzQVyL+5jvWulriJFZznGnriTRQcjSYjihI3qvuY1WBBqqa/Ncs1MVlgWoz1CW7XQPTBMlTTxdPxqKHpy3aVFqRMW6KdzPWomekN0VPE1WUmc2k5lQjeFNa+aagxvMTmuR1qJexU7VFe6T1pharjFIyllscz02aSaSq5GLdjiaSkopOQhZopKKXIAooopchhRSUVNgLRSUUrAKKKKACiiigAooooAKKKKACiiigAooooAKWkooAWikpadgFKDSUlFgdBcpM1MpaLAcWpJpKSq5gOmiabS0cwCikoqbAWikoosBaKSikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q==",
//     },
//     {
//         id: 3,
//         title: "Google pledges to crack down fake reviews after UK watchdog investigation",
//         timestamp: "2025-01-24T22:34:00",
//         imageUrl:
//             "data:image/jpeg;base64,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jUUhaSiipbKCkooqGxhRSUVNgFApKWoTGS8K0A1ccBuQGPc1R2zpUrhmJyyK0yP5aJxqpNmxtYipSXqzdnF1LtYusTosvluV1D1TJiq7JiqdDssyaeFqtGKEipSYkUUHIkm0KyPFroJ+ZB+Vam5iABWZxVpSHM6zNNKiW7IVpx20qZhmquZxtSJiStNjizQ2sVG1T7PE2HWsol/t9DXZMWah2dEGjZWuMldjXUcbPc+n96x3200qYquecWzpjxNc3Fz3qLf4lM6n0/vVB9rEetcbmKNZrEackT8RifWoTXZnWor3a5M1bxhRnPIdnugezv3qOCSfWudy8BuaiXccdl09etdEYtnFkmkScdicoyj2v/Uf1qtUUg9d6QtXStI45O2OZq50UlJyBIWikoqeQxaKSkqXIBaKSipbAKKKKlsYUUUlKwCiiipAejUgMU2iqctAS7WKqXbxdVNODUhpl8mMrsuNrOi8adzzQVyL+5jvWulriJFZznGnriTRQcjSYjihI3qvuY1WBBqqa/Ncs1MVlgWoz1CW7XQPTBMlTTxdPxqKHpy3aVFqRMW6KdzPWomekN0VPE1WUmc2k5lQjeFNa+aagxvMTmuR1qJexU7VFe6T1pharjFIyllscz02aSaSq5GLdjiaSkopOQhZopKKXIAooopchhRSUVNgLRSUUrAKKKKACiiigAooooAKKKKACiiigAooooAKWkooAWikpadgFKDSUlFgdBcpM1MpaLAcWpJpKSq5gOmiabS0cwCikoqbAWikoosBaKSikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q==",
//     },
// ]

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

                {/* {articles.map((article) => (
                    <article key={article.id} className="group cursor-pointer" onClick={() => navigate(`/news-details/${article.id `)}>
                        <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-lg mb-3">
                            <img
                                src={article.imageUrl || "/placeholder.svg"}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 42rem"
                            />
                        </div>

                        <time className="text-xs md:text-sm text-gray-600 mb-2 block">
                            {formatDate(article.timestamp)}
                        </time>
                        <h2 className="text-lg md:text-xl font-semibold leading-tight group-hover:text-blue-600 transition-colors">
                            {article.title}
                        </h2>
                    </article>
                ))} */}

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

