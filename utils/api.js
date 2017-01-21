const jsonResponse = (resp, success, data, message, status = 200) => {
    resp.status(status);
    resp.json({
        success,
        data,
        message
    })
};

exports.jsonResponse = jsonResponse;