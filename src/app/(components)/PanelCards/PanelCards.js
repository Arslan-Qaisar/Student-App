
function PanelCard(props) {
    let card = props.record;
    return (
        <div className="flex w-1/3 px-5 flex-col">
            <h1 className="font-bold text-lg">{card.title}</h1>
            <div className="flex justify-between">    <p>Year </p><p>{card.year}<span>&ensp;{card.type}</span></p>
            </div>
            <div className="flex justify-between"> <p>Monthly </p><p>{card.month}<span>&ensp;{card.type}</span></p></div>
            <div className="flex justify-between">  <p>Today</p> <p>{card.today}<span>&ensp;{card.type}</span></p></div>
        </div>
    )
}
export default PanelCard 