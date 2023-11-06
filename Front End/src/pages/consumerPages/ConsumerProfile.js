import React, { useState, useEffect } from "react";
import {
  Container,
  CardGroup,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Helmet from "../../components/Helmet";
import consumerImage from "../../images/consumerImage.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConsumerProfile() {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  let consumerData = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(async () => {
    try {
      await axios
        .get(
          `http://localhost:9090/consumer/viewConsumerDetails/${localStorage.getItem(
            "UserId"
          )}`
        )
        .then((response) => {
          consumerData = response.data;
          console.log(consumerData);
        });
    } catch (error) {
      console.log(error);
    }

    let details = {
      username: consumerData.username,
      email: consumerData.email,
      address: consumerData.address.street,
      phoneNumber: consumerData.phoneNumber,
      city: consumerData.address.city,
      state: consumerData.address.state,
      country: consumerData.address.country,
      zip: consumerData.address.zipCode,
    };

    console.log(details);

    Object.keys(details).forEach((key) => {
      setValue(key, details[key]);
    });
  }, []);

  const onSubmit = (data) => {
    const consumerUpdatedData = {
      consumerId: 0,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: consumerData.password,
      address: {
        addressId: 0,
        street: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zip,
      },
    };
    console.log(consumerUpdatedData);
    try {
      axios
        .put(
          `http://localhost:9090/consumer/updateConsumerDetails/${localStorage.getItem(
            "UserId"
          )}`,
          consumerUpdatedData
        )
        .then((response) => {
          console.log(response.data);
        });
      navigate("/consumer/myProfile");
    } catch (error) {
      console.log(error);
    }
    setEditMode(false);
  };

  return (
    <Helmet title="Consumer - Profile">
      <Container>
        <CardGroup className="p-2">
          <Card className="rounded-2">
            <Card.Body>
              <Card.Title className="text-center">My Profile</Card.Title>
              <hr />
              <Card.Text>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        {...register("username", {
                          required: "Username is required",
                        })}
                        disabled={!editMode}
                      />
                      {errors.organizationName && (
                        <Form.Text className="text-danger">
                          {errors.organizationName.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        disabled={!editMode}
                      />
                      {errors.email && (
                        <Form.Text className="text-danger">
                          {errors.email.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">
                        Phone number
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Phone no"
                        {...register("phoneNumber", {
                          required: "Phone no is required",
                          minLength: {
                            value: 8,
                            message: "Phone no must be 10 characters long",
                          },
                        })}
                        disabled={!editMode}
                      />
                      {errors.email && (
                        <Form.Text className="text-danger">
                          {errors.email.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        placeholder="1234 Main St"
                        {...register("address", {
                          required: "Address is required",
                        })}
                        disabled={!editMode}
                      />
                      {errors.address && (
                        <Form.Text className="text-danger">
                          {errors.address.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        {...register("city", {
                          required: "City is required",
                        })}
                        disabled={!editMode}
                      />
                      {errors.city && (
                        <Form.Text className="text-danger">
                          {errors.city.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        {...register("state", {
                          required: "State is required",
                        })}
                        disabled={!editMode}
                      />
                      {errors.city && (
                        <Form.Text className="text-danger">
                          {errors.city.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        {...register("zip", {
                          required: "Zip is required",
                          pattern: {
                            value: /^\d{6}$/,
                            message: "Zip must be a 6-digit number",
                          },
                        })}
                        disabled={!editMode}
                      />
                      {errors.zip && (
                        <Form.Text className="text-danger">
                          {errors.zip.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        placeholder="India"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        disabled={!editMode}
                      />
                      {errors.country && (
                        <Form.Text className="text-danger">
                          {errors.country.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Row>

                  <div className="d-grid ">
                    {!editMode && (
                      <>
                        <Button
                          className="mb-2"
                          variant="success"
                          onClick={() => setEditMode(true)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {editMode && (
                      <>
                        <Button
                          className="mb-2"
                          variant="primary"
                          type="submit"
                          classsName="mb-2"
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center">
                <Card.Img src={consumerImage} />
              </div>
              <Card.Title className="text-center mt-3">Consumer</Card.Title>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    </Helmet>
  );
}
