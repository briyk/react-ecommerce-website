import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title='about' />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="about" />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Welcome to our furniture ecommerce store! We are dedicated to
            bringing you the best selection of high-quality furniture at
            unbeatable prices. Our team is passionate about finding the perfect
            pieces to complement your home and bring your vision to life. With a
            wide variety of styles to choose from, you'll be sure to find
            something that fits your unique taste. From rustic farmhouse to
            modern minimalism, we've got you covered. Plus, with our convenient
            online shopping experience, you can browse and purchase from the
            comfort of your own home. We believe that everyone deserves to have
            a home that they love, and we are committed to helping you make that
            a reality. Thank you for choosing us for all of your furniture
            needs!
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
