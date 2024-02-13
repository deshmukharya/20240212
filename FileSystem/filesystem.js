const fs = require('fs');

const folderPath = 'myFolder';
/**
 * Function to create a folder
 */
const createFolder = () => {
    try {
        // Check if the folder already exists
        if (!fs.existsSync(folderPath)) {
            // If not, create the folder
            fs.mkdirSync(folderPath);
            console.log('Folder created successfully.');
        } else {
            // If the folder already exists, display a message
            console.log('Folder already exists.');
        }
    } catch (error) {
        // Handle any errors that may occur during folder creation
        console.error('Error creating folder:', error.message);
    }
};

/**
 * Function to create a JSON file and store data
 * @param {string} filePath - Path to the JSON file
 * @param {Array} data - Data to be stored in the file
 */
const createJsonFile = (filePath, data) => {
    try {
        // Write the JSON data to the specified file path
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`JSON file created successfully at ${filePath}.`);
    } catch (error) {
        // Handle any errors that may occur during file creation
        console.error('Error creating JSON file:', error.message);
    }
};

/**
 * Function to store data to a JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {Object} data - Data to be stored in the file
 */
const storeDataToFile = (filePath, data) => {
    try {
        // Read existing data from the file, if it exists
        const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
        // Add new data to the existing data
        existingData.push(data);
        // Write the combined data back to the file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
        console.log(`Data stored in JSON file at ${filePath}.`);
    } catch (error) {
        // Handle any errors that may occur during data storage
        console.error('Error storing data to file:', error.message);
    }
};

/**
 * Function to read data by a particular ID and display in a formatted table
 * @param {string} filePath - Path to the JSON file
 * @param {number} targetId - Book ID to search for
 */
const readDataById = (filePath, targetId) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        // Find the book with the specified ID
        const foundBook = data.find(book => book.id === targetId);

        if (foundBook) {
            // Display the book information in a formatted table
            console.log('Book Information:');
            console.log('--------------------------------------');
            console.log('| Book Name | Book ID | Price | Author |');
            console.log('--------------------------------------');
            console.log(`| ${foundBook.name.padEnd(10)} | ${foundBook.id.toString().padEnd(7)} | ${foundBook.price.toString().padEnd(5)} | ${foundBook.author.padEnd(12)} |`);
            console.log('--------------------------------------');
        } else {
            // If no book is found, display a message
            console.log(`No book found with ID ${targetId}.`);
        }
    } catch (error) {
        // Handle any errors that may occur during data reading
        console.error('Error reading data by ID:', error.message);
    }
};

/**
 * Function to read all records from the JSON file and display in a table format
 * @param {string} filePath - Path to the JSON file
 */
const readAllFileRecords = (filePath) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.length > 0) {
            // Display all records in a formatted table
            console.log('All Records:');
            console.log('--------------------------------------');
            console.log('| Book Name | Book ID | Price | Author |');
            console.log('--------------------------------------');
            data.forEach(book => {
                console.log(`| ${book.name.padEnd(10)} | ${book.id.toString().padEnd(7)} | ${book.price.toString().padEnd(5)} | ${book.author.padEnd(12)} |`);
            });
            console.log('--------------------------------------');
        } else {
            // If no records are found, display a message
            console.log('No records found in the file.');
        }
    } catch (error) {
        // Handle any errors that may occur during data reading
        console.error('Error reading all records:', error.message);
    }
};

/**
 * Function to read and display all files in the specified folder
 */
const readAllFilesInFolder = () => {
    try {
        // Read the list of files in the folder
        const files = fs.readdirSync(folderPath);

        if (files.length > 0) {
            // Display the list of files
            console.log('Files in the folder:');
            files.forEach(file => console.log(file));
        } else {
            // If no files are found, display a message
            console.log('No files found in the folder.');
        }
    } catch (error) {
        // Handle any errors that may occur during file reading
        console.error('Error reading folder contents:', error.message);
    }
};

/**
 * Function to update the name of the book by providing the book ID
 * @param {string} filePath - Path to the JSON file
 * @param {number} targetId - Book ID to search for
 * @param {string} newName - New name for the book
 */
const updateDataById = (filePath, targetId, newName) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        // Find the index of the book with the specified ID
        const foundIndex = data.findIndex(book => book.id === targetId);

        if (foundIndex !== -1) {
            // Update the name of the book at the found index
            data[foundIndex].name = newName;
            // Write the updated data back to the file
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`Name of the book with ID ${targetId} updated to ${newName}.`);
        } else {
            // If no book is found, display a message
            console.log(`No book found with ID ${targetId}.`);
        }
    } catch (error) {
        // Handle any errors that may occur during data updating
        console.error('Error updating data by ID:', error.message);
    }
};

/**
 * Function to update the name of the JSON file
 * @param {string} oldFilePath - Path to the old JSON file
 * @param {string} newFileName - New name for the JSON file
 */
const updateFileName = (oldFilePath, newFileName) => {
    try {
        // Create the new file path with the specified name
        const newFilePath = `${folderPath}/${newFileName}.json`;
        // Rename the old file to the new file path
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`File name updated successfully to ${newFilePath}.`);
    } catch (error) {
        // Handle any errors that may occur during file renaming
        console.error('Error updating file name:', error.message);
    }
};

/**
 * Function to update the name of the folder
 * @param {string} newFolderName - New name for the folder
 */
const updateFolderName = (newFolderName) => {
    try {
        // Create the new folder path with the specified name
        const newPath = newFolderName;
        // Rename the old folder to the new folder path
        fs.renameSync(folderPath, newPath);
        console.log(`Folder renamed successfully to ${newPath}.`);
    } catch (error) {
        // Handle any errors that may occur during folder renaming
        console.error('Error updating folder name:', error.message);
    }
};

/**
 * Function to delete a particular record in the file using the book ID
 * @param {string} filePath - Path to the JSON file
 * @param {number} targetId - Book ID to be deleted
 */
const deleteDataById = (filePath, targetId) => {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        // Filter out the book with the specified ID
        const newData = data.filter(book => book.id !== targetId);

        if (newData.length < data.length) {
            // Write the filtered data back to the file
            fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');
            console.log(`Book with ID ${targetId} deleted successfully from ${filePath}.`);
        } else {
            // If no book is found, display a message
            console.log(`No book found with ID ${targetId} in ${filePath}.`);
        }
    } catch (error) {
        // Handle any errors that may occur during data deletion
        console.error('Error deleting data by ID:', error.message);
    }
};

/**
 * Function to delete all data in the JSON file
 * @param {string} filePath - Path to the JSON file
 */
const deleteFileData = (filePath) => {
    try {
        // Write an empty array to the file, effectively clearing all data
        fs.writeFileSync(filePath, '[]', 'utf8');
        console.log(`All data in the file ${filePath} deleted successfully.`);
    } catch (error) {
        // Handle any errors that may occur during file data deletion
        console.error('Error deleting file data:', error.message);
    }
};

// Example usage:
// Create the folder
createFolder();

// Define file paths
const filePathInFolder = `${folderPath}/books.json`;

// Create a JSON file with the provided data
createJsonFile(filePathInFolder, []);

// Store data to the JSON file
const bookData1 = { id: 1, name: 'ABC', price: 20.99, author: 'F. Scott Fitzgerald' };
const bookData2 = { id: 2, name: 'XYZ', price: 15.75, author: 'Harper Lee' };
const bookData3 = { id: 3, name: '1984', price: 18.50, author: 'George Orwell' };
const bookData4 = { id: 4, name: 'PQR', price: 25.00, author: 'J.K. Rowling' };
const bookData5 = { id: 5, name: 'LMN', price: 22.50, author: 'Agatha Christie' };

storeDataToFile(filePathInFolder, bookData1);
storeDataToFile(filePathInFolder, bookData2);
storeDataToFile(filePathInFolder, bookData3);
storeDataToFile(filePathInFolder, bookData4);
storeDataToFile(filePathInFolder, bookData5);

// Read data by a particular ID and display in a formatted table
const targetBookId = 3; // Change this to the desired book ID
readDataById(filePathInFolder, targetBookId);

// Read all records from the JSON file and display in a table format
readAllFileRecords(filePathInFolder);

// Read and display all files in the specified folder
readAllFilesInFolder();

// Update the name of the book with ID 3
const updatedBookName = 'NewName';
updateDataById(filePathInFolder, targetBookId, updatedBookName);
readAllFileRecords(filePathInFolder);
// Update the name of the JSON file
const newFileName = 'newBooks';
updateFileName(filePathInFolder, newFileName);

// Update the name of the folder
const newFolderName = 'updatedFolder';
updateFolderName(newFolderName);

const folderPath1 = newFolderName;
const filePathInFolder1 = `${folderPath1}/newBooks.json`;
// Delete the book with ID 3
deleteDataById(filePathInFolder1, targetBookId);
readAllFileRecords(filePathInFolder1);
// Delete all data in the JSON file
deleteFileData(filePathInFolder1);
/**
 * Function to delete the entire folder
 */
const deleteFolder = () => {
    try {
        // Recursively delete the folder and its contents
        fs.rmdirSync(folderPath1, { recursive: true });
        console.log(`Folder ${folderPath1} deleted successfully.`);
    } catch (error) {
        // Handle any errors that may occur during folder deletion
        console.error('Error deleting folder:', error.message);
    }
};
// Delete the entire folder
deleteFolder();

