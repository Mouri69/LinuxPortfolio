window.onload = function() {
    const bootupScreen = document.getElementById('bootup-screen');
    const desktop = document.getElementById('desktop');
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');
    const terminal = document.getElementById('terminal');
    const newInput = document.querySelector('.active-input');
    const terminalHeader = document.getElementById('terminal-header'); // Get the terminal header


    // Simulate bootup process
    setTimeout(() => {
        bootupScreen.style.display = 'none';
        desktop.style.display = 'block';
        terminalInput.focus(); // Ensure terminal input is focused
    }, 3000);

    // Dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    terminalHeader.onmousedown = function(event) {
        isDragging = true;
        offsetX = event.clientX - terminal.getBoundingClientRect().left;
        offsetY = event.clientY - terminal.getBoundingClientRect().top;
        
        document.onmousemove = function(event) {
            if (isDragging) {
                terminal.style.left = event.clientX - offsetX + 'px';
                terminal.style.top = event.clientY - offsetY + 'px';
            }
        };

        document.onmouseup = function() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

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
        openProject(folderName.toLowerCase()); // Convert folderName to lowercase
    } else if (command === 'ls') {
        const projects = [
            "SnakeGame",
            "RandomTeam",
            "FaceBlur",
            "vrom-vrom-car",
            "Weather",
            "WebChat",
            "SpyGame",
            "SpotifyNew",
            "Connect4",
            "XO-game",
            "Project-Portfolio",
            "2048-Game",
            "FlappyBird",
            "Kemo-Portfolio",
            "Lofi-Cafe (under construction)",
            "LinuxPortfolio"
        ];

        // Clear the terminal output for previous commands
        terminalContent.innerHTML += '<p style="color: #434B8D;">' + projects.join('</p><p style="color: #434B8D;">') + '</p>';
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
        'snakegame': 'https://mouri69-snakegame.vercel.app',
        'randomteam': 'https://mouri69-randomteam.vercel.app',
        'faceblur': 'https://mouri69-faceblur.vercel.app',
        'vrom-vrom-car': 'https://mouri69-vromvromcar.vercel.app',
        'weather': 'https://mouri69-weather.vercel.app',
        'webchat': 'https://mouri69-livewebchat.vercel.app',
        'spygame': 'https://mouri69-spygame.vercel.app',
        'spotifynew': 'https://mouri69-recommender.vercel.app',
        'connect4': 'https://mouri69-connect4.vercel.app',
        'xo-game': 'https://mouri69-xo.vercel.app',
        'project-portfolio': 'https://mouri69-project-portfolio.vercel.app',
        '2048-game': 'https://mouri69-2048.vercel.app',
        'flappybird': 'https://mouri69-flappybird.vercel.app',
        'kemo-portfolio': 'https://mouri69-kemo.vercel.app',
        'lofi-cafe (under construction)': 'https://mouri69-loficafe.vercel.app',
        'linuxportfolio': 'https://mouri69-linuxportfolio.vercel.app'
    };

    const projectKey = folderName.toLowerCase(); // Use lowercase for consistency
    if (projects[projectKey]) { // Check against the lowercase project key
        window.open(projects[projectKey], '_blank'); // Open in a new tab
    } else {
        terminalContent.innerHTML += `<p>No such directory: ${folderName}</p>`;
    }
}

// Start with the first prompt after bootup
appendPrompt();
};

function updateTime() {
    const now = new Date();
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Update time and date every second
setInterval(updateTime, 6000);
updateTime(); // Initial call to set time immediately

//Opens spotify

document.addEventListener("DOMContentLoaded", () => {
    // Get the terminal and taskbar icons
    const terminalIcon = document.querySelector('.taskbar-icon[alt="Terminal"]');
    const terminal = document.getElementById("terminal");
    const spotifyIcon = document.querySelector('.taskbar-icon[alt="Spotify"]');

    // Add click event to open/close terminal
    terminalIcon.addEventListener("click", () => {
        if (terminal.style.display === "none" || terminal.style.display === "") {
            terminal.style.display = "flex"; // Show the terminal
            terminal.focus(); // Optional: focus the terminal
        } else {
            terminal.style.display = "none"; // Hide the terminal
        }
    });

    // Add click event to open Spotify
    spotifyIcon.addEventListener("click", () => {
        window.open("https://open.spotify.com/artist/5QKGejJMncXUNUb9pUFbEf", "_blank"); // Open Spotify in a new tab
    });

    // Hide the terminal initially
    terminal.style.display = "none";

    // Function to update time and date in the taskbar
    function updateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();
        document.getElementById("time").textContent = time;
        document.getElementById("date").textContent = date;
    }

    setInterval(updateTime, 60000); // Update time every second
    updateTime(); // Initial call to display time immediately
});
