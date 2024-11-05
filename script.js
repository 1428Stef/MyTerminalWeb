document.addEventListener("DOMContentLoaded", function() {
    const commandLine = document.getElementById("command-line");
    const output = document.getElementById("output");
    let board;
    let currentPlayer;
    const players = ["X", "O"];
    let isGameActive = false; // Флаг состояния игры

    function printOutput(text) {
        const paragraph = document.createElement("p");
        paragraph.classList.add("fade-in");
        paragraph.innerHTML = text;
        output.appendChild(paragraph);
        output.scrollTop = output.scrollHeight;
    }

    commandLine.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const command = commandLine.value.trim();
            commandLine.value = "";

            if (command.toLowerCase().startsWith("move ")) {
                const move = command.substring(5).split(",");
                if (move.length === 2) {
                    const row = parseInt(move[0], 10) - 1;
                    const col = parseInt(move[1], 10) - 1;
                    handleMove(row, col);
                } else {
                    printOutput("Invalid move format! Please use 'move row,column' (e.g., move 1,1).");
                }
            } else {
                handleCommand(command);
            }
        }
    });

    function handleCommand(command) {
        switch (command.toLowerCase()) {
            case "help":
                printOutput("<span class='command'>help</span> - Show list of commands<br><span class='command'>about</span> - About me<br><span class='command'>socials</span> - Links to my social media<br><span class='command'>clear</span> - Clear the screen<br><span class='command'>tictactoe</span> - Start the Tic Tac Toe game");
                break;
            case "about":
                printOutput("My name is Stefan, I'm a web developer and a slacker.");
                break;
            case "socials":
                printOutput("<a href='https://steamcommunity.com/id/etotipssilka22/' target='_blank'>Steam</a><br><a href='https://github.com/1428Stef' target='_blank'>GitHub</a><br><a href='https://t.me/stefan1428' target='_blank'>Telegram</a>");
                break;
            case "clear":
                output.innerHTML = "";
                break;
            case "tictactoe":
                startTicTacToe();
                break;
            default:
                printOutput(`Command not found: <span class='command'>${command}</span>`);
                break;
        }
    }

    function startTicTacToe() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        currentPlayer = players[0];
        isGameActive = true; // Активируем игру
        printOutput("Tic Tac Toe started! Player X goes first. Enter your move in the format row,column (e.g., 1,1 for the top-left corner).");
        printBoard();
    }

    function printBoard() {
        const boardDisplay = board.map(row => row.map(cell => cell || "_").join(" | ")).join("<br>---------<br>");
        printOutput(boardDisplay);
    }

    function handleMove(row, col) {
        if (!isGameActive) {
            printOutput("The game is not active. Type <span class='command'>tictactoe</span> to start a new game.");
            return;
        }

        if (row < 0 || row > 2 || col < 0 || col > 2) {
            printOutput("Invalid move! Please enter row and column between 1 and 3.");
            return;
        }

        if (board[row][col] !== "") {
            printOutput("Cell already taken! Try a different move.");
            return;
        }

        board[row][col] = currentPlayer;
        if (checkWinner()) {
            printBoard();
            printOutput(`Player ${currentPlayer} wins! Type <span class='command'>tictactoe</span> to play again.`);
            isGameActive = false; // Завершаем игру
            return;
        }

        if (board.flat().every(cell => cell !== "")) {
            printBoard();
            printOutput("It's a draw! Type <span class='command'>tictactoe</span> to play again.");
            isGameActive = false; // Завершаем игру
            return;
        }

        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        printBoard();
        printOutput(`Player ${currentPlayer}'s turn.`);
    }

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true;
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true;
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
        if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;
        return false;
    }
});
