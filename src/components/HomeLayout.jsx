
export const HomeLayout = (props)=>{
    return(
        <div className="max-w-lg mx-auto flex flex-col bg-red-100">
            {props.children}
        </div>
    )
}