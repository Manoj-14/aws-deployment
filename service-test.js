const ping = require("ping");
const http = require("http");
const loading = require("loading-cli");
const host = 'google.co';
const axios = require("axios")

const pingAndTestSite = (host, retryTimes) => {
    ping.sys.probe(host, (isAlive) => {
        if (!isAlive && retryTimes == 0) {
            console.log(`${host} is not reachable`);
        } else if (isAlive) {
            console.log(`${host} is reachable`);
        } else {
            retryTimes--;
            console.log(`Retrying ${retryTimes}th time`);
            pingAndTestSite(host, retryTimes);
        }
    })
}

const pingAndTestSiteInfinite = (host) => {
    ping.sys.probe(host, (isAlive) => {
        if (isAlive) {
            console.log(`${host} is reachable`);
        } else {
            console.log(`Retrying....`);
            pingAndTestSiteInfinite(host);
        }
    })
}
const checkAvailablity = async (host) => {
    console.log("Checking availibilty of:", host);
    const load = new loading("Checking availablility");
    load.frame(["◰", "◳", "◲", "◱"]);
    load.start();
    try {
        await http.get(host, (resp) => {
            console.log("\n Got Return response");
            console.log(resp);

            if (resp.statusCode === 200) {
                console.log("\nSite is available");
                return;
            }
        }).on("error", (error) => {
            console.log("\nFaild with error", error);
            console.log("\nretrying......");
            // checkAvailablity(host);
        })
    } catch (error) {
        console.log("\nFaild with error", error);
        console.log("\nretrying......");
        checkAvailablity(host);
        load.error();
    }
}

const siteAvailabilityCheck = async (url, interval, maxAttempts) => {
    let attempts = 0;
    const intervalId = setInterval(async () => {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                clearInterval(intervalId);
                return true;
            } else {
                console.log(`Received status code: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
        attempts += 1;
        if (attempts >= maxAttempts) {
            console.error('Max attempts reached. Nginx might not be running.');
            clearInterval(intervalId);
            return false;
        }
    }, interval);
}
module.exports = { pingAndTestSite, pingAndTestSiteInfinite, checkAvailablity, siteAvailabilityCheck }