const { expect } = require("chai");
const { describe } = require("mocha");

describe("Horse and Farmer", function () {
  let horse;
  let farmer;
  beforeEach(async function () {
    // Deploy the StringComparer library
    const StringComparer = await ethers.getContractFactory("StringComparer");
    const stringComparer = await StringComparer.deploy();

    // Deploy Horse and Farmer
    const Horse = await ethers.getContractFactory("Horse", {
      libraries: {
        StringComparer: stringComparer.target,
      },
    });
    horse = await Horse.deploy("White Horse");

    const Farmer = await ethers.getContractFactory("Farmer");
    farmer = await Farmer.deploy();
  });

  it("Horse has the correct name", async function () {
    expect(await horse.getName()).to.equal("White Horse");
  });

  it("Horse can sleep", async function () {
    expect(await horse.sleep()).to.equal("Z-z-z-z-z...");
  });

  it("Horse can eat plant", async function () {
    expect(await horse.eat("plant")).to.equal("Animal eats plant");
  });

  it("Horse cannot eat meat, not-food, plastic", async function () {
    expect(await horse.eat("meat")).to.equal("Can only eat plant");
    expect(await horse.eat("not-food")).to.equal("Can only eat plant");
    expect(await horse.eat("plastic")).to.equal("Can only eat plant");
  });

  it("Farmer can call Horse, Horse responds correctly", async function () {
    expect(await farmer.call(horse.target)).to.equal("Igogo");
  });

  it("Farmer can feed Horse with plant", async function () {
    expect(await farmer.feed(horse.target, "plant")).to.equal(
      "Animal eats plant"
    );
  });

  it("Farmer cannot feed Horse with anything else", async function () {
    expect(await farmer.feed(horse.target, "meat")).to.equal(
      "Can only eat plant"
    );
    expect(await farmer.feed(horse.target, "plastic")).to.equal(
      "Can only eat plant"
    );
    expect(await farmer.feed(horse.target, "fingers")).to.equal(
      "Can only eat plant"
    );
  });
});

describe("Dog and Farmer", function () {
  let dog;
  let farmer;
  beforeEach(async function () {
    // Deploy StringComparer
    const StringComparer = await ethers.getContractFactory("StringComparer");
    const stringComparer = await StringComparer.deploy();
    // Deploy  Dog and Farmer
    const Dog = await ethers.getContractFactory("Dog", {
      libraries: {
        StringComparer: stringComparer.target,
      },
    });
    dog = await Dog.deploy("Sharik");

    const Farmer = await ethers.getContractFactory("Farmer");
    farmer = await Farmer.deploy();
  });

  it("Dog has the correct name", async function () {
    expect(await dog.getName()).to.equal("Sharik");
  });

  it("Dog can sleep", async function () {
    expect(await dog.sleep()).to.equal("Z-z-z-z-z...");
  });

  it("Dog can eat plant", async function () {
    expect(await dog.eat("plant")).to.equal("Animal eats plant");
  });

  it("Dog can eat meat", async function () {
    expect(await dog.eat("meat")).to.equal("Animal eats meat");
  });

  it("Dog cannot eat not-food, plastic, chocolate", async function () {
    expect(await dog.eat("not-food")).to.equal("Can only eat meat or plant");
    expect(await dog.eat("chocolate")).to.equal("Can only eat meat or plant");
  });

  it("Farmer can call Dog, Dog responds correctly", async function () {
    expect(await farmer.call(dog.target)).to.equal("Woof");
  });

  it("Farmer can feed Dog with meat or plant", async function () {
    expect(await farmer.feed(dog.target, "meat")).to.equal("Animal eats meat");
    expect(await farmer.feed(dog.target, "plant")).to.equal(
      "Animal eats plant"
    );
  });

  it("Farmer cannot feed Dog with not-food, plastic or anything else", async function () {
    expect(await farmer.feed(dog.target, "not-food")).to.equal(
      "Can only eat meat or plant"
    );
    expect(await farmer.feed(dog.target, "plastic")).to.equal(
      "Can only eat meat or plant"
    );
  });
});
