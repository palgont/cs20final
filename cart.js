
async function loadOrder() { 
    const user_id = localStorage.getItem('nom_nom_nom_id'); 
    const response = await fetch (`/get_order?userId=${user_id} `)
    const order = await response.json(); 

    console.log("Order", order)

}

