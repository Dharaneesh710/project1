const orders = [

    {
        id: "SO1001",
        customer: "ABC Ltd",
        material: "Laptop",
        quantity: 10,
        amount: 500000,
        creditLimit: 1000000,
        exposure: 600000,
        status: "Blocked",
        paymentHistory: "Good",
overdueInvoices: 0
    },

    {
        id: "SO1002",
        customer: "XYZ Ltd",
        material: "Monitor",
        quantity: 20,
        amount: 800000,
        creditLimit: 1500000,
        exposure: 500000,
        status: "Released",
        paymentHistory: "Good",
overdueInvoices: 1
    },

    {
        id: "SO1003",
        customer: "PQR Ltd",
        material: "Keyboard",
        quantity: 30,
        amount: 300000,
        creditLimit: 500000,
        exposure: 450000,
        status: "Blocked",
        paymentHistory: "Good",
overdueInvoices: 3
    },

    {
    id: "SO1004",
    customer: "LMN Ltd",
    material: "Keyboard",
    quantity: 15,
    amount: 400000,
    creditLimit: 800000,
    exposure: 300000,
    status: "Blocked",
    paymentHistory: "Good",
overdueInvoices: 0
    }

];
function checkCredit(order) {

    const availableCredit = order.creditLimit - order.exposure;

    if (order.amount <= availableCredit) {
        return "RELEASE";
    } else {
        return "HOLD";
    }
}
function analyzeRisk(order) {

    const availableCredit =
        order.creditLimit - order.exposure;

    let riskLevel;
    let recommendation;
    let reason;


    if (
        order.amount > availableCredit &&
        order.paymentHistory === "Poor"
    ) {

        riskLevel = "HIGH";
        recommendation = "HOLD";

        reason =
            "The order exceeds available credit and " +
            "the customer has a poor payment history.";

    }

    else if (order.amount > availableCredit) {

        riskLevel = "MEDIUM";
        recommendation = "HOLD";

        reason =
            "The order value exceeds the customer's " +
            "available credit.";

    }

    else if (order.overdueInvoices > 2) {

        riskLevel = "MEDIUM";
        recommendation = "REVIEW";

        reason =
            "The customer has multiple overdue invoices.";

    }

    else {

        riskLevel = "LOW";
        recommendation = "RELEASE";

        reason =
            "The order is within available credit " +
            "and the customer's payment history is good.";
    }


    return {
        riskLevel: riskLevel,
        recommendation: recommendation,
        reason: reason
    };
}
function showSales() {

    let tableRows = "";

    for (let order of orders) {

        tableRows += `
            <tr>

                <td>${order.id}</td>

                <td>${order.customer}</td>

                <td>₹${order.amount.toLocaleString("en-IN")}</td>

                <td>${order.status}</td>

                <td>
                    <button onclick="reviewOrder('${order.id}')">
                        Review
                    </button>
                </td>

            </tr>
        `;
    }


    document.getElementById("mainContent").innerHTML = `

        <h1>Sales Orders</h1>

        <p>Manage customer sales orders</p>

        <table>

            <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
            </tr>

            ${tableRows}

        </table>

    `;
}
function reviewOrder(orderId) {

    const order = orders.find(function(item) {
        return item.id === orderId;
    });
    const decision = checkCredit(order);
const availableCredit = order.creditLimit - order.exposure;
const risk = analyzeRisk(order);

    document.getElementById("mainContent").innerHTML = `

        <h1>Sales Order Details</h1>

        <p>
            Order ID:
            <strong>${order.id}</strong>
        </p>

        <div class="order-details">

            <h2>Customer Information</h2>

            <p>
                Customer:
                <strong>${order.customer}</strong>
            </p>

            <p>
                Credit Limit:
                <strong>₹${order.creditLimit.toLocaleString("en-IN")}</strong>
            </p>

            <p>
                Current Exposure:
                <strong>₹${order.exposure.toLocaleString("en-IN")}</strong>
            </p>

            <p>
    Available Credit:
    <strong>₹${availableCredit.toLocaleString("en-IN")}</strong>
</p>

        </div>


        <div class="order-details">

            <h2>Order Information</h2>

            <p>
                Material:
                <strong>${order.material}</strong>
            </p>

            <p>
                Quantity:
                <strong>${order.quantity}</strong>
            </p>

            <p>
                Order Value:
                <strong>₹${order.amount.toLocaleString("en-IN")}</strong>
            </p>

            <p>
                Status:
                <strong>${order.status}</strong>
            </p>

        </div>

        <div class="credit-result">

    <h2>Credit Check</h2>

    <p>
        System Recommendation:
        <strong>${decision}</strong>
    </p>

</div>
<div class="ai-analysis">

    <h2>🤖 AI Credit Risk Analysis</h2>

    <p>
        Risk Level:
        <strong>${risk.riskLevel}</strong>
    </p>

    <p>
        Recommendation:
        <strong>${risk.recommendation}</strong>
    </p>

    <p>
        Reason:
        ${risk.reason}
    </p>

    <p>
        Payment History:
        <strong>${order.paymentHistory}</strong>
    </p>

    <p>
        Overdue Invoices:
        <strong>${order.overdueInvoices}</strong>
    </p>

</div>

        <div class="actions">

            <button onclick="releaseOrder('${order.id}')">
                Release Order
            </button>

            <button onclick="holdOrder('${order.id}')">
                Hold Order
            </button>

        </div>

    `;
}
function releaseOrder(orderId) {

    const order = orders.find(function(item) {
        return item.id === orderId;
    });

    const availableCredit = order.creditLimit - order.exposure;

    if (order.amount <= availableCredit) {

        order.status = "Released";

        alert(
            "Sales Order " + orderId +
            " has been successfully released."
        );

    } else {

        alert(
            "Release blocked!\n\n" +
            "Order Value: ₹" + order.amount.toLocaleString("en-IN") +
            "\nAvailable Credit: ₹" + availableCredit.toLocaleString("en-IN") +
            "\n\nThe order exceeds the available credit."
        );
    }
}


function holdOrder(orderId) {

    alert("Sales Order " + orderId + " has been placed on hold.");
}
