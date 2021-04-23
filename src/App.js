import { useState } from "react";
import { Container } from "react-bootstrap";
import useFetchJobs from "./useFetchJobs";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  const handleParamChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [name]: value };
    });
  };
  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm handleParamChange={handleParamChange} params={params} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>loading</h1>}
      {error && <h1>error</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
