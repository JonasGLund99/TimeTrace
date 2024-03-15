interface PropsType {
    mappings: Map<string, string>;
}


function MappedItemsList(props: PropsType) {
    const mappings: Map<string, string> = props.mappings;

    return (
        <div id="mappings-container" className="w-full h-full">
            <h2 className="text-xl font-bold mb-2 pl-4">Mappings</h2>
            <div className="border border-gray-400 w-full h-full">
                <div className="px-4 pt-2">
                    <div className="grid grid-cols-12 gap-1">
                        <p className="col-span-3 font-bold text-left">Mapped Value</p>
                        <p className="col-span-8 font-bold text-left">Event</p>
                        <p className="col-span-1 font-bold text-center">del</p>
                    </div>
                    {Array.from(mappings).map(([event, map]) => (
                        <div className="grid grid-cols-12 border-b last:border-none gap-1">
                            <p className="col-span-3">{map}</p>
                            <p className="col-span-8">{event}</p>
                            <p className="col-span-1 text-center">del</p>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )

}

export default MappedItemsList