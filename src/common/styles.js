const styles = {
    container: {
        textAlign: 'center',
        margin: 'auto',
        padding: '20px',
        width: 400,
    },
    heading: {
        fontSize: '34px',
        marginBottom: '10px',
        color: "green",
        borderBottom: "3px solid green",
        paddingBottom: 20,
        borderRadius: "8px",
    },
    disabledButton: {
        backgroundColor: 'gray',
        borderColor:'gray',
        color: 'white',
        cursor: 'not-allowed',
        trasform:"scale(100%)"
    },
    enabledButton: {
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        margin: 10,
        padding: 15,
        borderRadius: "8px",
        border: "none",
        boxShadow: "0px 0px 10px 0px grey",
    },
};

export default styles