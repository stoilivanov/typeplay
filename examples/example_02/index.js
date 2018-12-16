import TypePlay from "./../../dist/cjs/TypePlay";

(function() {
    const element = document.getElementById("TypeContainer");
    let typer = new TypePlay(element, {typeSpeed: {min: 90, max: 240}});

    typer
        .wait(2500)
        .eraseAll()
        .type("Helo World!")
        .erase(8)
        .wait(70)
        .type("lo World!")
        .wait(620)
        .type(" Check my source code..")
        .wait(10000)
        .repeat()
        .play();

})();