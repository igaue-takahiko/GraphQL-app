import React from 'react'
import { Card, CardBody, Table } from 'reactstrap';
import { useQuery } from '@apollo/client';

import { MOVIE_LIST } from '../queries';

const MovieList = () => {
  const { loading, error, data } = useQuery(MOVIE_LIST)

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
              </tr>
            </thead>
            <tbody>
              {data.movies.map(({ id, name, genre, directer }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{genre}</td>
                  <td>{directer.name}</td>
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
