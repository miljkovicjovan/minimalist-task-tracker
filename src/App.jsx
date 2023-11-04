import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import "./styles.scss";
import Archive from './pages/Archive';
import SettingsModal from './components/SettingsModal';
import { useState } from 'react';

function App() {
  const [settings, setSettings] = useState(
    JSON.parse(window.localStorage.getItem("my-minimalistic-tracker-settings")) || {
			askForBulkDeletingConfirmation: false,
			askForDeletingConfirmation: false,
			askForBulkArchivingConfirmation: false,
			askForArchivingConfirmation: false
		}
  );

  return (
    <Router>
      <SettingsModal settings={settings} setSettings={setSettings}/>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/archive" element={<Archive/>} />
      </Routes>
    </Router>
  );
}

export default App;