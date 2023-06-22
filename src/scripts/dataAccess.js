const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")


// API FETCH REQUESTS
// returns data from database.json, places in application state
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(res => res.json())
        .then(
            (serviceRequests) => {
                // store external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(res => res.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(res => res.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


// GETTER FUNCTIONS
// returns data in application state for use in other modules
export const getRequests = () => {
    return applicationState.requests.map((request) => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map((plumber) => ({...plumber}))
}

export const getCompletions = () => {
    return applicationState.completions.map((completion) => ({...completion}))
}


// API FETCH (METHOD: POST) FUNCTIONS
// passes in user-defined data; converts to formatted JSON object ("fetchOptions");
// returns fetchOptions to selected location in database.json
// finally, re-renders DOM

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions) // parameters: (resource (url string), options (object))
        .then(res => res.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) // dispatches stateChanged custom event (re-renders HTML)
        })
}

export const saveCompletion = (userCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCompletion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// API FETCH (METHOD: DELETE) FUNCTION
// passes in primary key id
// returns instructions to database.json to delete id in selected location
// finally, re-renders DOM

export const deleteRequest = (id) => { // fetch request with DELETE method must have primary key passed in as argument
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
