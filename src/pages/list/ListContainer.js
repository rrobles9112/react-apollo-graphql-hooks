import React, { useState, useRef } from "react";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { SelectStatus } from "./../../components/SelectStatus";
import FormAddEdit from '../../components/FormAddEdit'
import useClientQuery from "../../hooks/useClientsHooks";
import { List } from "../../components/List";
import { Logout } from "./../../components/Logout";
import { ClientsProvider } from "../../providers/refetchProvider";

export const ListContainer = () => {

  const [show, setShow] = useState(false);
  const childRef = useRef();
  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    // setShow(false);
    childRef.current.submit();
  };
  const handleShow = () => setShow(true);
  const petStatus = [
    { key: 1, id: null, name: "All" },
    { key: 2, id: "AVAILABLE", name: "Available" },
    { key: 3, id: "CHECKEDOUT", name: "Checked Out" },
  ];
  const [selectedStatus, setSelectedStatus] = useState(() => null);

  const { loading, error, data, refetch } = useClientQuery(
    selectedStatus ? selectedStatus.id : null
  );

  const onSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const onRefetch = () => {
    refetch();
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col xs={12}>
            <Button variant="primary" onClick={(e)=>handleShow()}>Add New client</Button>
          </Col>
        </Row>
        <Form>
          <Form.Row>
            {/*<SelectStatus
              petStatus={petStatus}
              onSelect={onSelectStatus}
              defaultValue={selectedStatus}
            />*/}
            <div className="ml-auto">
              <Logout />
            </div>
          </Form.Row>
        </Form>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddEdit ref={childRef}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <ClientsProvider value={() => onRefetch()}>
          <List clients={data.clients} />
        </ClientsProvider>
      </Container>
    </>
  );
};
