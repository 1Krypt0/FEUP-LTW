export class SeedView {
    render() {
        const seed = document.createElement("div");
        seed.classList.add("seed");
        let randAngle = parseInt(Math.random() * 360);
        seed.style.transform = "rotate(" + randAngle + "deg)";
        return seed;
    }
}
