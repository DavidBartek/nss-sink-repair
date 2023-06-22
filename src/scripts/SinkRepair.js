import { Requests } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

export const SinkRepair = () => {
    return `
    <header class="header">
        <img src="/images/timanderic.jpg">
        <h1>Tim and Eric's Sink Repair</h1>
    </header>
    <section class="serviceForm">
        ${ServiceForm()}
    </section>

    <section class="serviceRequests">
        <h2>Service Requests</h2>
        <table class="serviceRequests__table">
            <tr class="serviceRequests__tableHeader">
                <th>Description</th>
                <th>Completed By</th>
                <th></th>
            </tr>
            ${Requests()}
        </table>
    </section>
    `
}

