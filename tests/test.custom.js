
describe("TypePlay Base Class Constructor", function() {
    try {
        let tp = new TypePlayBase();
    } catch (e) {
        it("Should throw an error when no DOM element is passed", function() {
            chai.expect(e).to.be.an('error');
            chai.expect(e.message).to.equal('When invoking a new instance of TypePlay you must specify a DOM element!');
        });
    }
});

describe("TypePlay Base Class", function() {
    this.timeout(10000);

    let element = document.createElement('div');
    let typer = new TypePlayBase(element);
    // let typer = typerWrap.typer;

    before(async function() {
        await typer.type({text: 'the brown fox jumped over the lazy dog'});
    });

    describe("Typing a string", function(){
        it('String left of cursor should be 38 characters long', function() {
            chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(38);
        });

        it('String left of cursor should be equal to "the brown fox jumped over the lazy dog"', function() {
            chai.expect(typer.textNodeL.innerHTML).to.equal('the brown fox jumped over the lazy dog');
        });
    })

    describe("Navigating a string", function(){

        describe("navigateLeft()", function() {
            before(async function() {
                await typer.navigateLeft();
            });

            it('String left of cursor should be 37 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(37);
            });
            
            it('String right of cursor should be 1 characters long', function() {
                chai.expect(typer.textNodeR.innerHTML).to.have.lengthOf(1);
            });
        });

        describe("navigateLeft(moves = 5)", function() {
            before(async function() {
                await typer.navigateLeft(5);
            });

            it('String left of cursor should be 32 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(32);
            });
            
            it('String right of cursor should be 6 characters long', function() {
                chai.expect(typer.textNodeR.innerHTML).to.have.lengthOf(6);
            });
        });

        describe("navigateRight()", function() {
            before(async function() {
                await typer.navigateRight();
            });

            it('String left of cursor should be 33 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(33);
            });
            
            it('String right of cursor should be 5 characters long', function() {
                chai.expect(typer.textNodeR.innerHTML).to.have.lengthOf(5);
            });
        });

        describe("navigateRight(moves = 3)", function() {
            before(async function() {
                await typer.navigateRight(3);
            });

            it('String left of cursor should be 36 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(36);
            });
            
            it('String right of cursor should be 2 characters long', function() {
                chai.expect(typer.textNodeR.innerHTML).to.have.lengthOf(2);
            });
        });

    });

    describe("Erasing", function(){

        describe("erase() - erase single character", function() {
            before(async function() {
                await typer.erase();
            });

            it('String left of cursor should be 35 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(35);
            });
        });

        describe("erase(moves = 3) - erase 3 more characters", function() {
            before(async function() {
                await typer.erase(3);
            });

            it('String left of cursor should be 32 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(32);
            });
        });

        describe("eraseAll() - erase all characters before the cursor", function() {
            before(async function() {
                await typer.eraseAll();
            });

            it('String left of cursor should be 0 characters long', function() {
                chai.expect(typer.textNodeL.innerHTML).to.have.lengthOf(0);
            });
        });

    })

});

