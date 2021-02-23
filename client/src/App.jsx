import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { Header, SideNav, MovieList } from './components';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <SideNav />
          </Col>
          <Col xs={12} sm={8}>
            <MovieList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
