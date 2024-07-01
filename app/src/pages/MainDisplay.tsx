import { useEffect, useState } from 'react'
import { getProducts, ItemStruct } from '../actions/all-actions';
import { Link } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay-ts';

export default function MainDisplay() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then((x) => {
      setLoading(true)
      setAllProducts(x);
      console.log(x);
      setLoading(false)
    }).catch(e => {
      console.warn('error: ', e)
      alert('Some error occured.')
    })
  }, [])

  const [allProducts, setAllProducts] = useState<ItemStruct[]>([])

  return (
    <div>
      <LoadingOverlay
        active={loading}
        spinner
        text='Loading your content...'
        fadeSpeed={0}
      >
        <div className="grid-container">

          {allProducts.map(x => <>
            <div className='grid-item'>
              <Link to={`/product/${x.index}`}>
                <img src={x.imageUrl} style={{ width: '100%', height: 'auto' }} />
              </Link>
              <p>{x.listed ? <>{x.priceInSol} {' solana'}</> : 'not listed'}</p>
            </div>

          </>)}

        </div>
      </LoadingOverlay>
    </div>
  )
}
