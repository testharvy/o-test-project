import {getProducts} from "../actions/getProducts"
import MainPage from "@/components/MainPage/MainPage";
import {getReviews} from "@/actions/getReviews";


export default async function Home() {
    const reviews = await getReviews();
    const initProducts = await getProducts(1, 6);

    return (
        <MainPage reviews={reviews} initProducts={initProducts}/>
    );
}