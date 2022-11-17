import { ethers } from "hardhat";
import { WavePortal__factory, WavePortal } from "../typechain-types";

const main = async () => {
    const [owner, randomPerson] = await ethers.getSigners()
    const waveContractFactory: WavePortal__factory = await ethers.getContractFactory("WavePortal");
    const waveContract: WavePortal = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("owner of the contract is", owner.address);

    const waveTxn = await waveContract.wave()
    console.log("waved by owner", owner.address);
    await waveTxn.wait();

    const waveTxn2 = await waveContract.connect(randomPerson).wave()
    await waveTxn2.wait();
    console.log("waved by random address", randomPerson.address);

    await waveContract.getTotalWaves()

};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
