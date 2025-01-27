  import './Product.css';
  import { useContext } from 'react';
  import { sample } from '../../contests/Usercontest/Users';

  function Product(props) {
    let productObj = props.product;
    let { cred } = useContext(sample);
    let username = cred;
    console.log(username);

    async function addProductToCart(productObj) {
      console.log(productObj);
      try {
          productObj.username = username; // Optional, not necessary unless needed in productObj itself
          let res = await fetch(`http://localhost:4000/user-api/add-to-cart/${username}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(productObj)
          });
          if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          let result = await res.json();
          console.log(result);
      } catch (err) {
          console.log('Fetch error:', err);
      }
  }
  

    return (
      <div className='card text-center h-100 bg-light'>
        <div className="card-body d-flex flex-column justify-content-between">
          <img src={productObj.thumbnail} alt="" />
          <p className="fs-4 text-secondary">{productObj.title}</p>
          <p className="fs-6 text-danger">{productObj.brand}</p>
          <p className="lead">{productObj.description}</p>
          <p className="fs-3 text-warning">${productObj.price}</p>
          <button className="btn btn-success" onClick={() => addProductToCart(productObj)}>Add to cart</button>
        </div>
      </div>
    );
  }

  export default Product;
