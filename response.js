const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: "",
            datas: "",
            message: ""
        },
        pagination: {
            prev: "",
            next: "",
            max: ""
        }
    })
}
module.exports = response