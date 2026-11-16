import { userParams } from 'react-router-dom';

export default function detail() {
    const { id } = userParams();

    return (
        <main> 
            <h1> Detail Product </h1>
            <p> ID Product: {id} </p>
        </main>   
    );
}