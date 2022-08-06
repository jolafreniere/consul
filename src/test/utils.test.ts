import {expect} from 'chai';
import {Align} from '../types/view/Constants';

const utils = require('../utils/utils');
const data = [
    {name: "Juan", age: 21, gender: "M", birthDate: new Date(1990, 1, 1)},
    {name: "John", age: 22, gender: "M", birthDate: new Date("2000-01-01")},
    {name: "Amy", age: 30, gender: "F", birthDate: new Date("1992-04-05")},
    {name: "Robert", age: 42, gender: "M", birthDate: new Date("1980-01-01")}
]

describe("Aggregator Tests", () => {
    describe ("Name Aggregator Tests", () => {
        it("Should find one matching name that contains 'Amy'", () => {
            expect(utils.countPropertyContainsStrFx("name", "Amy")(data)).to.equal(1);
        })
        it("Should find two matching names containing the letter J", () => {
            expect(utils.countPropertyContainsStrFx("name", "J")(data)).to.equal(2);
        })
        it("Should find two names containing the letter o", () => {
            expect(utils.countPropertyContainsStrFx("name", "o")(data)).to.equal(2);
        })
        it("Should find one name that matches John", () => {
            expect(utils.countPropertyContainsStrFx("name", "John")(data)).to.equal(1);
        })
        it("Should find one name that matches John regardless of capitalization", () => {
            expect(utils.countPropertyContainsStrFx("name", "joHN")(data)).to.equal(1);
        })
        it("Should not find any names", () => {
            expect(utils.countPropertyContainsStrFx("name", "Z")(data)).to.equal(0);
        });
        it("Should find one female", () => {
            expect(utils.countPropertyContainsStrFx("gender", "F")(data)).to.equal(1);
        });
        it("Should find three males", () => {
            expect(utils.countPropertyContainsStrFx("gender", "M")(data)).to.equal(3);
        });
        it("Should find three males by ignoring capitalization", () => {
            expect(utils.countPropertyContainsStrFx("gender", "m")(data)).to.equal(3);
        });
    });
    describe ("Count All Tests", () => {
        it("Should find 4 records", () => {
            expect(utils.countAllFx()(data)).to.equal(4);
        })
        it("Should find 0 records", ()=>{
            expect(utils.countAllFx()([])).to.equal(0);
        })
    });
});


describe ("Date Formatter Tests", () => {
    it("Should format the date correctly", () => {
        expect(utils.formatDate(new Date(1990, 1, 1))).to.equal("01-01 00:00:00");
    })
    it ("Should format the date correctly", () => {
        let date = new Date(1999, 2, 3);
        date.setHours(9);
        date.setMinutes(34);
        date.setSeconds(56);
        expect(utils.formatDate(date)).to.equal("02-03 09:34:56");
    });
});

describe ("Alignment Tests", () => {
    it("Should align the name to left", () => {
        let alignedValue = utils.addMargins(Align.Left, "Juan", 10);
        expect(alignedValue.length).to.equal(10);
        expect(alignedValue).to.equal(" Juan     ");
    });
    it("Should align the name to the right", () => {
        let alignedValue = utils.addMargins(Align.Right, "Juan", 10);
        expect(alignedValue.length).to.equal(10);
        expect(alignedValue).to.equal("     Juan ");
    });
    it("Should align the name to the center", () => {
        let alignedValue = utils.addMargins(Align.Center, "Juan", 10);
        expect(alignedValue.length).to.equal(10);
        expect(alignedValue).to.equal("   Juan   ");
    });
    it("Should align the name to the center", () => {
        let alignedValue = utils.addMargins(Align.Center, "Juan", 20);
        expect(alignedValue.length).to.equal(20);
        expect(alignedValue).to.equal("        Juan        ");
    });

});