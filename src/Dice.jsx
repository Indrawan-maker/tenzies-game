

export default function Dice(props) {
    

    const myStyles = {
        backgroundColor : props.isheld ? "#99fa99" : "white"
    }


    return (
        <>
        <button 
        style={myStyles} 
        onClick={props.handledicebtn}>{props.value}</button>
        </>
    )
}