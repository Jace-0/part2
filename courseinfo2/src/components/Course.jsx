
const Header = ({course}) =>{
    return(
      <h1>Web development curriculum</h1>
    )
  }

const Content = ({course}) => {
    return (
      <>
        {course.map(course => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map(part => (
              <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
            <Total course={course.parts}/>
          </div>
        ))}
      </>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <>
        <p>{name} {exercises}</p>
      </>
    )
  }
  
  
  const Total = ({course}) => {
    const total = course.reduce((sum, course) =>
      sum + course.exercises, 0)
  
    return (
      <p>total of {total} exercises</p>
    )
  }


  const Course = ({ course }) => {
    return (
      <div>
        <Header/>
        <h2>{course.name}</h2>
        <Content course={course} />

      </div>
    );
  };

  export default Course;
  