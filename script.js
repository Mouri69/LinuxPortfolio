window.onload = function() {
    const bootupScreen = document.getElementById('bootup-screen');
    const desktop = document.getElementById('desktop');
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');
    const terminal = document.getElementById('terminal');
    const newInput = document.querySelector('.active-input');
    const terminalHeader = document.getElementById('terminal-header'); // Get the terminal header
    const desktopIconsContainer = document.querySelector('.desktop-icons');
    const taskbar = document.getElementById('taskbar');
    const taskbarHeight = taskbar.offsetHeight;
    const screenHeight = window.innerHeight;
    const startButton = document.getElementById('start-button'); // Get the start button

    // Initially hide the desktop
    desktop.style.display = 'none';

    // Button click event to start the desktop
    startButton.addEventListener('click', () => {
        bootupScreen.style.display = 'none'; 
        desktop.style.display = 'block'; 
        setTimeout(goFullScreen, 50);
    });
    
function goFullScreen() {
    const element = document.documentElement; // This selects the entire document
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

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

    // Hide the terminal initially
    terminal.style.display = "none";

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

    // Function to update time and date in the taskbar
    function updateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Date options
        const dateString = now.toLocaleDateString(undefined, options); // Format date
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time without seconds

        document.getElementById('time').textContent = timeString; // Update time
        document.getElementById('date').textContent = dateString; // Update date
    }

    // Update time and date every minute
    setInterval(updateTime, 60000);
    updateTime(); // Initial call to set time and date immediately

    function adjustIconsLayout() {
        const icons = document.querySelectorAll('.icon-container');
        let currentYPosition = 3; // Initial top offset (match CSS)
        let column = 0;
        const iconHeight = icons[0].offsetHeight + 15; // Icon height + margin
        const maxHeight = window.innerHeight - taskbar.offsetHeight - 15; // Available height minus taskbar and margin
    
        icons.forEach((icon, index) => {
            if (currentYPosition + iconHeight > maxHeight) {
                // If the icon exceeds available height, move to the next column
                column++;
                currentYPosition = 3; // Reset top position for new column
            }
    
            // Set the icon position dynamically
            icon.style.position = 'absolute';
            icon.style.left = `${column * 100}px`; // Move to the right for each column (adjust column width as needed)
            icon.style.top = `${currentYPosition}px`;
    
            // Increment the Y position for the next icon
            currentYPosition += iconHeight;
        });
    }

    // Add a small delay to ensure layout is fully rendered
    setTimeout(() => {
        adjustIconsLayout(); // Call after the content is fully loaded
    }, 100); // Slight delay before calculating layout

    window.addEventListener('resize', adjustIconsLayout); // Adjust on window resize
    
});

function goFullScreen() {
    const element = document.documentElement; // This selects the entire document
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

document.getElementById('Spotify-Desktop').addEventListener('dblclick', function() {
    // Open the Spotify Recommender page
    window.open('https://mouri69.recommender.vercel.app', '_blank');
});

document.getElementById('start-icon').addEventListener('click', function() {
    // Hide the main screen
    document.getElementById('desktop').style.display = 'none';
  
    // Show the bootup screen
    document.getElementById('bootup-screen').style.display = 'block';
  });
  

 // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const folderData = {
        "Snake Game": {
            title: "Snake Game Folder",
            description: "A 'snake' with a fixed starting position. The 'head' of the snake continually moves forward, unable to stop, growing ever longer.",
            gif: "assests/videos/snakegame.gif"
        },
        "Random Team": {
            title: "Random Team Folder",
            description: "This folder contains random team generation tools.",
            gif: "assests/videos/random_team.gif" // Example GIF
        },
        "Face Blur": {
            title: "Face Blur Folder",
            description: "This folder contains face blur tools.",
            gif: "assests/videos/face_blur.gif" // Example GIF
        },
        "Vrom Vrom Car": {
            title: "Vrom Vrom Car Folder",
            description: "This folder contains the Vrom Vrom Car game.",
            gif: "assests/videos/vromvrom.gif" // Example GIF
        },
        "Weather": {
            title: "Weather Folder",
            description: "This folder contains weather-related applications.",
            gif: "assests/videos/weather.gif" // Example GIF
        },
        "Web Chat": {
            title: "Web Chat Folder",
            description: "This folder contains the Web Chat application.",
            gif: "assests/videos/web_chat.gif" // Example GIF
        },
        "Spy Game": {
            title: "Spy Game Folder",
            description: "This folder contains the Spy Game.",
            gif: "assests/videos/spy_game.gif" // Example GIF
        },
        "Spotify": {
            title: "Spotify Folder",
            description: "This folder contains the Spotify application.",
            gif: "assests/videos/spotify.gif" // Example GIF
        },
        "Connect4": {
            title: "Connect4 Folder",
            description: "This folder contains the Connect4 game.",
            gif: "assests/videos/connect4.gif" // Example GIF
        },
        "XO Game": {
            title: "XO Game Folder",
            description: "This folder contains the XO Game.",
            gif: "assests/videos/xo_game.gif" // Example GIF
        },
        "Project Portfolio": {
            title: "Project Portfolio Folder",
            description: "This folder contains your project portfolio.",
            gif: "assests/videos/project_portfolio.gif" // Example GIF
        },
        "2048 Game": {
            title: "2048 Game Folder",
            description: "This folder contains the 2048 Game.",
            gif: "assests/videos/2048_game.gif" // Example GIF
        },
        "FlappyBird": {
            title: "Flappy Bird Folder",
            description: "This folder contains the Flappy Bird game.",
            gif: "assests/videos/flappy_bird.gif" // Example GIF
        },
        "Kemo Portfolio": {
            title: "Kemo Portfolio Folder",
            description: "This folder contains the Kemo Portfolio.",
            gif: "assests/videos/kemo_portfolio.gif" // Example GIF
        },
        "Lofi-Cafe": {
            title: "Lofi-Cafe Folder",
            description: "This folder contains the Lofi Cafe application.",
            gif: "assests/videos/lofi_cafe.gif" // Example GIF
        }
        // Add other folders as needed
    };

    // Function to handle the double-click event
    document.querySelectorAll('.icon-container').forEach(icon => {
        icon.addEventListener('dblclick', function() {
            const folderName = this.querySelector('.icon-label').innerText;
            const folderInfo = folderData[folderName];

            if (folderInfo) {
                // Update folder title and content
                document.getElementById('folder-title').innerText = folderInfo.title;
                document.getElementById('folder-description').innerText = folderInfo.description;
                const gifElement = document.getElementById('folder-gif');
                gifElement.src = folderInfo.gif;
                gifElement.style.display = 'block'; // Show the GIF
                
                // Show the folder window
                document.getElementById('folder-window').style.display = 'block';
            }
        });
    });

    // Function to close the folder
    document.getElementById('close-folder').addEventListener('click', function() {
        // Hide the folder window
        document.getElementById('folder-window').style.display = 'none';
        const gifElement = document.getElementById('folder-gif');
        gifElement.style.display = 'none'; // Hide the GIF when closing
    });
});
