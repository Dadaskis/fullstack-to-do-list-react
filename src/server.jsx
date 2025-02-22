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

    sendJSON(url, successFunc, method, bodyData) {
        let headers = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        }
        if(bodyData != undefined && bodyData != null) {
            headers["body"] = JSON.stringify(bodyData);
        }
        return fetch(url, headers)
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

    getJSON(url, successFunc) {
        return this.sendJSON(url, successFunc, "GET");
    }

    postJSON(url, data, successFunc) {
        return this.sendJSON(url, successFunc, "POST", data);
    }

    putJSON(url, data, successFunc) {
        return this.sendJSON(url, successFunc, "PUT", data);
    }
}

export default Server;
