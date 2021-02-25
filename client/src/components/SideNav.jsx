import React from 'react'
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { DIRECTOR_LIST, ADD_MOVIE, MOVIE_LIST, ADD_DIRECTOR } from '../queries';

const SideNav = () => {
  const { data } = useQuery(DIRECTOR_LIST)

  const [ addMovie ] = useMutation(
    ADD_MOVIE,
    { refetchQueries: [{ query: MOVIE_LIST }], awaitRefetchQueries: true }
  )
    const [ addDirecter ] = useMutation(
      ADD_DIRECTOR,
      { refetchQueries:[{ query: DIRECTOR_LIST }], awaitRefetchQueries: true }
    )

  const { register, handleSubmit } = useForm()
  const { register: registerDirector, handleSubmit: handleSubmitDirecter } = useForm()

  const onSubmitMovie = ({ movieName, movieGenre, directorId }, e) => {
    addMovie({
        variables: {
        name: movieName,
        genre: movieGenre,
        directorId
      }
    })
    e.target.reset()
  }

  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    const IntAge = parseInt(directorAge)
    addDirecter({
      variables: {
        name: directorName,
        age: IntAge,
      }
    })
    e.target.reset()
  }

  return (
    <div>
      <Card>
        <CardHeader>
          映画監督
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirecter(onSubmitDirector)}>
            <FormGroup>
              <input
                className="form-control" type="text" name="directorName"
                placeholder="監督名" ref={registerDirector}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control" type="number" name="directorAge"
                placeholder="年齢" ref={registerDirector}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          映画作品
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmitMovie)}>
            <FormGroup>
              <input
                className="form-control" type="text" name="movieName"
                placeholder="タイトル" ref={register}
              />
            </FormGroup>
            <FormGroup>
              <input
                className="form-control" type="text" name="movieGenre"
                placeholder="ジャンル" ref={register}
              />
            </FormGroup>
            <FormGroup>
              <select
                className="form-control" type="select" name="directorId"
                ref={register}
              >
                {data && data.directors.map(({id, name}) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default SideNav
