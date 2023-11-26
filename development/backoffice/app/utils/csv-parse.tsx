

const parseCSV = async (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target?.result) {
                const csvData = event.target.result as string;
                resolve(csvData);
            }
        };
        reader.readAsText(file);
    });
};

export default parseCSV;