import React from 'react';
import Meal from './Meal';
export default function MealList({mealData}) {
	const nutrients = mealData.nutrients;
	return <main>
		<section>
			<h1>Macros</h1>
			<ul>
				<li>Calories: {nutrients.calories.toFixed(0)}</li>
				<li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
				<li>Fat: {nutrients.fat.toFixed(0)}</li>
				<li>Protein: {nutrients.protein.toFixed(0)}</li>


			</ul>
		</section>
	</main>
	
		
}