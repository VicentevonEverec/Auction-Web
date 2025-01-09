async function main() {
    const Puja = await ethers.getContractFactory("Puja");
    console.log("Deploying Puja...");

    const puja = await Puja.deploy();
    console.log("Puja address:", puja.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });