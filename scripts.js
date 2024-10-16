function generateBill() {
    let billDetails = [];
    let totalPrice = 0;

    // Function to add item details to the bill
    function addItemToBill(itemName, price, qty) {
        if (qty > 0) {
            const itemTotal = price * qty;
            totalPrice += itemTotal;
            billDetails.push(`${qty} x ${itemName} - ₹${itemTotal.toFixed(2)}`);
        }
    }

    // Function to get input value or 0 if empty
    function getValueById(id) {
        return parseInt(document.getElementById(id).value) || 0;
    }

    // Function to get selected value of a dropdown
    function getSelectedValue(id) {
        return document.getElementById(id).value;
    }

    // Adding items to bill for each category
    const vegPizzas = [
        { name: 'Margherita Pizza', price: 200, qty: getValueById('margheritaPizzaQty') },
        { name: 'Farmhouse Pizza', price: 250, qty: getValueById('farmhousePizzaQty') },
        // Add the rest of your pizza items here...
    ];

    const nonVegPizzas = [
        { name: 'Chicken Dominator Pizza', price: 350, qty: getValueById('chickenPizzaQty') },
        // Add the rest of your non-veg pizza items here...
    ];

    const vegBurgers = [
        { name: 'Aloo Tikki Burger', price: 100, qty: getValueById('alooTikkiBurgerQty') },
        // Add the rest of your veg burger items here...
    ];

    const nonVegBurgers = [
        { name: 'Chicken Burger', price: 180, qty: getValueById('chickenBurgerQty') },
        // Add the rest of your non-veg burger items here...
    ];

    const sides = [
        { name: `Fries (${getSelectedValue('friesSize')})`, price: getFriesPrice(), qty: getSelectedValue('friesSize') !== "0" ? 1 : 0 },
        { name: 'Chicken Nuggets', price: 120, qty: getValueById('chickenNuggetsQty') },
        // Add the rest of your side items here...
    ];

    const beverages = [
        { name: 'Cappuccino', price: getBeveragePrice('cappuccinoSize'), qty: getSelectedValue('cappuccinoSize') !== "0" ? 1 : 0 },
        // Add the rest of your beverages here...
    ];

    const desserts = [
        { name: `Cheese Cake (${getSelectedValue('cheeseCakeFlavor')})`, price: getDessertPrice(), qty: getSelectedValue('cheeseCakeFlavor') !== "0" ? 1 : 0 },
        // Add the rest of your desserts here...
    ];

    // Utility functions to get dynamic prices
    function getFriesPrice() {
        const friesSize = getSelectedValue('friesSize');
        return friesSize === 'small' ? 50 : friesSize === 'medium' ? 80 : friesSize === 'large' ? 100 : 0;
    }

    function getBeveragePrice(id) {
        const size = getSelectedValue(id);
        return size === 'small' ? 100 : size === 'medium' ? 150 : size === 'large' ? 200 : 0;
    }

    function getDessertPrice() {
        const flavor = getSelectedValue('cheeseCakeFlavor');
        return flavor === 'blueberry' ? 250 : flavor === 'cranberry' ? 270 : 0;
    }

    // Combine all items to bill details
    [...vegPizzas, ...nonVegPizzas, ...vegBurgers, ...nonVegBurgers, ...sides, ...beverages, ...desserts].forEach(item => {
        addItemToBill(item.name, item.price, item.qty);
    });

    // GST and total price calculation
    const gst = totalPrice * 0.09;
    const totalWithGst = totalPrice + gst;

    // Update bill summary with dynamic HTML
    const billSummary = `
        <h2> BILL SUMMARY </h2>
        <p>${billDetails.join('<br>')}</p>
        <p>Total (excluding GST): ₹${totalPrice.toFixed(2)}</p>
        <p>GST (9%): ₹${gst.toFixed(2)}</p>
        <p>Total (including GST): ₹${totalWithGst.toFixed(2)}</p>
        <h3> THANK YOU, VISIT AGAIN! </h3>
    `;
    document.getElementById('billSummary').innerHTML = billSummary;
}
