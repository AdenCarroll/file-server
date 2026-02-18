import { useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Spinner
} from "reactstrap";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function handleFileChange(e) {
    setFile(e.target.files?.[0] ?? null);
    setMessage("");
    setIsError(false);
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      setIsError(true);
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // MUST match @RequestParam("file")

    setIsUploading(true);
    setIsError(false);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/files", {
        method: "POST",
        body: formData,
      });

      // if backend sends non-JSON on error, this prevents crashing
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      if (!response.ok) {
        setIsError(true);
        setMessage(typeof data === "string" ? data : JSON.stringify(data, null, 2));
        return;
      }

      setMessage(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage("Upload failed (network/server error).");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Container fluid className="py-4 px-4">
      <div className="mx-auto" style={{ maxWidth: 900, width: "100%" }}>
      <Card>
        <CardBody>
          <CardTitle tag="h4" className="mb-3">Upload File</CardTitle>

          <Form onSubmit={handleUpload}>
            <FormGroup>
              <Label for="file">Choose a file</Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
            </FormGroup>

            <div className="d-flex gap-2 align-items-center">
              <Button color="primary" type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>

              {file && (
                <div className="text-muted">
                  Selected: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
                </div>
              )}
            </div>
          </Form>

          {message && (
            <Alert color={isError ? "danger" : "success"} className="mt-3">
              <pre className="mb-0" style={{ whiteSpace: "pre-wrap" }}>{message}</pre>
            </Alert>
          )}
        </CardBody>
      </Card>
      </div>
    </Container>
  );
}
