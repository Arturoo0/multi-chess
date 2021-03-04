
const { performance, PerformanceObserver} = require('perf_hooks')

const observer = new PerformanceObserver((items) => {
    items.getEntries().forEach((item) => {
        console.log('%s- %sms', item.name, item.duration);
    })
})
observer.observe({entryTypes: ['measure']})

const logResponseTime = (req, res, next) => {
    const startTime = performance.mark('eventStart')
    res.on("finish", () => {
        const endTime = performance.mark('eventEnd');
        performance.measure(req.url, 'eventStart', 'eventEnd');
    });
    next();
}

module.exports = logResponseTime;