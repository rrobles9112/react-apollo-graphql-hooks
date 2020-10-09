import React, {forwardRef, useContext, useImperativeHandle, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Form, Col, Button} from 'react-bootstrap'
import {ClientsContext} from "./../providers/refetchProvider";
import useAddClientMutation from "../hooks/useAddClientMutation";
import useEditClientMutation from "../hooks/useEditClientMutation";


export const FormAddEdit = forwardRef((props, ref) => {
    const refetch = useContext(ClientsContext);

    const {register, handleSubmit, errors} = useForm(); // initialize the hook
    const formRef = useRef();
    const doEditClient = useEditClientMutation();
    const doAddClient = useAddClientMutation();
    const addClient = ({cellphone, cedula, firstName, lastName, address, city, country, stateShortCode}) => {
        doAddClient(
            {
                variables: {
                    input: {
                        cedula: `${cedula}`,
                        cellphone: `${cellphone}`,
                        firstName: `${firstName}`,
                        lastName: `${lastName}`,
                        address: {
                            streetAddress: `${address}`,
                            city: `${city}`,
                            country: `${country}`,
                            stateShortCode: `${stateShortCode}`,
                        }
                    }
                },
            },
            { refetchQueries: [`getClients`,`getAllClients`] }
        )
            .then((data) => {
                console.log('addclient', data)
               // refetch();

            })
            .catch((e) => console.log('error=',e));

    };

    const submitForm = (data) => {
        console.log(data);
        addClient(data);

    };

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({

        submit: () => {
            formRef.current.dispatchEvent(new Event('submit', {cancelable: true}))
        }

    }));

    return (
        /*<form onSubmit={handleSubmit(onSubmit)}>
            <input name="firstname" ref={register} /> {/!* register an input *!/}
            <input name="lastname" ref={register({ required: true })} />
            {errors.lastname && 'Last name is required.'}
            <input name="age" ref={register({ pattern: /\d+/ })} />
            {errors.age && 'Please enter number for age.'}
            <input type="submit" />
        </form>*/

        <Form onSubmit={handleSubmit(submitForm)} ref={formRef}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Cedula</Form.Label>
                    <Form.Control type="email" name="cedula" ref={register({required: true})} placeholder="Enter ID"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" ref={register({required: true})}
                                  placeholder="First Name"/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" ref={register({required: true})} placeholder="Last Name"/>
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Cellphone</Form.Label>
                <Form.Control name="cellphone" type="text" ref={register({required: true})} placeholder="Cellphone"/>
            </Form.Group>

            <Form.Row>


                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" name="stateShortCode" defaultValue="Choose..."
                                  ref={register({required: true})}>
                        <option>Choose...</option>
                        <option value="Atlantico">Atlantico</option>
                        <option value="Cundinamarca">Cundinamarca</option>
                    </Form.Control>
                </Form.Group>


            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="Address">
                    <Form.Label>Adresss</Form.Label>
                    <Form.Control name="address" placeholder="Address" ref={register({required: true})}/>
                </Form.Group>
                <Form.Group as={Col} controlId="Address">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control name="city" placeholder="City" ref={register({required: true})}/>
                </Form.Group>
                <Form.Group as={Col} controlId="Address">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control name="country" placeholder="Country" ref={register({required: true})}/>
                </Form.Group>
            </Form.Row>


        </Form>
    );
})

/*const Child = forwardRef((props, ref) => {

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({

        getAlert() {
            alert("getAlert from Child");
        }

    }));

    return <h1>Hi</h1>;
});*/

export default FormAddEdit;