import {
	Connection,
	clusterApiUrl,
	PublicKey,
	LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import 'dotenv/config';

const solanaReads = async () => {
	const walletAddress = process.env.WALLET_ADDRESS;
	if (!walletAddress) {
		console.error('WALLET_ADDRESS environment variable is not set.');
		return;
	}
	const connection = new Connection(clusterApiUrl('devnet'));

	console.log(`Connected! ✅ RPC URI`, connection.rpcEndpoint);
	const accountAddr = new PublicKey(walletAddress);
	const bal = await connection.getBalance(accountAddr);
	console.log(`Account ${accountAddr.toBase58()} balance: ${bal} lamports`);
	const balanceInSol = bal / LAMPORTS_PER_SOL; // Convert lamports to SOL

	console.log(
		`Account ${accountAddr.toBase58()} balance: ${balanceInSol.toFixed(4)} SOL`
	);
};

solanaReads();
