import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const responseData = await fetch(
        "https://my-food-order-app-64b79-default-rtdb.firebaseio.com/my-food-order-app/meals.json"
      );
      if (!responseData.ok) {
        throw new Error("Something f****d up!");
      }
      let meals = [];
      const mealsBody = await responseData.json();
      for (const key in mealsBody) {
        meals.push({
          id: key,
          name: mealsBody[key].name,
          description: mealsBody[key].description,
          price: mealsBody[key].price,
        });
      }
      setMeals(meals);
      setLoading(false);
    };
    fetchMeals().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (loading) {
    return <section className={classes.mealsloading}>Loading...</section>;
  }

  if (httpError) {
    return <section className={classes.mealserror}>httpError</section>;
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      desc={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
