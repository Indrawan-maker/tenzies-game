export default function Die(props) {
    const myStyle = {
        backgroundColor : props.isHeld ? "red" : "white"
    }
    return (
        <button 
        style={myStyle}
        onClick={props.isHold}
        >
            {props.value}
            </button>
    )
}