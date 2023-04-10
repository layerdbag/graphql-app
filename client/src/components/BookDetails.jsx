import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ id }) => {
  if (!id) {
    return (
      <div className='book-details spacing'>No book selected...</div>
    )
  }

  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: id
    },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  console.log(id)
  console.log(data)
  
 
  if (data) {
    return (
      <div className="book-details">
      <div className='spacing'>
        <h2>
          {data.book.name}
        </h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul className='other-books'>
          {data.book.author.books.map(item => 
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
        </div>
      </div>
    )
  } 
  
}


export default BookDetails