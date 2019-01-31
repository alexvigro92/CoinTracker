import React from 'react';
import { Container, Row } from 'reactstrap';

export class Error404Component extends React.Component {

  render() {
    return (
      <div>
        <Container className="top20vh">
          <Row>
            <img src={require('../Assets/img/404.png')}
              className="icon-flat-btn" alt="logo"
              />
          </Row>
        </Container>
      </div>
    );
  }
}
