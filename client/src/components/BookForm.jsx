import React, { useState } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


const BookForm = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [ addBook ] = useMutation(addBookMutation, {
    refetchQueries: [
      {query: getBooksQuery},
    ],
  })
  

  if (loading) return <option disabled>Loading Authors...</option>
  if (error) return <p>Error : {error.message}</p>

  const handleName = ({ target }) => setName(target.value);

  const handleGenre = ({ target }) => setGenre(target.value);

  const handleAuthor = ({ target }) => setAuthorId(target.value);
  
  const handleSubmit = e => {
    e.preventDefault();
    addBook({ 
      variables: {name, genre, authorId }
    })

    setName('')
    setGenre('')
    setAuthorId('')
  }

  return (
    <div className='form-container spacing'>
    <form id="add-book" onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book name: </label>
        <input type='text' value={name} onChange={handleName} />
      </div>
    
      <div className='field'>
        <label>Genre: </label>
        <input type='text' value={genre} onChange={handleGenre} />
      </div>
    
      <div className='field'>
        <label>Author: </label>
          <select  value={'Select author'} onChange={handleAuthor}>
          <option disabled>Select author</option>
          {data.authors.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>

          ))
        }
          </select>
      </div>
      
      <button type='submit'>Add</button>
    </form>
     </div>
  )
  
};

// <form id="add-book">

//   <div className='field'>
//     <label>Book name: </label>
//     <input type='text' />
//   </div>

//   <div className='field'>
//     <label>Genre: </label>
//     <input type='text' />
//   </div>

//   <div className='field'>
//     <label>Author: </label>
//       <select>
//         <option>Select author</option>
//       </select>
//   </div>

//   <button type='submit'>Add</button>
// </form>



export default BookForm