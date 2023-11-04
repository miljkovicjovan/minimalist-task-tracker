import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function SettingsModal() {
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const [settings, setSettings] = useState(
    JSON.parse(window.localStorage.getItem("my-minimalistic-tracker-settings")) || {
			askForBulkDeletingConfirmation: false,
			askForDeletingConfirmation: false,
			askForBulkArchivingConfirmation: false,
			askForArchivingConfirmation: false
		}
  );
	const handleSwitchBulkDeleteChange = (e) => setSettings({ ...settings, askForBulkDeletingConfirmation: e.target.checked });
	const handleSwitchDeleteChange = (e) => setSettings({ ...settings, askForDeletingConfirmation: e.target.checked });
	const handleSwitchBulkArchiveChange = (e) => setSettings({ ...settings, askForBulkArchivingConfirmation: e.target.checked });
	const handleSwitchArchiveChange = (e) => setSettings({ ...settings, askForArchivingConfirmation: e.target.checked });

	useEffect(() => {
    window.localStorage.setItem(
      "my-minimalistic-tracker-settings",
      JSON.stringify(settings)
    );
  }, [settings]);
  return (
		<>
			<Button 
				variant="dark"
				className="rounded-circle position-fixed"
				style={{top:"15px", right:"15px"}}
				onClick={() => handleShow()}
			>
				<FontAwesomeIcon icon={faGear}/>
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
						<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex justify-content-center">
					<Form>
						<h5>Confirmation Modals</h5>
						<Form.Check
							type="switch"
							label="Show confirmation when bulk deleting tasks"
							checked={settings.askForBulkDeletingConfirmation}
							onChange={handleSwitchBulkDeleteChange}
						/>
						<Form.Check
							type="switch"
							label="Show confirmation when deleting a task"
							checked={settings.askForDeletingConfirmation}
							onChange={handleSwitchDeleteChange}
						/>
						<Form.Check
							type="switch"
							label="Show confirmation when bulk archiving tasks"
							checked={settings.askForBulkArchivingConfirmation}
							onChange={handleSwitchBulkArchiveChange}
						/>
						<Form.Check
							type="switch"
							label="Show confirmation when archiving a task"
							checked={settings.askForArchivingConfirmation}
							onChange={handleSwitchArchiveChange}
						/>
					</Form>
				</Modal.Body>
			</Modal>
		</>
  )
}

export default SettingsModal;