const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require("@solana/web3.js")

const walletBalance = (connection, wallet) =>
    connection.getBalance(wallet.publicKey).then(balance => balance / LAMPORTS_PER_SOL)

const airDropSol = (connection, wallet, amount) =>
    connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL)
        .then(fromAirDropSignature => connection.confirmTransaction(fromAirDropSignature))

const main = async () => {
    const wallet = new Keypair()
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    console.log(await walletBalance(connection, wallet))

    await airDropSol(connection, wallet, 2)
    
    console.log(await walletBalance(connection, wallet))
}

main()