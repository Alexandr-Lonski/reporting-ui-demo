import { Col, Container, Nav, Row, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import ApiDrivenDataTable from "./ApiDrivenDataTable";

const Components = () => {
  return(
    <Container className="pt-3">
     <Tab.Container id="left-tabs-example" defaultActiveKey={'data-table'}>
      <Row>
        <Col sm={2}>
          <Nav.Item variant="pills" className="flex-column">
            <Nav.Item className="item-name">
              <Link to="component">
                <Nav.Link eventKey="data-table">
                  Data Table
                </Nav.Link>
              </Link>
            </Nav.Item>
          </Nav.Item>
        </Col>
        <Col sm={10} style={{borderLeft: '1px solid #eaeaea', padding: '10px 20px'}}>
          <Tab.Content>
            <Tab.Pane eventKey="data-table">
              <ApiDrivenDataTable />
            </Tab.Pane>
          </Tab.Content>
        </Col>
   
      </Row>
    </Tab.Container>
  </Container>
  )
}

export default Components