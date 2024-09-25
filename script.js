window.onload = function() {
    const bootupScreen = document.getElementById('bootup-screen');
    const desktop = document.getElementById('desktop');
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');
    const terminal = document.getElementById('terminal');

    // Simulate bootup process
    setTimeout(() => {
        bootupScreen.style.display = 'none';
        desktop.style.display = 'block';
        appendPrompt(); // Display the first prompt when bootup completes
        terminalInput.focus(); // Ensure terminal input is focused
    }, 3000);

    // Function to append prompt at the end of terminal
    function appendPrompt() {
        const newPrompt = document.createElement('p');
        newPrompt.innerHTML = `<span class="prompt">user@linux-portfolio:~$ </span><span class="command"></span>`;
        terminalContent.appendChild(newPrompt);
        terminalContent.scrollTop = terminalContent.scrollHeight; // Scroll to the bottom after new prompt
        terminalInput.value = ''; // Clear input for new typing
        terminalInput.focus(); // Ensure terminal input is focused for typing
    }

    // Dragging feature for terminal window
    let isDragging = false;
    let offsetX, offsetY;

    terminal.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - terminal.offsetLeft;
        offsetY = e.clientY - terminal.offsetTop;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            terminal.style.left = `${e.clientX - offsetX}px`;
            terminal.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Handle terminal input
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior
            const command = terminalInput.value.trim(); // Grab the command
            executeCommand(command); // Execute the command
        }
    });

    // Function to execute commands
    function executeCommand(command) {
        // Get the last prompt to append command under it
        const commandSpans = terminalContent.getElementsByClassName('command');
        const lastCommandSpan = commandSpans[commandSpans.length - 1];

        // Show the command entered by the user
        lastCommandSpan.textContent = command; 

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

        // Append a new prompt after the command has been processed
        appendPrompt(); 
        terminalContent.scrollTop = terminalContent.scrollHeight; // Scroll to bottom after new output
    }

    // Function to handle 'cd' command and open projects
    function openProject(folderName) {
        const projects = {
            'project1': 'https://link-to-project1.com',
            'project2': 'https://link-to-project2.com'
        };

        if (projects[folderName]) {
            window.location.href = projects[folderName];
        } else {
            terminalContent.innerHTML += `<p>No such directory: ${folderName}</p>`;
        }
    }
};
