const http = require('http');
const port = 9900;

const processRequest = async (args) => {
    const params = JSON.parse(args);
    console.log(params);
    setTimeout(() => {
        console.log("processing complete");
    }, 5000)
}

const server = http.createServer((req,res)=> {
        res.writeHead(200);
        if ((req.method === 'PUT') && 
            (req.socket.remoteAddress === '127.0.0.1') && 
            (req.url === "/")) {
                let body = '';
                req.on('data', buf => body += buf.toString());
                req.on('end', ()=> {
                    processRequest(body);
                    res.end("completed");
                })
                return;
            }
            res.end("ignored");
});

server.listen(port, "localhost", () => {
    console.log(`server is running on localhost:${port}`) 
})


