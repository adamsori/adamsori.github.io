document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const currentDirectoryDisplay = document.querySelector('.current-directory');
    let currentDirectory = '[CURDIR]: /home';
    const availableCommands = ['cd', 'cat', 'ls', 'clear', 'experience', 'contact', 'education', 'about-me']; // Add other available commands here
    const availableCommandsFile = ['experience.txt']; // Add other available commands here
    
    function printOutput(text, isResult) {
        const outputLine = document.createElement('div');
        outputLine.textContent = text;
        if (isResult === true) {
            outputLine.classList.add('result');
        }else if (isResult === 'files') {
            outputLine.classList.add('result-files');
        }else if (isResult === 'last-cmd') {
            outputLine.classList.add('result-cmd');
        }else if (isResult === 'error') {
            outputLine.classList.add('result-error');
        }
        output.appendChild(outputLine);
        output.scrollTop = output.scrollHeight;
    }

    function handleCommand(command) {
        const args = command.trim().split(' ');

        if (args[0] === 'cd') {
            if (args[1] === 'experience') {
                currentDirectory = '[CURDIR]: /home/experience';
            } else if (args[1] === 'contact') {
                currentDirectory = '[CURDIR]: /home/contact';
            } else if (args[1] === 'education') {
                currentDirectory = '[CURDIR]: /home/education';
            } else if (args[1] === 'about-me') {
                currentDirectory = '[CURDIR]: /home/about-me';
            } else if (args[1] === '..') {
                currentDirectory = '[CURDIR]: /home';
            } else {
                printOutput(`No such directory: ${args[1]}`);
            }
        } else if (args[0] === 'cat') {
            if (args[1] === 'experience.txt') {
                if (currentDirectory === '[CURDIR]: /home/experience') {
                    printOutput('Your relevant experience details go here.');
                } else {
                    printOutput(`No such file: ${args[1]}`, 'error'	);
                }
            } else {
                printOutput(`No such file: ${args[1]}`, 'error');
            }
        } else if (args[0] === 'ls') {
            if (currentDirectory === '[CURDIR]: /home') {
                printOutput('experience  contact  education  about-me', true);
            } else if (currentDirectory === '[CURDIR]: /home/experience') {
                printOutput('experience.txt', 'files');
            } else {
                printOutput('No items in this directory.', 'error');
            }
        } else if (args[0] === 'clear') {
            output.innerHTML = '';
        } else {
            printOutput(`Command not found: ${args[0]}`, 'error');
        }

        // Update the current directory display
        currentDirectoryDisplay.textContent = currentDirectory;
    }

  
    function enableInput() {
        input.style.display = 'inline';
        input.focus();
    }

    function autoCompleteCommand() {
        const currentInputValue = input.value.trim();
        const lastSpaceIndex = currentInputValue.lastIndexOf(' ');
        const currentCommand = lastSpaceIndex === -1 ? currentInputValue : currentInputValue.slice(lastSpaceIndex + 1);

        if (currentCommand !== '') {
            const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(currentCommand));
            if (matchingCommands.length === 1) {
                input.value = currentInputValue.slice(0, lastSpaceIndex + 1) + matchingCommands[0];
            }
        }
    }

    function autoCompleteCommandFiles() {
        const currentInputValue = input.value.trim();
        const lastSpaceIndex = currentInputValue.lastIndexOf(' ');
        const currentCommand = lastSpaceIndex === -1 ? currentInputValue : currentInputValue.slice(lastSpaceIndex + 1);

        if (currentCommand !== '') {
            const matchingCommands = availableCommandsFile.filter((cmd) => cmd.startsWith(currentCommand));
            if (matchingCommands.length === 1) {
                input.value = currentInputValue.slice(0, lastSpaceIndex + 1) + matchingCommands[0];
            }
        }
    }

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value;
            printOutput(`adam.sori$ ${command}`, 'last-cmd');
            handleCommand(command);
            input.value = '';
        } else if (event.key === 'Tab' && currentDirectory === '[CURDIR]: /home') {
            event.preventDefault(); // Prevent default tab behavior (changing focus)
            autoCompleteCommand();
        } else if (event.key === 'Tab' && currentDirectory !== '[CURDIR]: /home') {
            event.preventDefault(); // Prevent default tab behavior (changing focus)
            autoCompleteCommandFiles();
        }
    });

    // Add an event listener to enable the input when clicking anywhere on the screen
    document.addEventListener('click', function() {
        enableInput();
    });

    // Initial focus on the input field
    enableInput();
});