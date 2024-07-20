const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ part, count }) => {
  return (
    <div>
      <p>
        {part} {count}
      </p>
    </div>
  )
}

const Total = ({ one, two, three }) => {
  return (
    <div>
      <p>
        Number of exercises {one + two + three}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content part={part1} count={exercises1} />
      <Content part={part2} count={exercises2} />
      <Content part={part3} count={exercises3} />
      <Total one={exercises1} two={exercises2} three={exercises3} />
    </div>
  )
}

export default App
