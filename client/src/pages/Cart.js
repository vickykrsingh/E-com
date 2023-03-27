import React from 'react'
import Layout from './../components/Layout/Layout';
import AppleWatch from '../../src/Apple Watch Ultra.jpg'
import { useCart } from '../context/CartContext';

function Cart() {
  const [cart,setCart] = useCart()
  const handleRemoveCart = (event,id) => {
    event.preventDefault();
    // console.log(id);
    const cartData = cart.filter((c)=>c._id!==id)
    setCart(cartData)
  }
  return (
    <Layout>
        <div className="container-fluid">
          <div className="row">
            { cart.length===0 ? <div className='d-flex align-items-center justify-content-center' style={{width:'100%',height:'100vh'}}><h3 className='text-center text-info'>No item in Your Cart</h3></div> : <h4 className='text-success my-4'>{`You Have ${cart.length} items in Your Cart , Please Check it Out`}</h4> }
            { cart?.map((p)=>(
              <div className="col-md-9 p-3" key={p._id} >
              <div className="card d-flex flex-row p-2">
                <div className="card-image d-flex align-items-center justify-content-center">
                  <img src={`/api/v1/product/product-photo/${p._id}`} alt="Apple watch" width={'100px'} className="rounded-2" />
                </div>
                <div className="card-detail ms-4">
                  <h5 className='m-0 p-0'>{p.name}</h5>
                  <p className='m-0 p-0'>{p.description.substring(0,30)}...</p>
                  <p className='m-0 p-0'><b>Price : {p.price}$</b></p>
                  <button className='btn btn-danger btn-sm my-1' onClick={(event)=>handleRemoveCart(event,p._id)}>Remove</button>
                </div>
              </div>
            </div>
            )) }
            <div className="col-md-3">
              <h2>This is payment system</h2>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Cart