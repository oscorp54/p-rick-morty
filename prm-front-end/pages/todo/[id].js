import Image from 'next/image'

export default function TodoInfo({ todo }) {
    return (
      <div>
        <h1>{todo.name}</h1>
        <p>{todo.status}</p>
        <p>{todo.species}</p>
        <p>{todo.gender}</p>
        <p>{todo.image}</p>
        
        <Image src={todo.image} width={500} height={500}></Image>
      </div>
    );
  }
  
  export const getServerSideProps = async (context) => {
      console.log('datas', context.params.id);
    const res = await fetch(
      `http://localhost:3001/character/${context.params.id}`
    );
    const todo = await res.json();
  
    return {
      props: {
        todo,
      },
    };
  };