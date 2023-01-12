import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  //getting states and handlers from context
  const {
    filters: {
      text,
      category,
      color,
      company,
      price,
      minPrice,
      maxPrice,
      shipping,
    },
    updateFilter,
    clearFilter,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  // console.log(colors)

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Searing input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search..."
              className="search-input"
              value={text}
              onChange={updateFilter}
            />
          </div>
          {/* Searing input end */}
          {/* Category  */}
          <div className="form-control">
            <h5>Category</h5>
            {categories.map((item, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={updateFilter}
                  name="category"
                  className={` ${category === item.toLowerCase() ? "active" : null
                    } `}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {/* Category end */}
          {/* Companies */}
          <div className="form-control">
            <h5>Company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilter}
              className="company"
            >
              {companies.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* Companies end */}
          {/* Colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colors.map((item, index) => {
                if (item === "all") {
                  return (
                    <button
                    key={index}
                      type="button"
                      name="color"
                      data-color={item}
                      onClick={updateFilter}
                      className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    className={`${color === item ? "color-btn active" : "color-btn"
                      }`}
                    name="color"
                    style={{ background: item }}
                    data-color={item}
                    onClick={updateFilter}
                  >
                    {color === item ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Colors end */}
          {/* Price */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">
              {formatPrice(price)}
            </p>
            <input type="range"
              name="price"
              onChange={updateFilter}
              min={minPrice}
              max={maxPrice}
              value={price}
            />
          </div>
          {/* Price end */}
          {/* Shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Shipping</label>
            <input type="checkbox" name="shipping" id="shipping" onChange={updateFilter} checked={shipping} />
          </div>
          {/* Shipping end */}
        </form>
        {/* Clear filters */}
        <button type="button" className="clear-btn" onClick={clearFilter}>Reset</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    font-size: 1.2rem
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
