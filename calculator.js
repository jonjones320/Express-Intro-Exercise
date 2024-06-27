const express = require('express')
const app = express();
const ExpressError = require('./expressError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



function parseNums(numsString) {
    return numsString.split(',').map(Number);
}

app.get('/mean/:nums', (req, res, next) => {
    try {
        if (!req.query.nums) throw new Error("Nums query parameter is required");
        let nums = parseNums(req.params.nums);
        const mean = nums.reduce((a,b) => a + b, 0) / nums.length();
        return res.send(`The mean is: ${mean}`);
    } catch(e) {next(e)}
});

app.get('/median/:nums', (req, res, next) => {
    try {
        let nums = parseNums(req.params.nums);
        const middle = Math.floor(nums.length()/2);
        const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        return res.send(`The median is: ${median}`);
    } catch(e) {next(e)}

})

app.get('/mode/:nums', (req, res, next) => {
    try {
        const nums = parseNums(req.params.nums);
        let mode = (nums) => {
            return nums.sort((a,b) =>
                  nums.filter(v => v===a).length
                - nums.filter(v => v===b).length
            ).pop();
        }
        return res.send(`THe mode is: ${mode}`);
    } catch(e) {next(e)}
})


// Error handling

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    err.status = 404;
    next(e)
  })

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;
  
    // set the status and alert the user
    return res.status(status).json({
      error: { message, status }
    });
  });


app.listen(3000, () => {
    console.log("Server running on port 3000")
  });