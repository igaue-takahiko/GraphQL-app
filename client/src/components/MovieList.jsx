import React from 'react'
import { Card, CardBody, Table, Button } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';

import { MOVIE_LIST, DELETE_MOVIE } from '../queries';

const MovieList = () => {
  const { loading, error, data } = useQuery(MOVIE_LIST)
  const [ deleteMovie ] = useMutation(
    DELETE_MOVIE,
    { refetchQueries: [{ query: MOVIE_LIST }], awaitRefetchQueries: true }
  )

  const handleDelete = (id) => {
    deleteMovie({ variables: { id } })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error</p>
  } else {
    return (
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>ジャンル</th>
                <th>監督</th>
                <th colSpan="2">年齢</th>
              </tr>
            </thead>
            <tbody>
              {data.movies.map(({ id, name, genre, director }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{genre}</td>
                  <td>{director.name}</td>
                  <td>{`${director.age}歳`}</td>
                  <td>
                    <Button color="primary" onClick={() => handleDelete(id)}>削除</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

export default MovieList
