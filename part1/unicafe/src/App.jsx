/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = good * (100/total)

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' count={good}/>
        <StatisticLine text='neutral' count={neutral}/>
        <StatisticLine text='bad' count={bad}/>
        <StatisticLine text='all' count={total}/>
        <StatisticLine text='average' count={average}/>
        <StatisticLine text='positive' count={positive}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, count }) => {
  if (text === 'positive') {
    return (
      <tr><td>{text}</td><td>{count} %</td></tr>
    )
  }
  return (
    <tr><td>{text}</td><td>{count}</td></tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App