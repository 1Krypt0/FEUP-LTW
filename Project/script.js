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
const header = document.createElement("header");
header.innerHTML = new Header().show();
main.appendChild(header);

let Mancala = (function () {
    "use strict";

    /**
     * Initialise class
     * @param {Game} game
     */
    let Mancala = function (game) {
        this.game = game;

        this.current_pits = [4, 4, 4, 4, 4, 4];
        this.other_pits = [4, 4, 4, 4, 4, 4];
        this.current_store = 0;
        this.other_store = 0;
    };

    /**
     * Exchange the players' positions on the board
     */
    Mancala.prototype.flip_board = function () {
        let current_pits = this.current_pits;
        this.current_pits = this.other_pits;
        this.other_pits = current_pits;

        let current_store = this.current_store;
        this.current_store = this.other_store;
        this.other_store = current_store;
    };

    /**
     * Retrieve the amount of stones in a pit
     * @param  {Number} pit The pit number
     * @return {Number}     The amount of stones
     */
    Mancala.prototype.get_stones = function (pit) {
        if (pit === 6) {
            return this.current_store;
        } else if (pit === 13) {
            return this.other_store;
        } else if (pit < 6) {
            return this.current_pits[pit];
        } else if (pit > 6) {
            return this.other_pits[pit - 7];
        }

        return NaN;
    };

    /**
     * Set the amount of stones in a pit
     * @param {Number} pit    The pit number
     * @param {Number} stones The amount of stones
     */
    Mancala.prototype.set_stones = function (pit, stones) {
        if (pit === 6) {
            this.current_store = stones;
        } else if (pit === 13) {
            this.other_store = stones;
        } else if (pit < 6) {
            this.current_pits[pit] = stones;
        } else if (pit > 6) {
            this.other_pits[pit - 7] = stones;
        }
    };

    /**
     * Adjust the amount of stones in a pit
     * @param {Number} pit    The pit number
     * @param {Number} stones The amount of stones
     */
    Mancala.prototype.add_stones = function (pit, stones) {
        if (pit === 6) {
            this.current_store += stones;
        } else if (pit === 13) {
            this.other_store[pit] += stones;
        } else if (pit < 6) {
            this.current_pits[pit] += stones;
        } else if (pit > 6) {
            this.other_pits[pit - 7] += stones;
        }
    };

    return Mancala;
})();

(function () {
    "use strict";

    /**
     * Distribute the stones from a pit around the board
     * @param {Number} pit The pit to begin in
     * @return {Boolean} Whether the user's turn has ended
     */
    Mancala.prototype.move_stones = function (pit) {
        // return if pit has no stones
        if (this.get_stones(pit) < 1) {
            return false;
        }

        // take stones out of pit
        let stones = this.get_stones(pit);
        this.set_stones(pit, 0);
        this.game.draw_stones(pit);

        while (stones > 0) {
            ++pit;

            // wrap around the board before reaching other player's store
            if (pit > 12) {
                pit = 0;
            }

            this.add_stones(pit, 1);
            stones--;
            this.game.draw_stones(pit);
        }

        // Invert the pit number (number of opposite pit in opponent's row)
        let inverse = 5 - pit;

        // Check for capture
        if (
            pit < 6 &&
            this.current_pits[pit] === 1 &&
            this.other_pits[inverse] > 0
        ) {
            // Transfer this pit's stones along with opposite pit's stones to store
            this.current_store += this.other_pits[inverse] + 1;
            this.game.draw_stones(6);

            // Clear the pits
            this.current_pits[pit] = 0;
            this.other_pits[inverse] = 0;
            this.game.draw_stones(pit);
            this.game.draw_stones(12 - pit);
        }

        // the user's turn ended if the stones did not end in the storage pit
        return pit !== 6;
    };
})();

let Game = (function () {
    "use strict";

    /**
     * Initialise class
     * @param {Mancala} Mancala
     * @param {String} [current_player=one] The current player
     * @constructor
     */
    let Game = function (Mancala, current_player) {
        this.mancala = new Mancala(this);
        this.player = current_player === "two" ? "two" : "one";
    };

    /**
     * Refresh the query selectors and update pit stones
     */
    Game.prototype.init = function () {
        this.refresh_queries();
        this.draw_all_stones();
    };

    /**
     * Retrieve the name of the player not currently having a turn
     * @return {String}
     */
    Game.prototype.get_other_player = function () {
        return this.player === "one" ? "two" : "one";
    };

    /**
     * Run the query selectors for the pits
     */
    Game.prototype.refresh_queries = function () {
        this.current_player_pits = document.querySelectorAll(
            ".row.player-" + this.player + " .pit div"
        );

        if (this.current_player_pits == null) {
            this.current_player_pits = 0;
        } else {
            this.current_player_pits = this.current_player_pits.length;
        }

        this.other_player_pits = document.querySelectorAll(
            ".row.player-" + this.get_other_player() + " .pit div"
        );

        if (this.other_player_pits == null) {
            this.other_player_pits = 0;
        } else {
            this.other_player_pits = this.other_player_pits.length;
        }

        this.current_player_store = document.querySelector(
            ".store.player-" + this.player + " div"
        );

        if (this.current_player_store == null) {
            this.current_player_store = 0;
        } else {
            this.current_player_store = this.current_player_store.length;
        }

        this.other_player_store = document.querySelector(
            ".store.player-" + this.get_other_player() + " div"
        );

        if (this.other_player_store == null) {
            this.other_player_store = 0;
        } else {
            this.current_player_store = this.current_player_store.length;
        }
    };

    /**
     * Perform the move for a player
     * @param {Number} pit - The pit number chosen
     * @returns {Boolean} true if the game is now over
     */
    Game.prototype.do_player_turn = function (pit) {
        // perform the player's action
        let turn_over = this.mancala.move_stones(pit);

        // make sure that a player hasn't run out of stones
        if (this.check_game_over()) {
            this.reset_game();
            return true;
        }

        // change the player if the current turn is ended
        if (turn_over) {
            this.switch_turn();
        }

        this.save_game();
        return false;
    };

    /**
     * Change the user currently having a turn
     */
    Game.prototype.switch_turn = function () {
        this.player = this.get_other_player();
        this.mancala.flip_board();
        this.refresh_queries();
        this.draw_all_stones();

        let player = this.player;
        setTimeout(function () {
            document.body.setAttribute("data-player", player);
            document.querySelector(".current-player").textContent = player;
        }, 700);
    };

    /**
     * Check if the game should end
     * @returns {Boolean} Whether the game is over
     */
    Game.prototype.check_game_over = function () {
        let winner = this.mancala.check_winner();

        if (winner < 0) {
            return false;
        }

        document.body.classList.add("game-over");
        let status = document.querySelector(".status");

        // Determine which player holds the most stones
        if (1 === winner) {
            status.textContent = "Player one wins!";
        } else if (2 === winner) {
            status.textContent = "Player two wins!";
        } else {
            status.textContent = "Draw!";
        }

        this.player = "";
        return true;
    };

    return Game;
})();

(function () {
    "use strict";

    /**
     * Update the stones on the page
     */
    Game.prototype.draw_all_stones = function () {
        let format = function (stones) {
            return stones === 0 ? "" : stones;
        };

        this.current_player_store.textContent = format(
            this.mancala.current_store
        );
        this.other_player_store.textContent = format(this.mancala.other_store);

        for (let pit = 0; pit < 6; pit++) {
            this.current_player_pits[pit].textContent = format(
                this.mancala.current_pits[pit]
            );
            this.other_player_pits[pit].textContent = format(
                this.mancala.other_pits[pit]
            );
        }
    };

    /**
     * Update the number of stones in a pit
     * @param {Number} pit The pit number
     */
    Game.prototype.draw_stones = function (pit) {
        let format = function (stones) {
            return stones === 0 ? "" : stones;
        };

        if (pit === 6) {
            this.current_player_store.textContent = format(
                this.mancala.current_store
            );
        } else if (pit === 13) {
            this.other_player_store.textContent = format(
                this.mancala.other_store
            );
        } else if (pit < 6) {
            this.current_player_pits[pit].textContent = format(
                this.mancala.current_pits[pit]
            );
        } else if (pit > 6) {
            pit -= 7;
            this.other_player_pits[pit].textContent = format(
                this.mancala.other_pits[pit]
            );
        }
    };
})();

(function () {
    "use strict";

    /**
     * Load the game state from localStorage
     */
    Game.prototype.load_game = function () {
        /* Remove old items */
        if (localStorage.getItem("stones")) {
            localStorage.removeItem("stones");
            localStorage.removeItem("player");
        }

        if (localStorage.getItem("current_pits")) {
            this.mancala.current_store = parseInt(
                localStorage.getItem("current_store")
            );
            this.mancala.other_store = parseInt(
                localStorage.getItem("other_store")
            );

            this.mancala.current_pits = JSON.parse(
                localStorage.getItem("current_pits")
            );
            this.mancala.other_pits = JSON.parse(
                localStorage.getItem("other_pits")
            );

            if ("two" === localStorage.getItem("player")) {
                this.switch_turn();
            }
        } else {
            this.save_game();
        }
    };

    /**
     * Save the game state to localStorage
     */
    Game.prototype.save_game = function () {
        localStorage.setItem("player", this.player);

        localStorage.setItem(
            "current_store",
            JSON.stringify(this.mancala.current_store)
        );
        localStorage.setItem(
            "other_store",
            JSON.stringify(this.mancala.other_store)
        );

        localStorage.setItem(
            "current_pits",
            JSON.stringify(this.mancala.current_pits)
        );
        localStorage.setItem(
            "other_pits",
            JSON.stringify(this.mancala.other_pits)
        );
    };

    /**
     * Reset the game state in localStorage
     */
    Game.prototype.reset_game = function () {
        localStorage.removeItem("player");
        localStorage.removeItem("current_store");
        localStorage.removeItem("other_store");
        localStorage.removeItem("current_pits");
        localStorage.removeItem("other_pits");
    };
})();

let game = (function () {
    "use strict";

    let game = new Game(Mancala);
    game.load_game();

    game.init();
    let waiting_for_move = true;

    /**
     * Initialize pit elements as
     * @param {String}   player The player who the row belongs to
     * @param {NodeList} row    The pit elements to initialize
     */
    let init_pits = function (player, row) {
        let onclick = function () {
            if (game.player === player && waiting_for_move) {
                waiting_for_move = false;
                let pit = parseInt(this.getAttribute("data-pit"));
                if (!game.do_player_turn(pit)) {
                    waiting_for_move = true;
                }
            }
        };

        for (let pit = 0; pit < row.length; pit++) {
            row[pit].setAttribute("data-pit", pit);
            row[pit].onclick = onclick;
        }
    };

    init_pits("one", document.querySelectorAll(".row.player-one .pit"));
    init_pits("two", document.querySelectorAll(".row.player-two .pit"));

    document.querySelector(".new-game").onclick = function () {
        game.reset_game();
        window.location.reload();
    };

    return game;
})();
