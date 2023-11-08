import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";

function CompleteTasks({ onCompleteAll, settings, setSettings }) {
	const [hover, setHover] = useState(false);
	const toggleHover = () => setHover(!hover);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		settings.askForBulkCompletingConfirmation ? setShow(true) : onCompleteAll();
	};
    return (
			<>
				<Button 
					className={`mx-auto mt-3 border-success 
					${hover ? "bg-dark text-success" : "bg-success text-light"}`}
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					onClick={handleShow}
				>
					<FontAwesomeIcon icon={faCheck} className='pe-1'/>
					Complete all Tasks
				</Button>
				<ConfirmationModal
					title="Are you sure?"
					body={<>Are you sure you want to complete all your active tasks?</>}
					handleClose={handleClose}
					handleShow={show}
					onConfirm={() => {
						handleClose();
						onCompleteAll();
					}}
					color="success"
					onToggle={() => setSettings({ 
						...settings,
						askForBulkCompletingConfirmation: !settings.askForBulkCompletingConfirmation 
					})}
				/> 
			</>
    )
}

export default CompleteTasks;