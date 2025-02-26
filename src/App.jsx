import TaskManager from "./TaskManager";

function App() {
    try {
        return (
            <div>
                <TaskManager></TaskManager>
            </div>
        );
    } catch (ex) {
        console.error(ex);
        return (
            <div>
                <h1>Unexpected client-side error has occured.</h1>
            </div>
        );
    }
}

export default App;
