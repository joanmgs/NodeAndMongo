//@ts-nocheck
import mongoose from "mongoose";
const {connect} = mongoose; 

const user = "joangs";
const password = "12345";
const dbname = "dbnotes"
const uri = `mongodb+srv://${user}:${password}@cluster0.wjxnr.mongodb.net/${dbname}?retryWrites=true&w=majority`;

//  Old way of connect DB
//the settings let moongose work without problems
// mongoose.connect(uri, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false
// })
//     .then( res => {
//         console.log('DB connected!');
//         export default 'connected';
//     } )
//     .catch(error => console.log('error: ', error) )

// New way of connect DB
export default (async () => {
    try {
        const db = await connect(uri);
        console.log("DB connected to ", db.connection.name);
        
    } catch (error) {
        console.log("Error in DB: ", error);
    }
})();