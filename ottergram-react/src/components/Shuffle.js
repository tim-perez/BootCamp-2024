function Shuffle ({ottersArray, setOttersArray, setSelectedPostName}) {
    return (
        <button onClick = {() => {
            const topOtter = ottersArray.shift();
            setOttersArray([...ottersArray, topOtter]);
            const nextTopOtter = ottersArray[0];
            setSelectedPostName(nextTopOtter.name);
        }}>
            Shuffle
        </button>
    );
}

export default Shuffle;