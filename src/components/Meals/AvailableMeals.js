import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://fir-react-400cb-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Somthing went Wrong');
            }
            const data = await response.json()
            const loadedMeals = [];
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    price: data[key].price,
                    description: data[key].description
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false);
        }
        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message)
        })
    }, [])

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }


    const mealsList = meals.map((meal) => <MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} description={meal.description} />)
    return (
        <section className={classes.meals}>
            <Card >
                {!isLoading && mealsList}
                {isLoading && <p>Loading...</p>}

            </Card>
        </section>
    )
}

export default AvailableMeals

