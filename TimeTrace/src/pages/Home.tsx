import { useEffect } from "react";

function Home() {

    function handleOnBeforeUnload(e: BeforeUnloadEvent) {
        e.preventDefault();
        return (e.returnValue = '');
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        return () => {
            window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
        }
    }, [])

    return (
        <h1 className="">Home</h1>
    );
}


export default Home;
