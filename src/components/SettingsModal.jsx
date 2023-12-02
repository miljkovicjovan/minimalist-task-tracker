import { Button, Modal, Form, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function SettingsModal({ settings, setSettings }) {
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const handleSwitchConfirmations = (e) => {
		const isChecked = e.target.checked;
		setSettings({
			confirmations: isChecked,
			askForBulkReactivatingConfirmation: isChecked,
      askForReactivatingConfirmation: isChecked,
			askForBulkDeletingConfirmation: isChecked,
			askForDeletingConfirmation: isChecked,
			askForBulkArchivingConfirmation: isChecked,
			askForArchivingConfirmation: isChecked,
			askForBulkUnarchivingConfirmation: isChecked,
			askForUnarchivingConfirmation: isChecked,
			askForEditingConfirmation: isChecked,
			askForSwitchDarkMode:isChecked,
		});
	};

	const handleSwitchBulkReactivateChange = (e) => 
		setSettings({ ...settings, askForBulkReactivatingConfirmation: e.target.checked });
	const handleSwitchReactivateChange = (e) => 
		setSettings({ ...settings, askForReactivatingConfirmation: e.target.checked });
	const handleSwitchBulkDeleteChange = (e) => 
		setSettings({ ...settings, askForBulkDeletingConfirmation: e.target.checked });
	const handleSwitchDeleteChange = (e) => 
		setSettings({ ...settings, askForDeletingConfirmation: e.target.checked });
	const handleSwitchBulkArchiveChange = (e) => 
		setSettings({ ...settings, askForBulkArchivingConfirmation: e.target.checked });
	const handleSwitchArchiveChange = (e) => 
		setSettings({ ...settings, askForArchivingConfirmation: e.target.checked });
	const handleSwitchBulkUnarchiveChange = (e) => 
		setSettings({ ...settings, askForBulkUnarchivingConfirmation: e.target.checked });
	const handleSwitchUnarchiveChange = (e) => 
		setSettings({ ...settings, askForUnarchivingConfirmation: e.target.checked });
	const handleSwitchEditingChange = (e) => 
		setSettings({ ...settings, askForEditingConfirmation: e.target.checked });
	const handleSwitchDarkMode = (e) => 
		setSettings({ ...settings, askForSwitchDarkMode: e.target.checked });
		
	function isSwitched() {
		if (settings.askForBulkReactivatingConfirmation &&
      settings.askForReactivatingConfirmation &&
			settings.askForBulkDeletingConfirmation &&
			settings.askForDeletingConfirmation &&
			settings.askForBulkArchivingConfirmation &&
			settings.askForArchivingConfirmation &&
			settings.askForBulkUnarchivingConfirmation &&
			settings.askForUnarchivingConfirmation &&
			settings.askForEditingConfirmation && 
			settings.askForSwitchDarkMode) {
				return true;
		} else return false;
	}

	useEffect(() => {
    window.localStorage.setItem(
      "my-minimalistic-tracker-settings",
      JSON.stringify(settings)
    );
  }, [settings]);
  return (
		<>
			<Button 
				variant={settings.askForSwitchDarkMode ? "white" : "dark"} 
				className={`position-fixed rounded-circle ${settings.askForSwitchDarkMode ? "border-light" : "border-dark"} `}
				style={{top:"15px", right:"15px"}}
				onClick={() => handleShow()}
			>
				<FontAwesomeIcon icon={faGear}/>
			</Button>
			<Modal fullscreen="sm-down" show={show} onHide={handleClose} >
				<Modal.Header className={settings.askForSwitchDarkMode ? 'text-light bg-dark' : 'text-dark bg-light'}>
						<Modal.Title>Settings</Modal.Title>
						<CloseButton bordered={false} className="outline-none" onClick={handleClose} variant={settings.askForSwitchDarkMode ? "white" : "primary"} />
				</Modal.Header>
				<Modal.Body className={settings.askForSwitchDarkMode ? "d-flex justify-content-center text-light bg-dark" : "d-flex justify-content-center text-dark bg-light"}>
					<Form>
						<span className="d-flex align-items-center gap-4">
							<h5 className="m-0 pe-1">Show Confirmations When</h5>
							<Form.Check
								type="switch"
								checked={settings.confirmations || isSwitched()}
								onChange={handleSwitchConfirmations}
							/>
						</span>
						<hr className="my-1"/>
						<Form.Check
							type="switch"
							label="Reactivating a task"
							checked={settings.askForReactivatingConfirmation}
							onChange={handleSwitchReactivateChange}
						/>
						<Form.Check
							type="switch"
							label="Bulk reactivating tasks"
							checked={settings.askForBulkReactivatingConfirmation}
							onChange={handleSwitchBulkReactivateChange}
						/>
						<Form.Check
							type="switch"
							label="Editing a task"
							checked={settings.askForEditingConfirmation}
							onChange={handleSwitchEditingChange}
						/>
						<Form.Check
							type="switch"
							label="Bulk deleting tasks"
							checked={settings.askForBulkDeletingConfirmation}
							onChange={handleSwitchBulkDeleteChange}
						/>
						<Form.Check
							type="switch"
							label="Deleting a task"
							checked={settings.askForDeletingConfirmation}
							onChange={handleSwitchDeleteChange}
						/>
						<Form.Check
							type="switch"
							label="Bulk archiving tasks"
							checked={settings.askForBulkArchivingConfirmation}
							onChange={handleSwitchBulkArchiveChange}
						/>
						<Form.Check
							type="switch"
							label="Archiving a task"
							checked={settings.askForArchivingConfirmation}
							onChange={handleSwitchArchiveChange}
						/>
						<Form.Check
							type="switch"
							label="Bulk unarchiving tasks"
							checked={settings.askForBulkUnarchivingConfirmation}
							onChange={handleSwitchBulkUnarchiveChange}
						/>
						<Form.Check
							type="switch"
							label="Unarchiving a task"
							checked={settings.askForUnarchivingConfirmation}
							onChange={handleSwitchUnarchiveChange}
						/>
						<Form.Check
							type="switch"
							label="Switch Mode"
							checked={settings.askForSwitchDarkMode}
							onChange={handleSwitchDarkMode}
						/>
					</Form>
				</Modal.Body>
			</Modal>
		</>
  )
}

export default SettingsModal;