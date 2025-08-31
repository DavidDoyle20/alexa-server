const https = require('https');

exports.handler = async (event) => {
    const intent = event.request.intent;
    const text = intent.slots.text.value;

    const data = JSON.stringify({
        type: "todo",
        text: text
    });

    const options = {
        hostname: "yourserver.com",
        port: 443,
        path: "/api/print",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data)
        }
    };

    await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.on('data', () => { });
            res.on('end', resolve);
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });

    return {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: `Printing your todo: ${text}`
            },
            shouldEndSession: true
        }
    };
};
