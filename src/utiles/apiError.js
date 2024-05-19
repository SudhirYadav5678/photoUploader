class ApiError extends error{
    constructor(statusCode, message="Api error",
        errors=[],
        statck=""
    ){
        super(message) //usedd for overWrite 
        this.statusCode = statusCode
        this.message=message,
        this.errors=errors,
        this.success=false,
        this.data=null
        if (statck) {
            this.statck=statck
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}