try {
    const dotenv = require("dotenv"); 
    const PORT = process.env.port || 8000;

    dotenv.config();
    
    const analyzeRoute = require("./routes/analyze");
    const grammarCheckRoute = require("./routes/grammarcheck");
    const spellCheckRoute = require("./routes/spellcheck");
    const express = require("express");
    const cors = require("cors");
    const app = express();
 
  
    // Middleware
    app.use(cors());
    app.use(express.json());
  
    // Routes
    app.use("/api/analyze", analyzeRoute);
    app.use("/api/grammarcheck", grammarCheckRoute);
    app.use("/api/spellcheck", spellCheckRoute);
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
  