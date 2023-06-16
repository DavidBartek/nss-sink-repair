import { getRequests } from "./dataAccess.js";

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map(convertRequestToLI).join("")}
        </ul>
    `

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


const convertRequestToLI = (request) => {
    let html = `<li>${request.description}</li>`
    return html
}