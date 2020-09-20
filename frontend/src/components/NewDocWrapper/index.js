export const wrapper = (wrappedComponent) => (props) => {
  return <Container
    className="text-center"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw"
    }}
  >
    <Row>
      <Col>
        <WrappedComponent {...props}/>
      </Col>
    </Row>
  </Container>
}
