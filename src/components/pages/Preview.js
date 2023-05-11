import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Preview = (props) => {

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className='formLableText' id="contained-modal-title-vcenter">
              Preview PDF File
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe src={`${props.srcdata}`+`#toolbar=0&navpanes=0&scrollbar=0`} style={{width:"100%"}} height={500} />
          
           
          </Modal.Body>
          <Modal.Footer>
          <Button className='submit_btn'>
                <a id='downloadBtnPreview' style={{textDecoration:"none",color:"white",backgroundColor:"transparent !important"}} download={`SAP_Invoice_${new Date().getTime()}`} href={props.srcdata}>Download</a>
          </Button>
            <Button className='submit_btn' onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default Preview
