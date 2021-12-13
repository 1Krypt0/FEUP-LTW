class Header {
  show() {
    return `<h1> Mancala: The best game you never heard of</h1>
        <nav>
            <ul>
                <li>
                    <a href="#">Logout</a>
                </li>
            </ul>
        </nav>`;
  }
}

const main = document.getElementById("main");
const header = document.createElement('header');
header.innerHTML = new Header().show();
main.appendChild(header);
