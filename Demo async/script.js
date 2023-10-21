// Async function to fetch data
async function fetchData() {
    try {
        window.sharedData = null;
        console.log("Fetching data...");
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        // Assign fetched data to global variable
        window.sharedData = data;
        // store data in local storage
        localStorage.setItem('domo-data', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
    