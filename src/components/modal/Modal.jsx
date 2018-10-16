import React from 'react';
import { Modal, Button } from 'react-bootstrap';


type Props = {
   showModal: boolean;
   bsSize: string;
   dialogClassName: string;
   onHide: Function;
   content: JSX.Element;
   title: string;
   body: JSX.Element;
   footer: JSX.Element;
};
export class ModalComponent extends React.Component<Props> {
   render() {
      return this.props.content ? (
         <Modal
            bsSize={this.props.bsSize}
            dialogClassName={this.props.dialogClassName}
            show={this.props.showModal}
            onHide={this.props.onHide}
         >
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-lg">
                  {this.props.content.title}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.content.body()}
            </Modal.Body>
            <Modal.Footer>
               {this.props.content.footer()}
            </Modal.Footer>
         </Modal>
      ) : (
         <Modal
            bsSize={this.props.bsSize}
            dialogClassName={this.props.dialogClassName}
            show={this.props.showModal}
            onHide={this.props.onHide}
         >
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-lg">
                  {this.props.title}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.body}
            </Modal.Body>
            {this.props.footer &&
               <Modal.Footer>
                  {this.props.footer}
               </Modal.Footer>
            }
         </Modal>
      );
   }
}
