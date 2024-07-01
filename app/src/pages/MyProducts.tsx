import { useEffect, useState } from 'react'
import { getProducts, ItemStruct } from '../actions/all-actions';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

export default function MyProducts() {

    const {connected, publicKey} = useWallet()

    useEffect(() => {
        if(!connected || !publicKey) return;
        getProducts(publicKey).then( (x) => {setAllProducts(x); console.log(x); 
        } )
    }, [connected, publicKey])

    const [allProducts, setAllProducts] = useState<ItemStruct[]>([])

    // const t = 'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S10-SS24D13_BIASSLIPDRESS_BURGUNDY-24206-BearePark-4716.webp?alt=media&token=d73fe4e1-1d6a-4a8a-8fa3-e17dee3bcb12'
    

  return (
    <>
    <div>My Products</div>
    
    <div>
        <div className="grid-container">

        {allProducts.map(x=><>
                <div className='grid-item'>
                    <Link to={`/product/${x.index}`}>
                    <img src={x.imageUrl} style={{width:'100%', height: 'auto'}} />
                    </Link>
                    <p>{x.listed ? <>{x.priceInSol} {' Solana'}</> : 'not listed'}</p>
                </div>
                
        </>)}

        </div>
    </div>
    </>
    
  )
}
