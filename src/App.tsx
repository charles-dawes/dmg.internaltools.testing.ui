import { appName } from "@appConfig";
import ButtonModule from "./modules/ButtonModule";

function App() {
    return (
        <>
            <h1>Hello {appName}!</h1>
            <ButtonModule
                recordActionForAuditing={(options) => console.log(options)}
            />
        </>
    );
}

export default App;
