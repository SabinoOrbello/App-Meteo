import { Card, Col, Container, Row } from "react-bootstrap";
import { isToday, isTomorrow, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, ArrowRightCircle } from "react-bootstrap-icons";

const TodayWeather = (props) => {
  const iconurl = "http://openweathermap.org/img/w/";

  const todayForecast = props.forecast.list.filter((element) => {
    const forecastdate = parseISO(element.dt_txt);
    return isToday(forecastdate);
  });
  const tomorrowForecast = props.forecast.list.filter((element) => {
    const forecastdate = parseISO(element.dt_txt);
    return isTomorrow(forecastdate);
  });

  useEffect(() => {
    props.setTomorrowForecast(tomorrowForecast);
  }, []);

  const date = new Date();

  const hour = date.getHours();
  const min = date.getMinutes();

  const toCelsius = 273.15;

  return (
    <Container className="my-3">
      <Row className="align-items-center justify-content-center">
        <Col xs={4} className="">
          <div className="">
            <Card
              className={`${props.setBackground(
                todayForecast[0].weather[0].main
              )} justify-content-around align-items-center rounded-4 border-0 dark-shadow fw-bold`}
            >
              <Card.Img
                style={{ width: "100px" }}
                className=" rounded-circle"
                variant="start"
                src={iconurl + props.forecast.list[0].weather[0].icon + ".png"}
              />
              <Card.Body>
                <Card.Title className="display-6">{props.forecast.city.name}</Card.Title>
                <Card.Text className="fs-2">
                  Right now: {hour}:{min < 10 ? "0" + min : min}
                </Card.Text>
                <Card.Text className="fs-3 text-primary">
                  {Math.round(todayForecast[0].main.temp - toCelsius)} °C
                </Card.Text>
                <Card.Text className="fs-3">{todayForecast[0].weather[0].description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      <Row className="mt-2 g-2 align-items-center row-col-5">
        <h3 className="text-light text-start ms-3 mt-3">Later today</h3>
        {todayForecast.map((element) => {
          const date = new Date(element.dt_txt);
          const hour = date.getHours();
          const min = date.getMinutes();
          return (
            <Col key={element.dt}>
              <Card
                className={`${props.setBackground(
                  element.weather[0].main
                )} align-items-center rounded-5 border-0 bg-light dark-shadow fw-bold`}
              >
                <Card.Img
                  style={{ width: "100px" }}
                  className="rounded-circle"
                  variant="top"
                  src={iconurl + element.weather[0].icon + ".png"}
                />
                <Card.Body>
                  <Card.Text className="fs-5">
                    {hour}:{min < 10 ? "0" + min : min}
                  </Card.Text>
                  <Card.Text className="fs-4 text-primary">{Math.round(element.main.temp - toCelsius)} °C</Card.Text>
                  <Card.Text className="fs-5">{element.weather[0].description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Col className="">
          <Link
            to={`/details/${props.forecast.city.name}`}
            className="btn btn-dark w-100 bg-light dark-shadow rounded-3 p-3 text-dark mt-3"
          >
            Go to tomorrow's forecast
            <ArrowRightCircle color="black" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default TodayWeather;
