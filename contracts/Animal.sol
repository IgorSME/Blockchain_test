// SPDX-License-Identifier: MIT

pragma solidity >=0.4.16 <0.9.0;
import "./StringComparer.sol";



interface Living {
    function eat(string memory food) external returns (string memory);
}

contract HasName {
    string internal _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() public view returns (string memory) {
        return _name;
    }
}

abstract contract Animal is Living {
    function eat(string memory food) pure virtual public returns (string memory) {
        return string.concat("Animal eats ", food);
    }

    function sleep() pure virtual public returns (string memory){
        return "Z-z-z-z-z...";
    }

    function speak() pure virtual public returns (string memory){
        return "...";
    }
}

abstract contract Herbivore is Animal, HasName {
    string constant PLANT = "plant";

    function eat(string memory food) pure virtual override public returns (string memory) {

        if (StringComparer.compare(food, PLANT)) {
            return super.eat(food);
        } else {
            return "Can only eat plant";
        }
    }
}

contract Cow is Herbivore {
    constructor(string memory name) HasName(name) {
    }

    function speak() pure override public returns(string memory) {
        return "Mooo";
    }
}

contract Horse is Herbivore {
    constructor(string memory name) HasName(name) {
    }
 
    function speak() pure override  public returns (string memory) {
        return "Igogo";
    }
}

contract Farmer {
    function feed(address animal, string memory food) pure public returns (string memory) {
        return Animal(animal).eat(food);
    }

    function call(address animal) pure public returns (string memory) {
        return Animal(animal).speak();
    }
}

abstract contract MeatEaters is Animal, HasName {
    string constant MEAT = "meat";

 

    function eat(string memory food) pure virtual override public returns (string memory) {
        if (!StringComparer.compare(food, MEAT)) {
            return "Can only eat meat";
        }
        return super.eat(food);
    }
}

abstract contract MeatAndPlantEaters is Animal, HasName {
    string constant MEAT = "meat";
    string constant PLANT = "plant";

    function eat(string memory food) pure override public returns (string memory) {
        if (StringComparer.compare(food, MEAT) || StringComparer.compare(food, PLANT)) {
            return super.eat(food);
        } else {
            return "Can only eat meat or plant";
        }
    }
}

contract Wolf is MeatEaters{
    constructor(string memory name) HasName(name) {
    }

    function speak() pure override public returns (string memory) {
        return "Awoo";
    }
}

contract Dog is MeatAndPlantEaters{
    constructor(string memory name) HasName(name) {
    }
    

    function speak() pure override public returns (string memory) {
        return "Woof";
    }
}