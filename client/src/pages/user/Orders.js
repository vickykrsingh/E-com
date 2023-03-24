import React from 'react'
import Layout from './../../components/Layout/Layout';
import UserMenu from './UserMenu';

function Orders() {
  return (
    <Layout>
        <div className='text-white container-fluid'>
            <div className="row pt-5">
              <div className="col-lg-3">
                <UserMenu />
              </div>
              <div className="col-lg-9">
                <h2 className='text white'>Orders</h2>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders