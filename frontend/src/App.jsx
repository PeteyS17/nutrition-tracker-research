
import { useState } from 'react'
import './App.css'

const foodDatabase = [
  { name: 'Apple (medium)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Chicken Breast (100 g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice (100 g)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
  { name: 'Egg (large)', calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
  { name: 'Greek Yogurt (100 g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Oatmeal (100 g cooked)', calories: 71, protein: 2.5, carbs: 12, fat: 1.5 },
  { name: 'Salmon (100 g cooked)', calories: 206, protein: 22, carbs: 0, fat: 12 },
]
function App() {
const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')

const searchResults = searchQuery.trim()
  ? foodDatabase.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
  : []

function selectFood(food) {
  setFoodName(food.name)
  setCalories(String(food.calories))
  setProtein(String(food.protein))
  setCarbs(String(food.carbs))
  setFat(String(food.fat))
  setSearchQuery('')
}
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
      <h2>Search Foods</h2>

<input
  type="search"
  placeholder="Search apple, chicken, rice..."
  value={searchQuery}
  onChange={(event) => setSearchQuery(event.target.value)}
  aria-label="Search foods"
/>

{searchQuery.trim() && (
  <div className="search-results">
    {searchResults.length === 0 ? (
      <p>No matching foods found. You can enter a food manually below.</p>
    ) : (
      searchResults.map((food) => (
        <div className="search-result" key={food.name}>
          <div>
            <strong>{food.name}</strong>
            <p>
              {food.calories} cal · {food.protein}g protein ·
              {' '}{food.carbs}g carbs · {food.fat}g fat
            </p>
          </div>

          <button type="button" onClick={() => selectFood(food)}>
            Select
          </button>
        </div>
      ))
    )}
  </div>
)}

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
    
    <h2>Macronutrient Chart</h2>
<p>Compare your total protein, carbs, and fat intake.</p>

<div className="chart">
  {[
    { label: 'Protein', value: totals.protein, color: '#4caf70' },
    { label: 'Carbs', value: totals.carbs, color: '#e7ad42' },
    { label: 'Fat', value: totals.fat, color: '#6588df' },
  ].map((nutrient) => {
    const maxValue = Math.max(
      totals.protein,
      totals.carbs,
      totals.fat,
      1
    )

    return (
      <div className="chart-row" key={nutrient.label}>
        <span>{nutrient.label}</span>

        <div className="chart-track">
          <div
            className="chart-bar"
            style={{
              width: `${(nutrient.value / maxValue) * 100}%`,
              backgroundColor: nutrient.color,
            }}
          />
        </div>

        <strong>{nutrient.value} g</strong>
      </div>
    )
  })}
</div>
</main>
  )
}

export default App
