const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const {
    experimentalAddHardhatNetworkMessageTraceHook,
} = require("hardhat/config")

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        // or expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update the fav. number when we call the store function", async function () {
        const expectedValue = "5"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should add a new person with a favorite number", async function () {
        const expectedName = "Adam"
        const expectedNumber = "7"

        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedNumber
        )
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.people(0)

        assert.equal(currentValue.name, expectedName)
        assert.equal(currentValue.favoriteNumber.toString(), expectedNumber)
        console.log(`This is the people array: ${currentValue}`)
        console.log(
            `This is the addPerson func: ${expectedNumber},${expectedName}`
        )
    })
})
