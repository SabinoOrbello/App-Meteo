import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeWeather from "./components/HomeWeather";
import MyNav from "./components/MyNav";

function App() {
	return (
		<div className="App bg-dark">
			<HomeWeather />
		</div>
	);
}

export default App;
