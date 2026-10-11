
import { useState } from 'react'
import './App.css'

function App() {
const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)

  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [foods, setFoods] = useState([])

function handleLogin(event) {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      return
    }

    
    setLoggedInUser(username.trim())
    setPassword('')
  }

  function handleLogout() {
    setLoggedInUser(null)
    setUsername('')
    setPassword('')
    setFoods([])
  }

  function addFood(event) {
    event.preventDefault()

    const values = [calories, protein, carbs, fat]

   if (
      !foodName.trim() ||
      values.some(
        (value) =>
          value === '' ||
          !Number.isFinite(Number(value)) ||
          Number(value) < 0
      )
    ) {
      return
    }

    const newFood = {
      id: crypto.randomUUID(),
      name: foodName.trim(),
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    }

    setFoods([...foods, newFood])
    setFoodName('')
    setCalories('')
    setProtein('')
    setCarbs('')
    setFat('')
  }

  function deleteFood(id) {
    setFoods(foods.filter((food) => food.id !== id))
  }

 const totals = foods.reduce(
    (total, food) => ({
      calories: total.calories + food.calories,
      protein: total.protein + food.protein,
      carbs: total.carbs + food.carbs,
      fat: total.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )
  if (!loggedInUser) {
    return (
      <main>
        <h1>🌱 Mini Nutrition Tracker</h1>
        <h2>Demo Login</h2>
        <p>Enter any username and password to explore the app.</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

      
      </main>
    )
  }

  return (
    <main>
      <h1> 🌱Mini Nutrition Tracker</h1>
      <p>Welcome, {loggedInUser}!</p>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>

      <h2>Add Food</h2>


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

        <input
          type="number"
          placeholder="Protein (g)"
          min="0"
          step="any"
          value={protein}
          onChange={(event) => setProtein(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Carbs (g)"
          min="0"
          step="any"
          value={carbs}
          onChange={(event) => setCarbs(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Fat (g)"
          min="0"
          step="any"
          value={fat}
          onChange={(event) => setFat(event.target.value)}
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
              <strong>{food.name}</strong> — {food.calories} cal,
              {' '}{food.protein}g protein,
              {' '}{food.carbs}g carbs,
              {' '}{food.fat}g fat
              {' '}
              <button type="button" onClick={() => deleteFood(food.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Daily Totals</h2>
      <p>Calories: {totals.calories}</p>
      <p>Protein: {totals.protein} g</p>
      <p>Carbohydrates: {totals.carbs} g</p>
      <p>Fat: {totals.fat} g</p>
    </main>
  )
}

export default App
