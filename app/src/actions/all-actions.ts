import { program, counterPDA } from "../anchor/setup";
import { PublicKey } from '@solana/web3.js';

export const getProducts = async (address?: PublicKey, index?: number) => {
  const x = await program.account.allProducts.fetch(counterPDA)
  for (let i = 0; i < x.productsList.length; i++) {
    (x.productsList[i] as ItemStruct ).index = i;
  }

  if(index){
    for (let i = 0; i < x.productsList.length; i++) {
        const element: ItemStruct = x.productsList[i];
        if(element.index === index) return [ x.productsList[i] ]
    }
  }

  if(address){
    const mine = []
    for (let index = 0; index < x.productsList.length; index++) {
        if(address.toString() === x.productsList[index].ownerAddress.toString()) mine.push( x.productsList[index] )
    }
    return mine;
  }

  return x.productsList as ItemStruct[];

}


export type ItemStruct = {
    imageUrl: string;
    priceInSol: number; // Using number to represent f64
    ownerAddress: PublicKey;
    listed: boolean;
    index?: number
  }; 