const modeGrid = document.getElementById("modeGrid");
const textInput = document.getElementById("textio");

// Helper: robustly splits text into words by spaces
const getWords = (str) => str.trim().split(/\s+/);

const modes = [
    {
        title: 'Toggle Case',
        process: (str) => {
            // "HeLLo" -> "hEllO"
            return str.split('').map(char => {
                return char === char.toUpperCase() 
                    ? char.toLowerCase() 
                    : char.toUpperCase();
            }).join('');
        }
    },
    {
        title: 'UPPER CASE',
        process: (str) => { return str.toUpperCase(); }
    },
    {
        title: 'lower case',
        process: (str) => { return str.toLowerCase(); }
    },
    {
        title: 'Leading Caps',
        process: (str) => {
            // "hello world" -> "Hello World"
            return str.replace(/\b\w/g, char => char.toUpperCase());
        }
    },
    {
        title: 'camelCase',
        process: (str) => {
            // "hello world" -> "helloWorld"
            return getWords(str)
                .map((word, index) => {
                    if (index === 0) return word.toLowerCase();
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                })
                .join('');
        }
    },
    {
        title: 'PascalCase',
        process: (str) => {
            // "hello world" -> "HelloWorld"
            return getWords(str)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('');
        }
    },
    {
        title: 'kebab-case',
        process: (str) => {
            // "Hello World" -> "hello-world"
            return getWords(str).join('-').toLowerCase();
        }
    },
    {
        title: 'snake_case',
        process: (str) => {
            // "Hello World" -> "hello_world"
            return getWords(str).join('_').toLowerCase();
        }
    },
    {
        title: 'Delimiter',
        process: (str) => {
            // "hello_world-test" -> "hello world test"
            return str.replace(/[_-]/g, ' ');
        }
    },
    {
        title: 'De-Whitespaced',
        process: (str) => {
            // "  hello    world  " -> "hello world"
            return str.trim().replace(/\s+/g, ' ');
        }
    },
    {
        title: 'w h i t e s p a c e d',
        process: (str) => {
            // "hello" -> "h e l l o"
            return str.split('').join(' ');
        }
    },
    {
        title: 'Reverse',
        process: (str) => { return str.split('').reverse().join(''); }
    },
    {
        title: 'Random Case',
        process: (str) => {
            return str.split('').map(char => 
                Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
            ).join('');
        }
    }
];
for (const mode of modes) {
    const currentGridMode = document.createElement('div');
    
    // Set the visible text
    currentGridMode.innerText = mode.title;
    
    // Add styling class
    currentGridMode.classList.add('grid-item');
    
    // Attach the Click Listener
    currentGridMode.addEventListener('click', () => {
        const currentText = textInput.value;
        // Run the specific function for this mode
        const newText = mode.process(currentText);
        // Update the textarea
        textInput.value = newText;
        // Animation feedback
        visualFeedback(currentGridMode);
    });

    modeGrid.appendChild(currentGridMode);
}

function visualFeedback(element) {
    element.style.transform = "scale(0.95)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 100);
}

// const formatModes = ['CamelCase','pascalCase','snake_case','Camel Separate',' white  space '];
// const capModes = ['toggle','upper','lower','leading','random'];

// const allModes = [...formatModes, ...capModes];

// for(const mode of allModes){
//     const currentGridMode = document.createElement('div');
//     currentGridMode.innerText = mode;
//     currentGridMode.classList.toggle('grid-item', true);
//     modeGrid.appendChild(currentGridMode);
// }