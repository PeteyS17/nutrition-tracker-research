
import { useState } from 'react'
import './App.css'

function App() {
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [foods, setFoods] = useState([])

  function addFood(event) {
    event.preventDefault()

    if (!foodName.trim() || calories === '' || Number(calories) < 0) {
      return
    }

    const newFood = {
      id: crypto.randomUUID(),
      name: foodName.trim(),
      calories: Number(calories),
    }

    setFoods([...foods, newFood])
    setFoodName('')
    setCalories('')
  }

  function deleteFood(id) {
    setFoods(foods.filter((food) => food.id !== id))
  }

  const totalCalories = foods.reduce(
    (total, food) => total + food.calories,
    0
  )

  return (
    <main>
      <h1>🌱 Mini Nutrition Tracker</h1>
      <p>Track the foods you eat and your daily calories.</p>

      <form onSubmit={addFood}>
        <input
          type="text"
          placeholder="Food name"
          value={foodName}
          onChange={(event) => setFoodName(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Calories"
          min="0"
          value={calories}
          onChange={(event) => setCalories(event.target.value)}
          required
        />

        <button type="submit">Add Food</button>
      </form>

      <h2>Today's Foods</h2>

      {foods.length === 0 ? (
        <p>No foods logged yet.</p>
      ) : (
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              {food.name} — {food.calories} calories
              <button onClick={() => deleteFood(food.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Total Calories: {totalCalories}</h2>
    </main>
  )
}

export default App
