import { Alert, Button } from 'react-bootstrap';
import './AlertComponent.css';

function AlertComponent({ message, variant, onClose }) {
  return (
    <Alert variant={variant} onClose={onClose} dismissible className="alert-custom">
      <Alert.Heading>{variant === 'success' ? 'Success!' : variant === 'danger' ? 'Error!' : 'Warning!'}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

export default AlertComponent;