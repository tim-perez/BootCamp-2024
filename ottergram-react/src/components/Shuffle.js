function Shuffle({name, setSelectedPostName}) {
    return (
        <button onClick={() => 
            setSelectedPostName(name)
        }>
            Shuffle
        </button>
    )
}

export default Shuffle;