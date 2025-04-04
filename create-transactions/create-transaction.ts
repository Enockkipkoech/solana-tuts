import {
	Connection,
	PublicKey,
	Transaction,
	SystemProgram,
	sendAndConfirmTransaction,
	clusterApiUrl,
	LAMPORTS_PER_SOL,
} from '@solana/web3.js';

import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import 'dotenv/config';

console.log(
	`🚀 🚀  Starting to create a transaction..."Transactions are atomic", `
);

// Notes
// Instructions - steps within a transaction
// new Transaction() - creates a new transaction
// add() - adds an instruction to the transaction
// helper functions - SystemProgram.transfer(),sendAndConfirmTransaction()

// TRANSFER SOL
const tranfer = async () => {
	const senderKeypair = getKeypairFromEnvironment('SENDER_SECRET_KEY');

	if (!senderKeypair) {
		throw new Error("Sender's Secret Not Found in .env");
	}

	const senderPublicKey = new PublicKey(senderKeypair.publicKey);
	console.log(`🔑 Sender Public Key: ${senderPublicKey}`);
	const receiverPublicKey = new PublicKey(process.env.RECEIVER_ADDRESS!);

	// cluster Connection
	const connection = new Connection(clusterApiUrl('devnet'));
	console.log('🌐 Connected to Solana Devnet. RPC :', connection.rpcEndpoint);

	// CREATE A TRANSACTION
	const transaction = new Transaction();
	const amount = 0.5; // Amount in SOL to transfer
	const amountInLamports = amount * LAMPORTS_PER_SOL; // Convert SOL to lamports

	// get balance
	const balLamports = await connection.getBalance(senderPublicKey);
	console.log(`Bal`, balLamports);

	if (balLamports < amountInLamports) {
		throw new Error(
			`Insufficient balance: ${
				balLamports / LAMPORTS_PER_SOL
			} SOL available, but ${amount} SOL requested.`
		);
	}

	const sendSolInstruction = SystemProgram.transfer({
		fromPubkey: senderPublicKey,
		toPubkey: receiverPublicKey,
		lamports: amountInLamports, // Convert SOL to lamports
	});

	// Add instruction to the transaction
	transaction.add(sendSolInstruction);

	//Execute the transaction
	console.log('📦 Transaction created, sending...');
	const signature = await sendAndConfirmTransaction(
		connection,
		transaction,
		[senderKeypair] // Signers
	);

	console.log(
		`Sent ${amount} SOL from ${senderPublicKey.toBase58()} to ${receiverPublicKey.toBase58()}.\n` +
			`Transaction Signature: ${signature}\n` +
			`Transaction confirmed! ✅\n` +
			`Check it out on the Solana Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet\n`
	);
};

tranfer()
	.then(() => {
		console.log('✅ Transaction completed successfully.');
	})
	.catch((error) => {
		console.error('❌ Transaction failed:', error);
	});
