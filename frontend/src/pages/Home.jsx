import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function Home() {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Home</CardTitle>
        <CardText>
          This is your file server UI. Use the Upload page to send files to the backend.
        </CardText>
      </CardBody>
    </Card>
  );
}
