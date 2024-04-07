import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import MoreWeather from "./MoreWeather";

const TomorrowForecast = (props) => {
  const [showMore, setShowMore] = useState(false);

  const iconurl = "http://openweathermap.org/img/w/"; /*  + props.tomorrowForecast.list[0].weather[0].icon + ".png"; */
  const toCelsius = 273.15;
  console.log(props.tomorrowForecast);
  return (
    <Container>
      <Row className="my-2 g-2 justify-content-around">
        <h2 className="text-white">Tomorrow's forecast for: {props.cityName}</h2>
        {props.tomorrowForecast.map((element) => {
          const date = new Date(element.dt_txt);
          const hour = date.getHours();
          const min = date.getMinutes();
          return (
            <Col xs={6} md={3} key={element.dt}>
              <Card
                className={`${props.setBackground(
                  element.weather[0].main
                )} align-items-center rounded-5 border-0 bg-light dark-shadow fw-bold`}
              >
                <Card.Img
                  className="rounded-circle img-fluid" // Aggiungi la classe img-fluid qui
                  style={{ width: "100px" }}
                  variant="top"
                  src={iconurl + element.weather[0].icon + ".png"}
                />
                <Card.Body>
                  <Card.Text className="fs-4">
                    {hour}:{min < 10 ? "0" + min : min}
                  </Card.Text>
                  <Card.Text className="fs-3 text-primary">{Math.round(element.main.temp - toCelsius)} °C</Card.Text>
                  <Card.Text>{element.weather[0].description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <button className="btn btn-light my-4" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </button>

      {showMore && (
        <MoreWeather
          forecast={props.forecast}
          iconurl={iconurl}
          toCelsius={toCelsius}
          setBackground={props.setBackground}
        />
      )}
    </Container>
  );
};

export default TomorrowForecast;
