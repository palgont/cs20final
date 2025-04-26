const express = require("express"); 
const path = require("path"); 

const app = express(); 



app.get("/order.html", (req, res)=> { 
    res.sendFile(path.join(__dirname, "order.html"));
}); 

// app.get('/options_page.html', (req, res) => {
//     console.log("Query received:", req.query); // Logs { selected_img: 'vegan' }
//     // ... render your page or send response
// });
app.use(express.static(__dirname));

app.listen(8080)