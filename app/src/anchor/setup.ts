import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, Ecom } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const programId = new PublicKey("9D31LUnoNS7th12sKKZ1M8sYrhUbXaRK5RYQZ9D6tads"); 

const connection = new Connection(
  clusterApiUrl("testnet"), 
  // 'http://127.0.0.1:8899',
  "confirmed"
);

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<Ecom>(IDL, programId, {
  connection,
});

// Derive a PDA for the counter account, using "counter" as the seed.
// We'll use this to update the counter on-chain.
export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("ecom4")],
  program.programId
);

// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
export type CounterData = IdlAccounts<Ecom>["allProducts"];