import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Ecom } from "../target/types/ecom";
import { PublicKey } from "@solana/web3.js";

const images = [
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S12-R24D27_NECKTIESATINDRESS_IVORY-24218-BearePark-0793.webp?alt=media&token=fee0100e-76ff-424a-8789-b1129d66d0b8',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S17-CORE_SILKWRAPDRESS_BLACK-24218-BearePark-0235.webp?alt=media&token=09ec2cd8-8cfe-45cd-9aef-1819aee4a9de',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S21-SS24P02_SLOUCHTROUSER_BLACK-24206-BearePark-0885.webp?alt=media&token=cbf07885-ff2e-4eae-a866-ab10c57d3709',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S36-SS24S05_WOOLSILKMINISKIRT_BLACK-24206-BearePark-0785.webp?alt=media&token=689c6d2b-9297-4011-a34f-e54104f4cf30',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S37-SS24S05_WOOLSILKMINISKIRT_IVORY-24206-BearePark-0640.webp?alt=media&token=154c0b90-927b-41c9-b874-98f9ac792a52',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S50-R24S03_WOOLTWILLCOLUMNSKIRT_CHARCOAL-24218-BearePark-0414.webp?alt=media&token=44852b9a-4244-4486-8846-13d1d3c105d0',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S8-SS24D09_STRAPLESSMIDIDRESS_IVORY-24206-BearePark-0097.webp?alt=media&token=eaa3f6ad-7ab7-4d46-a645-845760aafd3d',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S8-R24D22_GTTASYMMETRICTIENECKDRESS_BLACK-24218-BearePark-0272.webp?alt=media&token=ea56f202-ee04-4431-b371-0e7396a56620',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S7-R24_D11_LAYERED_ASYMMETRIC_DRESS_BLUEBELL-24218-Beare_Park-0083.webp?alt=media&token=c7f71676-abe9-46e8-8cd2-fad66cf5e9a7',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S6-R24D11_LAYEREDASYMMETRICDRESS_BURNTSIENNA-24218-BearePark-0118.webp?alt=media&token=0721f70f-38be-43e3-8ee2-10de28313430',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S5-SS24D08_SILKSATINGOWN_CHOCOLATE-24206-BearePark-0189_93dddfc6-9209-484c-ac7b-f2834762e387.webp?alt=media&token=154a5fd9-07b0-4259-8696-fcc0fb0fe577',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S47-R24P06_TAILOREDSHORT_NAVY-24218-BearePark-0834.webp?alt=media&token=0548de2e-12cd-4683-a574-018da5f44132',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S40-SS24S06_PLEATWRAPLONGSKIRT_WHITE-24206-BearePark-0747.webp?alt=media&token=1570de7b-ed60-4709-b484-66bb20698bca',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S34-SS24S04_PLEATWRAPMICROSKIRT_BLUE-24206-BearePark-0721.webp?alt=media&token=610769fe-16e2-4e05-a3ac-73e1f0ba9610',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S3-SS24D05_WOOLSILKMINIDRESS_BLACK-24206-BearePark-0827.webp?alt=media&token=275880ab-a316-4300-9150-6191625734c1',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S27-SS24T06_SLIMLINEBLOUSE_CHOCOLATE-24206-BearePark-0445.webp?alt=media&token=97efe046-1842-4982-b805-778d9f66a6f4',
  'https://firebasestorage.googleapis.com/v0/b/solana-ecom.appspot.com/o/S10-SS24D13_BIASSLIPDRESS_BURGUNDY-24206-BearePark-4716.webp?alt=media&token=d73fe4e1-1d6a-4a8a-8fa3-e17dee3bcb12',
]

describe("ecom", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();

  const program = anchor.workspace.Ecom as Program<Ecom>;

  const wallet = provider.wallet as anchor.Wallet;
  const connection = provider.connection;

  const nonAdmin = anchor.web3.Keypair.generate();

  const [counterPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("ecom4")],
    program.programId
  );

  // JUST NEED TO INITIALIZE ONCE!

  it("Is initialized!", async () => {
    // Add your test here.

    const txSig = await program.methods.initialize().accounts({
      products: counterPDA,
      user: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([wallet.payer]).rpc();
    // Even though you don't explicitly pass the PDA here, 
    // Anchor calculates it based on the seeds defined in your Rust code.

    console.log(`Transaction Signature: ${txSig}`);

  });

  it("Adds a product", async () => {
    await program.methods.addProduct( images[0], 0.1 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[1], 0.12 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[2], 0.11 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[3], 0.08 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[4], 0.05 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[5], 0.01 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[6], 0.02 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[7], 0.12 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[8], 0.13 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[9], 0.08 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[10], 0.02 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[11], 0.12 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[12], 0.2 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[13], 0.1 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[14], 0.12 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[15], 0.1 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
    await program.methods.addProduct( images[16], 0.13 ).accounts({ products: counterPDA, user: wallet.publicKey }).rpc();
  });

  // it("Is PURCHASES", async () => {
  //   // const productsAccount = new anchor.web3.PublicKey("YOUR_PRODUCTS_ACCOUNT_PUBLIC_KEY");
  //   const buyerAccount = provider.wallet.publicKey;
  //   const productIndex = 2; // The index of the product to purchase
    
  //   const transactionSignature = await program.methods.purchaseProduct(
  //     new anchor.BN(productIndex)
  //   )
  //   .accounts({
  //     buyer: buyerAccount,
  //     products: counterPDA,
  //     // to: wallet.publicKey, // self owner
  //     to: nonAdmin.publicKey, // pay to some thats not user 
  //     systemProgram: anchor.web3.SystemProgram.programId,
  //   })
  //   .rpc();

  //   console.log('sigature', transactionSignature);
    
    
  // });


  // it("List a product", async () => {
  //   const productIndex = 1;
  //   const transactionSignature = await program.methods.listProduct(
  //     new anchor.BN(productIndex)
  //   ).accounts({
  //     products: counterPDA,
  //     user: wallet.publicKey
  //   })
  //   // .signers([nonAdmin])
  //   .rpc();
  //   console.log(`Transaction Signature of listing a product: ${transactionSignature}`);
  // });


  // it("De-List a product", async () => {
  //   const productIndex = 1;
  //   const transactionSignature = await program.methods.delistProduct(
  //     new anchor.BN(productIndex)
  //   ).accounts({
  //     products: counterPDA,
  //     user: wallet.publicKey
  //   }).rpc();
  //   console.log(`Transaction Signature of listing a product: ${transactionSignature}`);
  // });

  // it("Change price", async () => {
  //   const productIndex = 0;
  //   const newPrice = 0.5
  //   const transactionSignature = await program.methods.updateProductPrice(
  //     new anchor.BN(productIndex),
  //     newPrice
  //   ).accounts({
  //     products: counterPDA,
  //     user: wallet.publicKey
  //   })
  //   // .signers([nonAdmin])
  //   .rpc();
  //   console.log(`Transaction Signature of listing a product: ${transactionSignature}`);
  // });

  it("Is fetches products!", async () => {

    const accountData = await program.account.allProducts.fetch(counterPDA);
    console.log(accountData);

  });



});
