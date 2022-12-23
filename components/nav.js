import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Nav() {
  const menuItem = ["All", "tags"];
  const [activeItem, setActiveItem] = useState("All");

  return (
    <Container>
      <Link href="/">Blog</Link>
      <Transparency>공백</Transparency>
      <Link href="/posts/daily/2212">Daily</Link>
    </Container>
  );
}

const Container = styled.div`
  height: 30px;
  /* border-bottom: 1px solid $underline-color; */
  margin: 1rem 2rem;

  /* div {
    height: 30px;
    padding: 0 8px;
    cursor: pointer;
    margin: auto 0;
    display: flex;
    align-items: center;

    &:hover {
      border-radius: 5%;
      background-color: $underline-color;
    }
  }

  .active {
    color: black;
    font-weight: bold;
    border-bottom: 2px solid black;
    padding: 0;
  } */
`;

const Transparency = styled.span`
  color: transparent; 
`;

const Image = styled.img`
  /* max-width: 100%; */
  display: block;
  border-radius: 9999px;
  width: 100px;
  height: 100px;
`;
