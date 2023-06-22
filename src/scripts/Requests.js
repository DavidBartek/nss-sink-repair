import { deleteRequest, getRequests, getPlumbers, getCompletions, saveCompletion } from "./dataAccess.js";

export const Requests = () => {
    const requests = getRequests()
    // const plumbers = getPlumbers()
    // const completions = getCompletions()

    let html = `${requests.map(convertRequestToLI).join("")}`

    return html
}

// helper function
// will be passed to .map() in Requests()
// converts each service request object into HTML representations
// all are wrapped in <ul> (above) so each must be a <li> element
// show only the description of the request
// 1 parameter: request object
// description of service request to be interpolated inside <li> HTML representation
// return html representation

// update: also interpolates a dropdown list of plumbers

// update: also has a delete button to delete service request (from permanent state!)

// update: if a service request has been completed, dropdown menu disappears and row turns red

const convertRequestToLI = (request) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()

    const completedReq = completions.find(completion => completion.requestId === request.id)
    console.log(completedReq)

    let html = ""
    
    if (completedReq) {
        html += `
            <tr class="serviceRequests__table--completed">
                <td>${request.description}</td>
                <td></td>
                <td><button class="request__delete"
                            id="request--${request.id}">
                        Delete
                    </button></td>
            </tr>
            `
    } else {
        html += `
            <tr>
                <td>${request.description}</td>
                <td><select class="plumbers" id="plumbers">
                        <option value="">Choose</option>
                        ${
                            plumbers.map(
                                plumber => {
                                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                }
                            ).join("")
                        }
                    </select></td>
                <td><button class="request__delete"
                            id="request--${request.id}">
                        Delete
                    </button></td>
            </tr>
            `
    }

    return html

}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("request--")) {
        const [,requestId] = clickEvent.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            // this object (below) should have 3 properties: requestId, plumberId, date_created

            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
             }

            // invoke the function that performs the POST request to the "completions" resource for your API
            // Send the completion object as a parameter

            saveCompletion(completion)
        }
    }
)