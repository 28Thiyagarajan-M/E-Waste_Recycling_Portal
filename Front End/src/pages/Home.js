import React from "react";
import { Card, Stack } from "react-bootstrap";
import Helmet from "../components/Helmet";
import CustomCard from "../components/CustomCard";

export default function Home() {
  return (
    <Helmet title="Home">
      <div className="p-3">
        <Card bg="dark" text="light">
          <Card.Body>
            <h2 className="heading">Welcome to E-Waste Recycling Portal!</h2>
            <br />

            <Card.Text className="bodyText">
              In today's world, we face a problem called electronic waste, or
              e-waste. This happens when we throw away old electronic devices
              that we no longer use. It's not good for our environment or our
              future. But there's something that can help a special website
              called the e-waste recycling portal. It's not just any website;
              it's a place where we can recycle our old electronics and give
              them a new purpose. By using this website, we can all work
              together to make a positive difference. It's like a virtual world
              where we can turn waste into something useful and help the planet
              at the same time. This recycling portal is a symbol of our
              commitment to a better, greener world. So let's join this
              important journey and make responsible choices to protect our
              environment and build a sustainable future.
            </Card.Text>
          </Card.Body>
        </Card>
        <Stack
          direction="horizontal"
          className="justify-content-center pt-4 "
          gap={5}
        >
          <CustomCard
            title="Recycler"
            text=" Primary goal is to responsibly manage and recycle discarded electronic devices, preventing them from ending up in landfills or being improperly disposed of."
            to="/registrationRecycler"
          />
          <CustomCard
            title="Consumer"
            text="Being environmentally responsible and actively participating in efforts to reduce e-waste generation, promote recycling, and contribute to a more sustainable future."
            to="/registrationConsumer"
          />
        </Stack>
      </div>
    </Helmet>
  );
}
