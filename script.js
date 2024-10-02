window.onload = function() {
    const bootupScreen = document.getElementById('bootup-screen');
    const desktop = document.getElementById('desktop');
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');
    const terminal = document.getElementById('terminal');
    const newInput = document.querySelector('.active-input');



    // Simulate bootup process
    setTimeout(() => {
        bootupScreen.style.display = 'none';
        desktop.style.display = 'block';
        terminalInput.focus(); // Ensure terminal input is focused
    }, 3000);

    // Function to append prompt at the end of terminal
    function appendPrompt() {
        // Remove the old input from previous prompt if it exists
        const oldInput = document.querySelector('.active-input');
        if (oldInput) {
            oldInput.removeAttribute('id'); // Remove the ID to avoid conflict
            oldInput.classList.remove('active-input');
        }
    
        // Create a new prompt with input
        const newPrompt = document.createElement('p');
        newPrompt.innerHTML = `<span class="prompt">user@mouri69:~$ </span><input type="text" class="active-input" autofocus>`;
    
        // Add explicit styles to the new input field
        const newInput = newPrompt.querySelector('.active-input');
        newInput.style.width = 'calc(100% - 150px)'; // Adjust width as necessary
        newInput.style.background = 'none'; // Transparent background
        newInput.style.border = 'none'; // Remove border
        newInput.style.color = 'green'; // Keep text color green for terminal effect
        newInput.style.fontFamily = 'monospace'; // Use monospace font for terminal feel
        newInput.style.fontSize = '16px'; // Set font size
        newInput.style.outline = 'none'; // Remove default outline
        newInput.style.caretColor = 'green'; // Make the cursor green for better visibility
    
        terminalContent.appendChild(newPrompt);
    
        // Scroll to the bottom of the terminal
        terminalContent.scrollTop = terminalContent.scrollHeight;
    
        // Focus on the newly added input field
        newInput.focus();
        newInput.addEventListener('keydown', handleTerminalInput);
    }
    

    // Handle terminal input
    function handleTerminalInput(event) {
        const input = event.target;
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior
            const command = input.value.trim(); // Grab the command
            executeCommand(command, input); // Execute the command
        }
    }

    // Function to execute commands
    function executeCommand(command, input) {
        // Get the last prompt span
        const commandSpan = input.previousElementSibling;

        // Display the command entered by the user
        commandSpan.textContent += command; 

        // Handle commands
        if (command.startsWith('cd')) {
            const folderName = command.split(' ')[1];
            openProject(folderName);
        } else if (command === 'ls') {
            terminalContent.innerHTML += `<p>Project 1  Project 2</p>`;
        } else if (command === 'clear') {
            terminalContent.innerHTML = ''; // Clear terminal screen
        } else {
            terminalContent.innerHTML += `<p>Command not found: ${command}</p>`;
        }

        // Disable the old input
        input.remove();

        // Append a new prompt after the command has been processed
        appendPrompt();
    }

    // Function to handle 'cd' command and open projects
    function openProject(folderName) {
        const projects = {
            'project1': 'https://link-to-project1.com',
            'project2': 'https://link-to-project2.com'
        };

        if (projects[folderName]) {
            window.open(projects[folderName], '_blank'); // Open in a new tab
        } else {
            terminalContent.innerHTML += `<p>No such directory: ${folderName}</p>`;
        }
    }

    // Start with the first prompt after bootup
    appendPrompt();
};
