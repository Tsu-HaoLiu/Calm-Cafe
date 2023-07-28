const runtime = window.chrome || window.browser;

const sendMessage = (message) => {
    return new Promise((resolve, reject) => {
        runtime.runtime.sendMessage(message, res => {
            try {
                // console.log(res);
                resolve(res);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    });
}

export { sendMessage };