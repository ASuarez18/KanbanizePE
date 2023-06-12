import React from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const ErrorModal = ({ show, title, message, onHide }) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{t('Close')}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal;