class Server {
    processResponse(response) {
        // Log the raw response text
        return response.text().then((text) => {
            try {
                // Attempt to parse the text as JSON
                let json = JSON.parse(text);
                return json;
            } catch (parseError) {
                // Log the raw response text and the parsing error
                console.error("Failed to parse JSON. Raw response text:", text);
                throw parseError; // Re-throw the error to be caught by the outer .catch()
            }
        });
    }

    logError(error) {
        console.error("===============================");
        console.error("Error fetching JSON:", error.message); // Log the error message
        console.error("Stack trace:", error.stack); // Log the stack trace
    }

    getJSON(url, successFunc) {
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return this.processResponse(response);
            })
            .then((data) => {
                successFunc(data);
            })
            .catch((error) => {
                this.logError(error);
                throw error;
            });
    }

    postJSON(url, data, successFunc) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return this.processResponse(response);
            })
            .then((data) => {
                successFunc(data);
            })
            .catch((error) => {
                this.logError(error);
                throw error;
            });
    }
}

export default Server;
