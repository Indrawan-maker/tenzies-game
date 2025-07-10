export default function Die(props) {
    const myStyle = {
        backgroundColor : props.isHold ? "red" : "white"
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