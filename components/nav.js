import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Nav() {
  return (
    <Container>
      <Link href="/">Blog</Link>
      <Transparency>공백</Transparency>
    </Container>
  );
}

const Container = styled.div`
  height: 30px;
  margin: 1rem 2rem;
`;

const Transparency = styled.span`
  color: transparent;
`;
