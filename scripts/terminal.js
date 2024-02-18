document.addEventListener('DOMContentLoaded', function() {
    
    
    // Variables to store the output and input elements
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');
    const inputPrefix = document.getElementById('input-prefix');
    const inputWrapper = document.getElementById('input-wrapper');
    const history = [];
    const colorPalette = [
        { output: "#FFFFFF", input: "#E0E0E0" }, // White
        { output: "#FF0000", input: "#CC0000" }, // Red
        { output: "#00FF00", input: "#00CC00" }, // Green
        { output: "#FFFF00", input: "#CCCC00" }, // Yellow
        { output: "#0000FF", input: "#0000CC" }, // Blue
        { output: "#4B0082", input: "#3A0065" }, // Purple
        { output: "#9400D3", input: "#7600A8" }  // Dark Violet
    ];

    // Helper function to append text to the output, line by line
    function appendLine(text, isCommand = false) {
        text.split('\n').forEach(line => {
            const lineElement = document.createElement('div');
            if (isCommand) {
                lineElement.textContent = "> " + line;
            } else {
                lineElement.textContent = line;
            }
            outputElement.appendChild(lineElement);
        });
    }

    // Assumes all the other parts of the script are unchanged

// Helper function to "sleep" for a given number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateTextLine(line, callback, speed = 15) {
    const lineElement = document.createElement('div');
    outputElement.appendChild(lineElement);

    for (let i = 0; i < line.length; i += 3) {
        lineElement.textContent += line[i];
        if (i + 1 < line.length) {
            lineElement.textContent += line[i + 1];
        }
        if (i + 2 < line.length) {
            lineElement.textContent += line[i + 2];
        }
        await sleep(speed); // Wait for the specified speed between character groups
    }
    callback();
}

async function animateLines(lines, callback, speed = 15) {
    for (let index = 0; index < lines.length; index++) {
        await animateTextLine(lines[index], () => {}, speed);
    }
    if (callback) callback(); // Call the callback function after all lines are animated
}

async function appendLink(url, linkText) {
    const lineElement = document.createElement('div');
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.target = "_blank";
    linkElement.style.color = "#0f0";
    outputElement.appendChild(lineElement);

    for (let i = 0; i < linkText.length; i++) {
        linkElement.textContent += linkText[i];
        await sleep(1); // Wait for 15ms between characters
    }
    lineElement.appendChild(linkElement); // Append after animation
}


    bootSequence();
    async function bootSequence() {
        const asciiArt = [
            // "⠤⠤⠤⠤⠤⠤⢤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠤⠶⠶⠶⠦⠤⠤⠤⠤⠤⢤⣤⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⢀⠄⢂⣠⣭⣭⣕⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠀⠀⠀⠤⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉",
            // "⠀⠀⢀⠜⣳⣾⡿⠛⣿⣿⣿⣦⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣍⣀⣦⠦⠄⣀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
            // "⠀⠠⣄⣽⣿⠋⠀⡰⢿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡿⠛⠛⡿⠿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣁⣂⣤⡄⠀⠀⠀⠀⠀⠀",
            // "⢳⣶⣼⣿⠃⠀⢀⠧⠤⢜⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠟⠁⠀⠀⠀⡇⠀⣀⡈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠁⠐⠀⣀⠀⠀",
            // "⠀⠙⠻⣿⠀⠀⠀⠀⠀⠀⢹⣿⣿⡝⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡿⠋⠀⠀⠀⠀⠠⠃⠁⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⡿⠋⠀⠀",
            // "⠀⠀⠀⠙⡄⠀⠀⠀⠀⠀⢸⣿⣿⡃⢼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡏⠉⠉⠻⣿⡿⠋⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⢰⠀⠀⠰⡒⠊⠻⠿⠋⠐⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⠸⣇⡀⠀⠑⢄⠀⠀⠀⡠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢖⠠⠤⠤⠔⠙⠻⠿⠋⠱⡑⢄⠀⢠⠟⠀⠀⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⠀⠀⠈⠉⠒⠒⠻⠶⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠡⢀⡵⠃⠀⠀⠀⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠦⣀⠀⠀⠀⠀⠀⢀⣤⡟⠉⠀⠀⠀⠀⠀⠀⠀⠀",
            // "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠙⠛⠓⠒⠲⠿⢍⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
            "    __    _                  ___    __",
            "   / /   (_)___  ____  ___  / / |  / /",
            "  / /   / / __ \\/ __ \\/ _ \\/ /| | / / ",
            " / /___/ / /_/ / / / /  __/ / | |/ /  ",
            "/_____/_/\\____/_/ /_/\\___/_/  |___/   "
        ];
        await animateLines(asciiArt, () => {}, 1);
        animateTextLine(" ");
        animateTextLine("Welcome to the terminal. Type 'help' for a list of commands.\n", inputWrapper.style.display = "flex", 15);
    }
    
    

    // Function to process and animate the "help" command output
    function processHelpCommand() {
        const helpLines = [
            "Available commands:",
            "- help: Display this list of commands",
            "- clear: Clear the terminal screen",
            "- history: Display the command history",
            "- color: Change the color of the terminal",
            // Add more commands here
        ];
        animateLines(helpLines, () => {});
    }

    function resume() {
        const resumeUrl = "https://docs.google.com/document/d/1bImyCKyUUq8iKtp3EOvbM_VaLC2QK5-INj78YshLenI/edit";
        const resumeText = "Click here to view my resume.";
        appendLink(resumeUrl, resumeText);
    }
    // Function to process and animate the "help" command output
    function clear() {
        outputElement.innerHTML = "";
        bootSequence();
    }

    function changeColor(index) {
        if (index >= 0 && index < colorPalette.length) {
            const colors = colorPalette[index];
            outputElement.style.color = colors.output;
            inputElement.style.color = colors.input;
            inputPrefix.style.color = colors.input;
        } else {
            animateTextLine("Invalid color index: " + index, () => {});
        }
    }

    function color() {
        const listOfColors = [
            "color (0-6) - Change the color of the terminal",
            "0 White | 1 Red | 2 Green | 3 Yellow | 4 Blue | 5 Purple | 6 Dark Violet",
        ];
        animateLines(listOfColors, () => {});
    }
      
    
    // Function to handle command submission
    function submitCommand() {
        const command = inputElement.value.trim();
        appendLine(command, true); // Display the command as a line in the output
        inputElement.value = ''; // Clear the input area
        
        if (command.startsWith('color')) {
            if (command.split(' ').length !== 2) {
                color();
                return;
            }
            const index = parseInt(command.split(' ')[1], 10);
            changeColor(index);
        } else {
        switch (command.toLowerCase()) {
            case 'help':
                processHelpCommand();
                break;
            case 'clear':
                clear();
                break;
            case 'history':
                animateTextLine(history.join('\n'), () => {});
                break;
            case 'color':
                color();
                break;
            case 'resume':
                resume();
                break;
            case 'color 0':
                outputElement.style.color = "#FFFFFF";
                inputElement.style.color = "#FFFFFF";
                inputPrefix.style.color = "#FFFFFF";
                break;
            case 'color 1':
                outputElement.style.color = "#FF0000";
                inputElement.style.color = "#FF0000";
                inputPrefix.style.color = "#FF0000";
                break;
            case 'color 2':
                outputElement.style.color = "#00FF00";
                inputElement.style.color = "#00FF00";
                inputPrefix.style.color = "#00FF00";
                break;
            case 'color 3':
                outputElement.style.color = "#FFFF00";
                inputElement.style.color = "#FFFF00";
                inputPrefix.style.color = "#FFFF00";
                break;
            case 'color 4':
                outputElement.style.color = "#0000FF";
                inputElement.style.color = "#0000FF";
                inputPrefix.style.color = "#0000FF";
                break;
            case 'color 5':
                outputElement.style.color = "#4B0082";
                inputElement.style.color = "#4B0082";
                inputPrefix.style.color = "#4B0082";
                break;
            case 'color 6':
                outputElement.style.color = "#9400D3";
                inputElement.style.color = "#9400D3";
                inputPrefix.style.color = "#9400D3";
                break;
            default:
                animateTextLine("Unknown command: " + command, () => {});
        }
    }
        if (command !== "") {
            history.push(command);
        }
    }

    // Event listener for the input to submit on Enter key press (and prevent form submission)
    inputElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default action to avoid form submission/reloading page
            submitCommand();
        }
    });
});
