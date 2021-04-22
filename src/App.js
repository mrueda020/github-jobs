import { useState } from "react";
import { Container } from "react-bootstrap";
import useFetchJobs from "./useFetchJobs";
import Job from "./Job";
function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      {loading && <h1>loading</h1>}
      {error && <h1>error</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
    </Container>
  );
}

export default App;
