import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {text}
          </td>
          <td>
            {value}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({stats}) => {
  if (stats.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
        <StatisticLine text="good" value={stats.good}/>
        <StatisticLine text="neutral" value={stats.neutral}/>
        <StatisticLine text="bad" value={stats.bad}/>
        <StatisticLine text="all" value={stats.total}/>
        <StatisticLine text="average" value={stats.average}/>
        <StatisticLine text="positive" value={stats.positive}/>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [score, setScore] = useState(0)
  const [statistics, setStatistics] = useState({
    good: good,
    neutral: neutral,
    bad: bad,
    total: total, 
    average: average,
    positive: positive
  })

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
    const newTotal = total + 1;
    setTotal(newTotal);
    const newScore = score + 1;
    setScore(newScore);
    const newAverage = newScore / newTotal;
    setAverage(newAverage);
    const newPositive = (newGood / newTotal) * 100;
    setPositive(newPositive);
    setStatistics({...statistics, good: newGood, total: newTotal, average: newAverage, positive: newPositive})
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const newTotal = total + 1;
    setTotal(newTotal);
    const newAverage = score / newTotal;
    setAverage(newAverage);
    const newPositive = (good / newTotal) * 100;
    setPositive(newPositive);
    setStatistics({...statistics, neutral: newNeutral, total: newTotal, average: newAverage, positive: newPositive})
  }

  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
    const newTotal = total + 1;
    setTotal(newTotal);
    const newScore = score - 1;
    setScore(newScore);
    const newAverage = newScore / newTotal;
    setAverage(newAverage);
    const newPositive = (good / newTotal) * 100;
    setPositive(newPositive);
    setStatistics({...statistics, bad: newBad, total: newTotal, average: newAverage, positive: newPositive})
  }


  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button clickHandler={handleGoodClick} text="good"/>
      <Button clickHandler={handleNeutralClick} text="neutral"/>
      <Button clickHandler={handleBadClick} text="bad"/>
      <h1>
        statistics
      </h1>
      <Statistics stats={statistics}/>
    </div>
  )
}

export default App