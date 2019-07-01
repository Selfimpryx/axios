const httpServer = (opts, data) => {
	console.log(opts)
	console.log(opts.method)
    let httpDefaultOpts = {
        url: opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'post' ? {
         'content-type': 'application/x-www-form-urlencoded'
    } : {
		
	}
    }

    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })

    return promise

}

export default httpServer
