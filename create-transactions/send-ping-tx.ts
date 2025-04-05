// TODOs
// 1. create tx
// 2. create instruction
// 3. Add instruction to transaction
// 4. Send transaction

import * as web3 from '@solana/web3.js';
import {
	getKeypairFromEnvironment,
	airdropIfRequired,
} from '@solana-developers/helpers';
import 'dotenv/config';

// Ensure the environment variables are loaded
if (!process.env.SENDER_SECRET_KEY) {
	console.error('Error: SENDER_SECRET_KEY is not set in the environment.');
	process.exit(1);
}

const payerKeypair = getKeypairFromEnvironment('SENDER_SECRET_KEY');
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

// ACCOUNTS
const PING_PROGRAM_ID = new web3.PublicKey(
	'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
);

const PING_DATA_ADDRESS_ID = new web3.PublicKey(
	'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'
);

const sendPingTx = async () => {
	// AIRDROP ONLY ON DEVNET
	const newBal = await airdropIfRequired(
		connection,
		payerKeypair.publicKey,
		10 * web3.LAMPORTS_PER_SOL, // airdrop 10 SOL
		10 * web3.LAMPORTS_PER_SOL // airdrop 10 SOL
	);
	if (!newBal) {
		console.error('Airdrop failed or not required.');
		return;
	}
	console.log(
		`🤓 Airdrop successful! New balance: ${newBal / web3.LAMPORTS_PER_SOL} SOL`
	);

	// CREATE TRANSACTION
	const transaction = new web3.Transaction();
	// CREATE INSTRUCTION
	const pingInstruction = new web3.TransactionInstruction({
		keys: [
			{
				pubkey: PING_DATA_ADDRESS_ID,
				isSigner: false,
				isWritable: true,
			},
		],
		programId: PING_PROGRAM_ID,
		data: Buffer.from([]), // No data needed for a simple ping
	});

	// Add the instruction to the transaction
	transaction.add(pingInstruction);

	// Set the fee payer & send the transaction
	const signature = await web3.sendAndConfirmTransaction(
		connection,
		transaction,
		[payerKeypair] // Signers
	);
	console.log(
		`\n 🤓 Ping transaction sent! Signature: ${signature}\nTransaction on SOLSCAN: https://explorer.solana.com/tx/${signature}?cluster=devnet`
	);
};

sendPingTx()
	.then(() => {
		console.log('🤓 VIOLA!! Ping transaction sent successfully!');
	})
	.catch((error) => {
		console.error('Error sending ping transaction:', error);
	});
