document.addEventListener('DOMContentLoaded', function() {
    
    
    // Variables to store the output and input elements
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');

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

    // animateTextLine    Function that animates the text line by line
    // line               The line of text to animate
    // callback           The function to call after the animation is complete
    function animateTextLine(line, callback, speed=15) {
        const lineElement = document.createElement('div');
        outputElement.appendChild(lineElement);

        let i = 0;
        const interval = setInterval(() => {
            if (i < line.length) {
                lineElement.textContent += line[i];
                i++;
            } else {
                clearInterval(interval);
                callback(); 
            }
        }, speed); // Speed of animation
    }

    // Function to animate a list of strings line by line
    function animateLines(lines, callback, speed=15) {
        let index = 0; // Start with the first line
        function processNextLine() {
            if (index < lines.length) {
                animateTextLine(lines[index], () => {
                    index++;
                    processNextLine(), speed; 
                });
            } else if (callback) {
                callback(); 
            }
        }
        processNextLine();
    }

    bootSequence();
    function bootSequence() {
        animateTextLine("Welcome to the terminal. Type 'help' for a list of commands.\n", () => {
        }, 15);
        // const asciiArt = 
        //    ["........................................................",
        //     ".%%......%%%%%%...%%%%...%%..%%..%%%%%%..%%......%%..%%.",
        //     ".%%........%%....%%..%%..%%%.%%..%%......%%......%%..%%.",
        //     ".%%........%%....%%..%%..%%.%%%..%%%%....%%......%%..%%.",
        //     ".%%........%%....%%..%%..%%..%%..%%......%%.......%%%%..",
        //     ".%%%%%%..%%%%%%...%%%%...%%..%%..%%%%%%..%%%%%%....%%...",
        //     "........................................................"];
        // animateLines(asciiArt, () => {}, 1);
    }
    
    

    // Function to process and animate the "help" command output
    function processHelpCommand() {
        const helpLines = [
            "Available commands:",
            "- help: Display this list of commands"
            // Add more commands here
        ];
        animateLines(helpLines, () => {});
    }

    // Function to handle command submission
    function submitCommand() {
        const command = inputElement.value.trim();
        appendLine(command, true); // Display the command as a line in the output
        inputElement.value = ''; // Clear the input area

        switch (command.toLowerCase()) {
            case 'help':
                processHelpCommand();
                break;
            // Add more commands here
            default:
                animateTextLine("Unknown command: " + command, () => {});
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
