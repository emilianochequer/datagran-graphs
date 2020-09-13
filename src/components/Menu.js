import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Container, Segment } from "semantic-ui-react";

const { Item } = Menu;

const Hero = () => {
  const location = useLocation();

  return (
    <Menu
      size="large"
    >
      <Container>
        <Item active={location.pathname === '/'}>
          <Link to="/" style={{ color: "rgba(10,9,9,.75)" }}>
            <span>Line Chart</span>
          </Link>
        </Item>
        <Item active={location.pathname === '/posts'}>
          <Link to="/posts" style={{ color: "rgba(10,9,9,.75)" }}>
            <span>Posts</span>
          </Link>
        </Item>
      </Container>
    </Menu>
  );
};

export default Hero;
