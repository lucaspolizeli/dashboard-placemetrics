import React from "react";
import { Container } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <div className="copyright">
            © {new Date().getFullYear()} | Placemetrics
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
