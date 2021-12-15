var Mancala = (function () {
    "use strict";
    var a = function (a) {
        (this.game = a),
            (this.current_pits = [4, 4, 4, 4, 4, 4]),
            (this.other_pits = [4, 4, 4, 4, 4, 4]),
            (this.current_store = 0),
            (this.other_store = 0);
    };
    return (
        (a.prototype.flip_board = function () {
            var a = this.current_pits;
            (this.current_pits = this.other_pits), (this.other_pits = a);
            var b = this.current_store;
            (this.current_store = this.other_store), (this.other_store = b);
        }),
        (a.prototype.get_stones = function (a) {
            return 6 === a
                ? this.current_store
                : 13 === a
                ? this.other_store
                : 6 > a
                ? this.current_pits[a]
                : a > 6
                ? this.other_pits[a - 7]
                : NaN;
        }),
        (a.prototype.set_stones = function (a, b) {
            6 === a
                ? (this.current_store = b)
                : 13 === a
                ? (this.other_store = b)
                : 6 > a
                ? (this.current_pits[a] = b)
                : a > 6 && (this.other_pits[a - 7] = b);
        }),
        (a.prototype.add_stones = function (a, b) {
            6 === a
                ? (this.current_store += b)
                : 13 === a
                ? (this.other_store[a] += b)
                : 6 > a
                ? (this.current_pits[a] += b)
                : a > 6 && (this.other_pits[a - 7] += b);
        }),
        a
    );
})();
!(function () {
    "use strict";
    Mancala.prototype.move_stones = function (a) {
        if (this.get_stones(a) < 1) return !1;
        var b = this.get_stones(a);
        for (this.set_stones(a, 0), this.game.draw_stones(a); b > 0; )
            ++a,
                a > 12 && (a = 0),
                this.add_stones(a, 1),
                b--,
                this.game.draw_stones(a);
        var c = 5 - a;
        return (
            6 > a &&
                1 === this.current_pits[a] &&
                this.other_pits[c] > 0 &&
                ((this.current_store += this.other_pits[c] + 1),
                this.game.draw_stones(6),
                (this.current_pits[a] = 0),
                (this.other_pits[c] = 0),
                this.game.draw_stones(a),
                this.game.draw_stones(12 - a)),
            6 !== a
        );
    };
})(),
    (function () {
        "use strict";
        Mancala.prototype.check_winner = function () {
            var a = function (a) {
                    return a.every(function (a) {
                        return 0 === a;
                    });
                },
                b = a(this.current_pits),
                c = a(this.other_pits);
            if (!b && !c) return -1;
            var d;
            if (b && !c)
                for (d = 0; 6 > d; d++)
                    (this.other_store += this.other_pits[d]),
                        (this.other_pits[d] = 0);
            else if (c && !b)
                for (d = 0; 6 > d; d++)
                    (this.current_store += this.current_pits[d]),
                        (this.current_pits[d] = 0);
            return (
                this.game.draw_all_stones(),
                this.current_store > this.other_store
                    ? "two" === this.game.player
                        ? 2
                        : 1
                    : this.other_store > this.current_store
                    ? "two" === this.game.player
                        ? 1
                        : 2
                    : 0
            );
        };
    })();
var Game = (function () {
    "use strict";
    var a = function (a, b) {
        (this.mancala = new a(this)),
            (this.player = "two" === b ? "two" : "one");
    };
    return (
        (a.prototype.init = function () {
            this.refresh_queries(), this.draw_all_stones();
        }),
        (a.prototype.get_other_player = function () {
            return "one" === this.player ? "two" : "one";
        }),
        (a.prototype.refresh_queries = function () {
            (this.current_player_pits = document.querySelectorAll(
                ".row.player-" + this.player + " .pit p"
            )),
                (this.other_player_pits = document.querySelectorAll(
                    ".row.player-" + this.get_other_player() + " .pit p"
                )),
                (this.current_player_store = document.querySelector(
                    ".store.player-" + this.player + " p"
                )),
                (this.other_player_store = document.querySelector(
                    ".store.player-" + this.get_other_player() + " p"
                ));
        }),
        (a.prototype.do_player_turn = function (a) {
            var b = this.mancala.move_stones(a);
            return this.check_game_over()
                ? (this.reset_game(), !0)
                : (b && this.switch_turn(), this.save_game(), !1);
        }),
        (a.prototype.switch_turn = function () {
            (this.player = this.get_other_player()),
                this.mancala.flip_board(),
                this.refresh_queries(),
                this.draw_all_stones();
            var a = this.player;
            setTimeout(function () {
                document.body.setAttribute("data-player", a),
                    (document.querySelector(".current-player").textContent = a);
            }, 700);
        }),
        (a.prototype.check_game_over = function () {
            var a = this.mancala.check_winner();
            if (0 > a) return !1;
            document.body.classList.add("game-over");
            var b = document.querySelector(".status");
            return (
                1 === a
                    ? (b.textContent = "Player one wins!")
                    : 2 === a
                    ? (b.textContent = "Player two wins!")
                    : (b.textContent = "Draw!"),
                (this.player = ""),
                !0
            );
        }),
        a
    );
})();
!(function () {
    "use strict";
    (Game.prototype.draw_all_stones = function () {
        var a = function (a) {
            return 0 === a ? "" : a;
        };
        (this.current_player_store.textContent = a(this.mancala.current_store)),
            (this.other_player_store.textContent = a(this.mancala.other_store));
        for (var b = 0; 6 > b; b++)
            (this.current_player_pits[b].textContent = a(
                this.mancala.current_pits[b]
            )),
                (this.other_player_pits[b].textContent = a(
                    this.mancala.other_pits[b]
                ));
    }),
        (Game.prototype.draw_stones = function (a) {
            var b = function (a) {
                return 0 === a ? "" : a;
            };
            6 === a
                ? (this.current_player_store.textContent = b(
                      this.mancala.current_store
                  ))
                : 13 === a
                ? (this.other_player_store.textContent = b(
                      this.mancala.other_store
                  ))
                : 6 > a
                ? (this.current_player_pits[a].textContent = b(
                      this.mancala.current_pits[a]
                  ))
                : a > 6 &&
                  ((a -= 7),
                  (this.other_player_pits[a].textContent = b(
                      this.mancala.other_pits[a]
                  )));
        });
})(),
    (function () {
        "use strict";
        (Game.prototype.load_game = function () {
            localStorage.getItem("stones") &&
                (localStorage.removeItem("stones"),
                localStorage.removeItem("player")),
                localStorage.getItem("current_pits")
                    ? ((this.mancala.current_store = parseInt(
                          localStorage.getItem("current_store")
                      )),
                      (this.mancala.other_store = parseInt(
                          localStorage.getItem("other_store")
                      )),
                      (this.mancala.current_pits = JSON.parse(
                          localStorage.getItem("current_pits")
                      )),
                      (this.mancala.other_pits = JSON.parse(
                          localStorage.getItem("other_pits")
                      )),
                      "two" === localStorage.getItem("player") &&
                          this.switch_turn())
                    : this.save_game();
        }),
            (Game.prototype.save_game = function () {
                localStorage.setItem("player", this.player),
                    localStorage.setItem(
                        "current_store",
                        JSON.stringify(this.mancala.current_store)
                    ),
                    localStorage.setItem(
                        "other_store",
                        JSON.stringify(this.mancala.other_store)
                    ),
                    localStorage.setItem(
                        "current_pits",
                        JSON.stringify(this.mancala.current_pits)
                    ),
                    localStorage.setItem(
                        "other_pits",
                        JSON.stringify(this.mancala.other_pits)
                    );
            }),
            (Game.prototype.reset_game = function () {
                localStorage.removeItem("player"),
                    localStorage.removeItem("current_store"),
                    localStorage.removeItem("other_store"),
                    localStorage.removeItem("current_pits"),
                    localStorage.removeItem("other_pits");
            });
    })();
var game = (function () {
    "use strict";
    var a = new Game(Mancala);
    a.load_game(), a.init();
    var b = !0,
        c = function (c, d) {
            for (
                var e = function () {
                        if (a.player === c && b) {
                            b = !1;
                            var d = parseInt(this.getAttribute("data-pit"));
                            a.do_player_turn(d) || (b = !0);
                        }
                    },
                    f = 0;
                f < d.length;
                f++
            )
                d[f].setAttribute("data-pit", f), (d[f].onclick = e);
        };
    return (
        c("one", document.querySelectorAll(".row.player-one .pit")),
        c("two", document.querySelectorAll(".row.player-two .pit")),
        (document.querySelector(".new-game").onclick = function () {
            a.reset_game(), window.location.reload();
        }),
        a
    );
})();