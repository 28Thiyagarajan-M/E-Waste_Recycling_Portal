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
import recyclerImage from "../../images/recyclerImage.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";

const RecyclerProfile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  var recyclerData = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(async () => {
    console.log(localStorage.getItem("UserId"));
    try {
      await axios
        .get(
          `http://localhost:9090/recycler/viewRecyclerDetails/${localStorage.getItem(
            "UserId"
          )}`
        )
        .then((response) => {
          recyclerData = response.data;
        });
    } catch (error) {
      console.log(error);
    }

    console.log(recyclerData);

    let details = {
      organizationName: recyclerData.organizationName,
      email: recyclerData.email,
      address: recyclerData.address.street,
      phoneNo: recyclerData.phoneNo,
      city: recyclerData.address.city,
      state: recyclerData.address.state,
      country: recyclerData.address.country,
      zip: recyclerData.address.zipCode,
    };

    Object.keys(details).forEach((key) => {
      setValue(key, details[key]);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    console.log(recyclerData);

    const recyclerUpdatedData = {
      recyclerId: 0,
      organizationName: data.organizationName,
      email: data.email,
      phoneNo: data.phoneNo,
      password: recyclerData.password,
      address: {
        addressId: 0,
        street: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zip,
      },
    };
    console.log(recyclerUpdatedData);
    try {
      axios
        .put(
          `http://localhost:9090/recycler/updateRecyclerDetail/${localStorage.getItem(
            "UserId"
          )}`,
          recyclerUpdatedData
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    setEditMode(false);
  };

  return (
    <Helmet title="recycler - Profile">
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
                      <Form.Label>Organization Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter organizationName"
                        {...register("organizationName", {
                          required: "organizationName is required",
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
                        {...register("phoneNo", {
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
                          onClick={() => navigate("/recycler")}
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
                <Card.Img src={recyclerImage} />
              </div>
              <Card.Title className="text-center mt-3">recycler</Card.Title>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    </Helmet>
  );
};

export default RecyclerProfile;
