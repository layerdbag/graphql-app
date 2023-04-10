import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


// Components
import BookList from './components/BookList';
import BookForm from './components/BookForm';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
       {
         books {
          name
          genre

        }
      }
    `,
  })
  .then((result) => console.log(result));


const App = () => {

  return (
    <ApolloProvider client={client}>
      <div className="App main">
          <h1>Reading List</h1>
          <BookList />
          <BookForm />
      </div>
    </ApolloProvider>
  )
}

export default App
