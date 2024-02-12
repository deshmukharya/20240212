const fs = require('fs');

// Specify the folder path
const folderPath = 'myFolder';
/**
 * create a folder if folder alreading exist then show that it is prsent
 * otherwise make a new folder
 */
const createFolder = () => {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log('Folder created successfully.');
        } else {
            console.log('Folder already exists.');
        }
    } catch (error) {
        console.error('Error creating folder:', error.message);
    }
};

/**
 * Creating a json file and storing data in it
 * @param {String} filePath 
 * @param {String} data 
 */
const createJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`JSON file created successfully at ${filePath}.`);
    } catch (error) {
        console.error('Error creating JSON file:', error.message);
    }
};

/**
 *Function to create a new text file and store data in tabular form
 * Text file is created within the folder
 * @param {String} filePath 
 * @param {String} columnTitles 
 * @param {String} data 
 */
const createTextFile = (filePath, columnTitles, data) => {
    try {
        const tableHeader = columnTitles.join(' | ');
        const tableContent = data.map(entry => columnTitles.map(title => entry[title]).join(' | ')).join('\n');
        const fileContent = `${tableHeader}\n${tableContent}`;

        fs.writeFileSync(filePath, fileContent, 'utf8');
        console.log(`Text file created successfully at ${filePath}.`);
    } catch (error) {
        console.error('Error creating text file:', error.message);
    }
};

// Function to read all files in the folder
const readAllFilesInFolder = () => {
    try {
        const files = fs.readdirSync(folderPath);
        console.log('Files in the folder:');
        files.forEach(file => console.log(file));
    } catch (error) {
        console.error('Error reading files in the folder:', error.message);
    }
};


/**
 * Read all contents of the file 
 * @param {String} filePath 
 */
const readFileContent = (filePath) => {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        console.log(`Content of the file ${filePath}:\n${fileContent}`);
    } catch (error) {
        console.error('Error reading file content:', error.message);
    }
};
/**
 * Updating the folder name
 * @param {String} newFolderName new folder name 
 */
const updateFolderName = (newFolderName) => {
    try {
        const newPath = newFolderName;
        fs.renameSync(folderPath, newPath);
        console.log(`Folder renamed successfully to ${newPath}.`);
    } catch (error) {
        console.error('Error updating folder name:', error.message);
    }
};

// Function to delete the folder
const deleteFolder = () => {
    try {
        fs.rmdirSync(folderPath, { recursive: true });
        console.log(`Folder ${folderPath} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting folder:', error.message);
    }
};
/**
 * Updating the name of the file
 * @param {String} oldFilePath 
 * @param {String} newFileName 
 */
const updateFileName = (oldFilePath, newFileName) => {
    try {
        const newFilePath = `${folderPath}/${newFileName}`;
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`File name updated successfully to ${newFilePath}.`);
    } catch (error) {
        console.error('Error updating file name:', error.message);
    }
};

/**
 * Updating title of text in the file
 * @param {String} filePath 
 * @param {String} newColumnTitles 
 */
const updateColumnTitles = (filePath, newColumnTitles) => {
    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const [tableHeader, ...tableContent] = fileContent.split('\n');
            const updatedTableHeader = newColumnTitles.join(' | ');
            const updatedFileContent = `${updatedTableHeader}\n${tableContent.join('\n')}`;

            fs.writeFileSync(filePath, updatedFileContent, 'utf8');
            console.log(`Column titles updated successfully in ${filePath}.`);
        } else {
            console.error(`File not found at ${filePath}.`);
        }
    } catch (error) {
        console.error('Error updating column titles:', error.message);
    }
};
/**
 * Deleting exsisting file
 * @param {String} filePath 
 */
const deleteFile = (filePath) => {
    try {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting file:', error.message);
    }
};

// Create the folder and JSON file
createFolder();
const filePathInFolder = `${folderPath}/books.json`;
const textFilePathInFolder = `${folderPath}/books.txt`;
const columnTitles = ['name', 'id', 'price', 'author'];
const bookData = [
    { id: 1, name: 'ABC', price: 20.99, author: 'F. Scott Fitzgerald' },
    { id: 2, name: 'XYZ', price: 15.75, author: 'Harper Lee' },
    { id: 3, name: '1984', price: 18.50, author: 'George Orwell' }
];

const filterAndDisplayBookById = (filePath, targetId) => {
    try {
        const fileContent = readFileContent(filePath);

        if (fileContent) {
            const [, ...tableContent] = fileContent.split('\n');
            const foundBook = tableContent.find(entry => {
                const [id, name, price, author] = entry.split(' | ');
                return parseInt(id) === targetId;
            });

            if (foundBook) {
                const [id, name, price, author] = foundBook.split(' | ');
                const book = { id: parseInt(id), name, price: parseFloat(price), author };
                console.log(`Book with id = ${targetId}:`, book);
            } else {
                console.log(`No book found with id = ${targetId}.`);
            }
        }
    } catch (error) {
        console.error('Error filtering and displaying book:', error.message);
    }
};
// Create a JSON file with the provided data
createJsonFile(filePathInFolder, bookData);

// Create a text file with the provided data in tabular format
createTextFile(textFilePathInFolder, columnTitles, bookData);

// Perform read operation
readAllFilesInFolder();

// Perform read operation on the text file
readFileContent(textFilePathInFolder);

const filepath = `${folderPath}/books.txt`;
const newColumnTitles = ['bookname', 'id', 'price', 'author'];
updateColumnTitles(filepath, newColumnTitles);

// Perform update operation (change folder name)
const newFolderName = 'updatedFolder';
updateFolderName(newFolderName);

