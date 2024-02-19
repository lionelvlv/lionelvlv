document.addEventListener('DOMContentLoaded', function() {
    
    
    // Variables to store the output and input elements
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');
    const inputPrefix = document.getElementById('input-prefix');
    const inputWrapper = document.getElementById('input-wrapper');
    const history = [];
    const colorPalette = [
        { output: "#FFFFFF", input: "#D3D7CF" }, // White
        { output: "#FF5555", input: "#CC4444" }, // Red
        { output: "#55FF55", input: "#44CC44" }, // Green
        { output: "#FFFF55", input: "#CCCC44" }, // Yellow
        { output: "#5555FF", input: "#4444CC" }, // Blue
        { output: "#FF55FF", input: "#CC44CC" }, // Pink
        { output: "#55FFFF", input: "#44CCCC" }  // Cyan
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
            "- resume: Open my resume in a new tab",
            "- bio: Display a short bio about me",
            "- socials: Display my social media links",
            "- help: Display this list of commands",
            "- clear: Clear the terminal screen",
            "- history: Display the command history",
            "- color: Change the color of the terminal",
            // Add more commands here
        ];
        animateLines(helpLines, () => {});
    }

    function bio() {
        const bioLines = [
            "My name is Lionel and I'm a developer with a passion for game development and web design.",
            "I grew up in the Bay Area and have always loved video games and technology.",
            "I'm currently a student at UC Berkeley studying Computer Science.",
            "I am proficient in Python and Java, and I'm familiar with HTML, CSS, and JavaScript.",
            " ",
            "On my free time, I watch anime, play video games, and work on personal projects.",
            "I'm always looking for new opportunities to learn and grow as a developer.",
        ]
        animateLines(bioLines, () => {});
        }
    
    function socials() {
        const linkedIn = "https://www.linkedin.com/in/lionelv2003/";
        const github = "https://github.com/lionelvlv";
        const spotify = "https://open.spotify.com/user/31fvyt7ebxubyxkb3pmqcwgrt3qe";
        animateTextLine("You can find me on the following platforms:", () => {});
        appendLink(linkedIn, "LinkedIn");
        appendLink(github, "GitHub");
        appendLink(spotify, "Spotify");
    }

    async function resume() {
        const resumeUrl = "https://docs.google.com/document/d/1bImyCKyUUq8iKtp3EOvbM_VaLC2QK5-INj78YshLenI/edit";
        const resumeText = "Opening resume...";
        await animateLines([resumeText], () => {});
        appendLink(resumeUrl, "Click here to view my resume");
        window.open(resumeUrl, '_blank');
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
            "0 White | 1 Red | 2 Green | 3 Yellow | 4 Blue | 5 Pink | 6 Cyan",
        ];
        animateLines(listOfColors, () => {});
    }

    function calculateOperation(left, operator, right) {
        switch (operator) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return right === 0 ? NaN : left / right; // Check for division by zero
            case '%': return left % right;
            default: return NaN; // Return Not-a-Number if the operator is unknown
        }
    }
    
    function performArithmetic(command) {
        const tokens = command.split(' ');
        const stack = [];
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (!isNaN(parseFloat(token))) {
                // If it's a number, push it to the stack
                stack.push(parseFloat(token));
            } else {
                // If it's an operator, pop the last two numbers from the stack and apply the operation
                if (stack.length < 2) {
                    animateTextLine("Error: Invalid expression", () => {});
                    return;
                }
                const right = stack.pop();
                const left = stack.pop();
                const result = calculateOperation(left, token, right);
                
                // Push the result back onto the stack
                stack.push(result);
            }
        }
    
        if (stack.length !== 1) {
            animateTextLine("Error: Invalid expression", () => {});
            return;
        }
    
        // The final result should be the only item left in the stack
        animateTextLine(command + " = " + stack[0], () => {});
    }
    
    // Function to handle command submission
    function submitCommand() {
        const command = inputElement.value.trim();
        animateTextLine(" ", () => {});
        appendLine(command, true); // Display the command as a line in the output
        animateTextLine(" ", () => {});
        inputElement.value = ''; // Clear the input area
        
        if (command.startsWith('color')) {
            if (command.split(' ').length !== 2) {
                color();
                return;
            }
            const index = parseInt(command.split(' ')[1], 10);
            changeColor(index);
        } else if (/^[\d+\-*/() ]+$/.test(command)) {
            performArithmetic(command);
        } 
        else {
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
            case 'bio':
                bio();
                break;
            case 'socials':
                socials();
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
