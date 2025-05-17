import app from "./app";
import {Server} from 'http'
const port = 5000;


const main = () => {
    const server: Server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})
}

main();

