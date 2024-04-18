import {ReviewsResponse} from "../app/types";

export async function getReviews():Promise<ReviewsResponse>{
    return fetch(`http://localhost:1337/reviews`,
        { headers: {'Content-Type': 'application/json',},
        }).then(res=>res.json())
}