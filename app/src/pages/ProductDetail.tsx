import { AnchorProvider } from '@coral-xyz/anchor'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import * as anchor from "@coral-xyz/anchor";
import { counterPDA, program } from "../anchor/setup";
import { useParams } from 'react-router-dom';
import { getProducts, ItemStruct } from '../actions/all-actions';
import LoadingOverlay from 'react-loading-overlay-ts';

export default function ProductDetail() {

    const [provider, setProvider] = useState<AnchorProvider | null>(null)
    const wallet = useAnchorWallet()
    const { connection } = useConnection();
    const [isLoading, setIsLoading] = useState(true);
    const { index } = useParams();

    const [openSaleBo, setOpenSaleBo] = useState(false)
    const [priceShown, setPriceShown] = useState(0)

    const { connected, publicKey, sendTransaction } = useWallet()

    useEffect(() => {
        if (!index) return
        // setIsLoading(true)
        getProducts(undefined, Number(index)).then((x) => {
            setAllProduct(x[0]);
            setPriceShown(x[0].priceInSol);
            setIsLoading(false)
        })
    }, [index])

    const [allProduct, setAllProduct] = useState<ItemStruct>()


    useEffect(() => {
        const setup = async () => {
            if (wallet && publicKey && connected) {
                const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "finalized" });
                anchor.setProvider(provider);
                setProvider(provider);
            }
        };
        setup();
    }, [publicKey, connected]);

    const updatePrice = async () => {
        if (!publicKey || !priceShown || !index) return;
        setIsLoading(true);

        console.log(publicKey, priceShown, index);


        let priceToEnter: number = priceShown

        if (!String(priceToEnter).includes('.')) {
            priceToEnter = Number(String(priceToEnter) + '.0')
        }

        if (String(priceShown).length > 8) {
            alert('Price too long')
            return;
        }

        console.log(index, priceToEnter);


        const transaction = await program.methods.updateProductPrice(
            new anchor.BN(Number(index)),
            priceToEnter
        )
            .accounts({
                products: counterPDA,
                user: provider?.wallet.publicKey,
            })
            .transaction();

        const transactionSignature = await sendTransaction(
            transaction,
            connection
        )

        if (transactionSignature) {
            alert('Success.')
            window.location.reload();
        }

    }

    const purchase = async () => {
        if (!connected) {
            alert('Connect your wallet first.')
            return;
        }

        if (!publicKey || !index || !allProduct) return;

        setIsLoading(true);

        // const productOwner = new anchor.web3.PublicKey("GeTHGKMyKwcr5LWqM645uC4pZLEBhAfm4QGw9o5RSBjk")

        try {
            const transaction = await program.methods.purchaseProduct(
                new anchor.BN(Number(index))
            )
                .accounts({
                    systemProgram: anchor.web3.SystemProgram.programId,
                    products: counterPDA,
                    buyer: provider?.wallet.publicKey,
                    to: allProduct?.ownerAddress
                })
                .transaction();

            const transactionSignature = await sendTransaction(
                transaction,
                connection
            );

            console.log(`View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`);
            setIsLoading(false)

            if (transactionSignature) {
                alert('Success.')
                window.location.reload();
            }
        } catch (error) {
            setIsLoading(false);
            alert('Some error occured. Make sure your wallet is on testnet.')
            console.log(error);
        }

    };

    const toggleListing = async () => {
        if (!publicKey || !index || !allProduct) return;

        setIsLoading(true);

        if (allProduct.listed) {
            // means we delist
            const transaction = await program.methods.delistProduct(
                new anchor.BN(Number(index))
            )
                .accounts({
                    products: counterPDA,
                    user: provider?.wallet.publicKey,
                })
                .transaction();

            const transactionSignature = await sendTransaction(
                transaction,
                connection
            );

            if (transactionSignature) {
                alert('Success.')
                window.location.reload();
            }
        }
        else {
            // means we list it
            const transaction = await program.methods.listProduct(
                new anchor.BN(Number(index))
            )
                .accounts({
                    products: counterPDA,
                    user: provider?.wallet.publicKey,
                })
                .transaction();

            const transactionSignature = await sendTransaction(
                transaction,
                connection
            );

            if (transactionSignature) {
                alert('Success.')
                window.location.reload();
            }

        }

        setIsLoading(false)


    };

    return (
        <div style={{ minHeight: '90vh' }}>

            <LoadingOverlay
                active={isLoading}
                spinner
                text={'Please wait...'}
                fadeSpeed={0}
            >
                {allProduct ? <div className='grid-container' style={{ margin: 'auto', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', marginTop: '28px' }}>
                    <div className='grid-item'>
                        <img src={allProduct.imageUrl} style={{ maxHeight: '85vh' }} />
                    </div>
                    <div className='grid-item' style={{ textAlign: 'left', fontSize: '20px' }}>
                        <p>
                            {allProduct.priceInSol} solana
                        </p>
                        <p>
                            {allProduct.listed ? 'Listed for sale.' : 'Not listed for sale.'}
                        </p>
                        <p>
                            {allProduct.ownerAddress.toString() === publicKey?.toString() ? 'Owned by you.' : `Owned by ${allProduct.ownerAddress.toString()}`}
                        </p>
                        <>
                            {allProduct.ownerAddress.toString() === publicKey?.toString() ? <p onClick={() => setOpenSaleBo(!openSaleBo)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Edit Price ✏️</p> : ''}
                        </>
                        {openSaleBo ? <p>
                            <input min={0} value={priceShown} onChange={e => setPriceShown(e.target.value as any)} style={{ fontSize: '22px', padding: '10px', width: '120px' }} type='number' />
                            {' '}<button onClick={updatePrice} disabled={!priceShown || Number(priceShown) === 0 || (Number(priceShown) === Number(allProduct.priceInSol))} style={{ color: 'white' }} >Update</button>
                        </p> : ''}
                        <>
                            {allProduct.ownerAddress.toString() === publicKey?.toString() ? <p onClick={toggleListing} style={{ textDecoration: 'underline', cursor: 'pointer' }}> {allProduct.listed ? 'Remove item for sale' : 'Open for sale'} ✏️</p> :
                                <button onClick={purchase} style={{ color: 'white' }} >Purchase</button>
                            }
                        </>

                    </div>
                </div> : ""}
            </LoadingOverlay>

        </div>
    )
}
