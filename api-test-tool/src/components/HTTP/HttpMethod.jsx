const HttpMethod = () => {
    const methods = ["get", "post", "put", "patch", "delete"]

    return (
        <div className="flex justify-between uppercase">
            {
                methods.map((method, idx) => <button className="" key={idx}>{method}</button>)
            }
        </div>
    )
}

export default HttpMethod;