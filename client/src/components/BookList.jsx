import React, { useState } from 'react';

import { useQuery, gql } from '@apollo/client';
import { getBooksQuery, getBookQuery } from '../queries/queries';

// Components
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [ book, setBook ] = useState(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <div>
        <ul className='book-list spacing'>
          {data.books.map(book => (
            <li key={book.id} onClick={(e) => 
              setBook(book.id)}>{book.name}
            </li>
            ))
          }
        </ul> 
      </div>
     <BookDetails id={book} />
    </div>
  )
}



export default BookList