document.addEventListener("DOMContentLoaded", function() {
    const commandLine = document.getElementById("command-line");
    const output = document.getElementById("output");
    let secretNumber;
    let attempts;
    let isGuessingGameActive = false;

    if (!commandLine) {
        console.error("Element with ID 'command-line' not found.");
        return;
    }

    function focusCommandLine() {
        commandLine.focus();
    }
    focusCommandLine();

    commandLine.addEventListener("click", focusCommandLine);

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

            if (command.toLowerCase().startsWith("guess ")) {
                const guess = parseInt(command.substring(6), 10);
                if (!isNaN(guess)) {
                    handleGuess(guess);
                } else {
                    printOutput("Invalid format! Enter 'guess number' (e.g., guess 50).");
                }
            } else {
                handleCommand(command);
            }
        }
    });

    function handleCommand(command) {
        switch (command.toLowerCase()) {
            case "help":
                printOutput("<span class='command'>help</span> - Show list of commands<br><span class='command'>about</span> - About me<br><span class='command'>socials</span> - Links to my social media<br><span class='command'>clear</span> - Clear the screen<br><span class='command'>guessgame</span> - Start the Guess the Number game");
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
            case "guessgame":
                startGuessingGame();
                break;
            default:
                printOutput(`Command not found: <span class='command'>${command}</span>`);
                break;
        }
    }

    function startGuessingGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        isGuessingGameActive = true;
        printOutput("Guess the Number game started! I have selected a number between 1 and 100. Enter 'guess [number]' to try your guess.");
    }

    function handleGuess(guess) {
        if (!isGuessingGameActive) {
            printOutput("The game is not active. Type <span class='command'>guessgame</span> to start a new game.");
            return;
        }

        attempts++;
        if (guess === secretNumber) {
            printOutput(`Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts. Type <span class='command'>guessgame</span> to play again.`);
            isGuessingGameActive = false;
        } else if (guess < secretNumber) {
            printOutput("My number is higher.");
        } else {
            printOutput("My number is lower.");
        }
    }
});
