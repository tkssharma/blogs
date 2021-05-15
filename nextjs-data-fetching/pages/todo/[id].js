export default function TodoInfo({ todo }) {
  console.log(todo);
  return (
    <>
      <h1>{todo.title}</h1>
      <input type="checkbox" readOnly checked={todo.completed}></input>
      <label for="completed">Completed</label>
    </>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${context.params.id}`
  );
  const todo = await res.json();

  return {
    props: {
      todo,
    },
  };
};
export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`);
  const todos = await res.json();

  const paths = todos.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
  //to only show two paths:
  /* return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  }; */
};
