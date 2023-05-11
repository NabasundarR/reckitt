import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const SelectClient = () => {
  const [validated, setValidated] = useState(false);
  const [userType, setuserType] = useState("");
  const [ClientDetails, setClientDetails] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [issuccess, setsuccess] = useState(false);
  const [iserror, setIserror] = useState(false);
  const [error, seterror] = useState(false);
  const history = useHistory();

  const baseUrl = "https://api.json-generator.com/templates/SEJ5VyrWBxaH/data?access_token=65doiwne5qp4u0li99sg306v4iw8klifu9ciiqph";

  useEffect(() => {
    const fetchSearchByname = async () => {
      await fetch(`${baseUrl}`)
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              setClientDetails(...json);
              seterror(null);
              setIsloading(false);
            });
          }
        })
        .catch((err) => {
          seterror(err.message);
          setClientDetails(null);
        });
    };
    fetchSearchByname();
  }, [baseUrl]);


  console.log("Search new data is ", ClientDetails)

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        history.push(`/home?admClientId=${userType}`)
        console.log(userType);
    }
    setValidated(true);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setuserType("");
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Select a Client *</Form.Label>

            <Form.Select
              required
              value={userType}
              onChange={(e) => setuserType(e.target.value)}
            >
              <option value=""> Select User Type</option>
              {ClientDetails?.data?.map((items,index) =>{
                return(
                    <option key={index} className="Options-items" value={items.client_id}>{items.name}</option>
                )
              })}


            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please Select a Client *
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <div
          style={{
            gridGap: "10px",
            display: "flex",
            marginTop: "2rem",
          }}
          className="mb-3"
        >
          <Button className="submit_btn" type="submit">
            Search
          </Button>
          <Button onClick={resetForm} className="submit_btn" type="reset">
            {" "}
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SelectClient;
