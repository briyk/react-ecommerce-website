import React from 'react'
import styled from 'styled-components'
import smile from '../assets/sad-face.png'
const NoProducts = () => {
  return (
    <Wrapper>
          <img src={smile} alt="no products"/>
          <h2>No Products Found</h2>
    </Wrapper>
  )
}

export default NoProducts


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  img{
    width: 150px;
  }
  h2{
    font-size: 2.5rem;
    margin-top: .5rem;
  }
`